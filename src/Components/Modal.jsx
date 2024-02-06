import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../Hook/useAuth";
import { useRef, useState } from "react";

const Modal = () => {
  const { signIn, loading, setLoading, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const [error, setError] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setError("");
    signIn(data.email, data.password)
      .then(() => {
        navigate("/");
        reset();
        toast.success("Successfully Logged In!");
        setTimeout(() => {}, 200);
        setLoading(false);
        if (dialogRef.current) {
          dialogRef.current.close();
        }
      })
      .catch((err) => {
        setError(err.message);
        reset();
        setLoading(false);
      });
  };
  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success("Successfully Login!");
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 200);
      })
      .catch((err) => {
        setError(err.message);
        reset();
        setLoading(false);
      });
  };
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <dialog id="my_modal_3" ref={dialogRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit(onSubmit)} className="px-4">
            <h1 className="text-center font-bold text-2xl">Login</h1>
            <div className="space-y-2">
              <label>Email</label>
              <input
                className="border rounded-lg outline-none pl-4 border-green py-3 w-full"
                type="email"
                {...register("email", { required: true })}
                placeholder="user email"
                name="email"
              />
            </div>
            <div className="text-center text-red">
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="space-y-2 pt-5">
              <label>Password</label>
              <input
                className="border rounded-lg outline-none pl-4 border-green py-3 w-full"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="user password"
                name="password"
              />
            </div>
            <div className="text-center text-red">
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
            {error && <p className="text-red text-center">{error}</p>}
            <button
              type="submit"
              className="btn w-full bg-green text-white my-5"
            >
              {loading ? (
                <TbFidgetSpinner fontSize={"1.5rem"} className="animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="text-center">
            New here?
            <Link
              to="/register"
              className="font-semibold text-sm text-green underline"
            >
              create an account
            </Link>
          </p>
          <p className="text-center py-3">Or login with</p>
          <div className="flex justify-center gap-4 items-center">
            <button className="btn btn-circle hover:text-green">
              <FaFacebookF color="" fontSize={"1.5rem"} />
            </button>
            <button
              onClick={handleGoogleLogin}
              className="btn btn-circle hover:text-green"
            >
              <FaGoogle fontSize={"1.5rem"} />
            </button>
            <button className="btn btn-circle hover:text-green">
              <FaGithub fontSize={"1.5rem"} />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;