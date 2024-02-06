import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../Hook/useCart";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51OEpkQD6HiOKUnrgGvScdxR6WDgFLqYyi5dM1CcaBE8M6PrWsVerdD7qsSISAWm5eA9CoZGMxAxa36F3WkyDhQvA00niqpiWUZ"
  );
  const [cart, , refetch] = useCart();

  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  const cartTotal = cart.reduce((sum, item) => sum + calculatePrice(item), 0);
  const totalPrice = parseFloat(cartTotal.toFixed(2))

    return (
      <div className="my-28 section-container">
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutPage refetch={refetch} price={totalPrice} cart={cart} />
          </Elements>
        </div>
      </div>
    );
};

export default Payment;