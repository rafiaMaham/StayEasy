import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  conformPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      //   console.log("registration successfull");
      showToast({ message: "Successfully Registered!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      //   console.log(error.message);
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an account</h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1 ">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal mt-1"
            {...register("firstName", {
              required: "This field is required",
            })}
          />
          {errors.firstName && (
            <span className="text-red-500 font-normal">
              {errors.firstName.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal mt-1"
            {...register("lastName", {
              required: "This field is required",
            })}
          />
          {errors.lastName && (
            <span className="text-red-500 font-normal">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal mt-1"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500 font-normal">
            {errors.email.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal mt-1"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be of atleast 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 font-normal">
            {errors.password.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal mt-1"
          {...register("conformPassword", {
            minLength: {
              value: 6,
              message: "Password must be of atleast 6 characters",
            },
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your password do not match!";
              }
            },
          })}
        />
        {errors.conformPassword && (
          <span className="text-red-500 font-normal">
            {errors.conformPassword.message}
          </span>
        )}
      </label>

      <span>
        <button
          type="submit"
          className=" text-white p-3 bg-purple-600 font-bold hover:bg-purple-500 rounded mt-2 "
        >
          Sign up
        </button>
      </span>
    </form>
  );
};

export default Register;
