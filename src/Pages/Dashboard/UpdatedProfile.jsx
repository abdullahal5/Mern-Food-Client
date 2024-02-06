import { useForm } from "react-hook-form";

const UpdatedProfile = () => {
    const {
      register,
      reset,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) =>{
        console.log(data)
    }

  return (
    <div className="flex items-center h-screen w-2/5 mx-auto ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body bg-white shadow-2xl rounded-lg"
      >
        <h3 className="text-center text-3xl font-semibold">
          Update Your Profile
        </h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            {...register("name", { required: true })}
            className="input input-bordered outline-none"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="file"
            placeholder="Photo"
            name="image"
            
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full outline-none"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-green text-white">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatedProfile;
