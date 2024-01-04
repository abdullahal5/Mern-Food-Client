import { useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../../Components/Modal";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "axios";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Register = () => {
  const { createUser, updateUserProfile, loading, setLoading, googleSignIn } =
    useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const image = data?.image[0];
    const Ddata = new FormData();
    Ddata.append("image", image);
    const res = await axios.post(
      "https://api.imgbb.com/1/upload?key=e0402a6916e18617c709ea2e5087ca44",
      Ddata,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    setError("");
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, res?.data?.data?.display_url);
        reset();
        toast.success("Successfully Registered!");
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 200);
        const userInformation = {
          name: data.name,
          email: data.email,
          photoURL: res?.data?.data?.display_url,
          role: "User",
        };
        axiosPublic.post("/users", userInformation).then((res) => {
          console.log(res.data);
        });
      })
      .catch((err) => {
        setError(err.message);
        reset();
        setLoading(false);
      });
  };
  const handleGoogleRegister = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          role: "User",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });
        toast.success("Successfully Registered!");
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
    <div className="items-center mt-16 ">
      <div>
        <Toaster />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 md:w-1/2 mx-auto "
      >
        <h1 className="text-center font-bold text-2xl">Register</h1>
        <div className="space-y-2">
          <label>Name</label>
          <input
            className="border rounded-lg outline-none pl-4 border-green py-3 w-full"
            type="name"
            {...register("name", { required: true })}
            placeholder="user name"
            name="name"
          />
        </div>
        <div className="text-center text-red">
          {errors.name && (
            <span className="text-red-600">Name is required</span>
          )}
        </div>
        <div className="space-y-2 pt-5">
          <label>Photo</label>
          <input
            className="border rounded-lg outline-none pl-4 border-green py-3 w-full"
            type="file"
            {...register("image", { required: true })}
            placeholder="user image"
            name="image"
          />
        </div>
        <div className="text-center text-red">
          {errors.image && (
            <span className="text-red-600">Image is required</span>
          )}
        </div>
        <div className="space-y-2 pt-5">
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
        <div className="space-y-2 pt-5 ">
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
        <div className="text-center text-red pb-3">
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
              Password must have one Uppercase one lower case, one number and
              one special character.
            </p>
          )}
        </div>
        {error && <p className="text-red text-center">{error}</p>}
        <button type="submit" className="btn w-full bg-green text-white my-5">
          {loading ? (
            <TbFidgetSpinner fontSize={"1.5rem"} className="animate-spin" />
          ) : (
            "Register"
          )}
        </button>
      </form>
      <Modal />
      <p className="text-center">
        Already have account?
        <button
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className="font-semibold text-sm text-green underline"
        >
          login
        </button>
      </p>
      <p className="text-center py-3">Or Register with</p>
      <div className="flex justify-center gap-4 items-center">
        <button className="btn btn-circle hover:text-green">
          <FaFacebookF color="" fontSize={"1.5rem"} />
        </button>
        <button
          onClick={handleGoogleRegister}
          className="btn btn-circle hover:text-green"
        >
          <FaGoogle fontSize={"1.5rem"} />
        </button>
        <button className="btn btn-circle hover:text-green">
          <FaGithub fontSize={"1.5rem"} />
        </button>
      </div>
    </div>
  );
};

export default Register;
