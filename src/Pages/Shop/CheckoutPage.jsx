import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";

const CheckoutPage = ({ price, cart, refetch }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      return;
    }
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(paymentMethod.id);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unKnown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    if (paymentIntent?.status === "succeeded") {
      const date = new Date();
      const dateWithoutTime = date.toLocaleDateString();

      const paymentInfo = {
        email: user.email,
        transactionId: paymentIntent.id,
        price,
        quantity: cart?.length,
        status: "order pending",
        itemName: cart?.map((item) => item?.name),
        cartItems: cart?.map((item) => item?._id),
        menuItems: cart?.map((item) => item?.menuItemId),
        orderDate: dateWithoutTime,
      };
      axiosSecure.post("/order", paymentInfo).then((res) => {
        if (res.data) {
          Swal.fire({
            title: "Good job!",
            text: "You Successfully done your payment",
            icon: "success",
          });
          setProcessing(false);
          refetch();
          navigate("/dashboard/order");
        }
      });
      setProcessing(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row lg:flex-row justify-start items-start gap-8">
      <div className="md:w-1/2 space-y-3">
        <p className="text-lg font-semibold">Order Sammary</p>
        <p>Total Price: ${price}</p>
        <p>Number of Items: {cart?.length}</p>
      </div>
      <div className="md:w-1/2 space-y-3 card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-4 py-8">
        <p className="text-lg">Process your Payment</p>
        <p>Credit/Debit Card</p>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            className="btn btn-sm btn-primary w-full mt-5"
            disabled={!stripe || processing}
          >
            {processing ? (
              <TbFidgetSpinner className="animate-spin" fontSize={"1rem"} />
            ) : (
              `Pay ${price}`
            )}
          </button>
        </form>
        <p className="text-red text-center">{error}</p>
        <p className="text-center text-green">
          {success && (
            <p>pyment successfully done your transaction Id {success}</p>
          )}
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
