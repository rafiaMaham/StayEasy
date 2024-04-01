import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Successfully Registered", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="md:text-3xl font-bold flex justify-center items-center">
        Create an account
      </h2>

      <div className="flex flex-col w-full gap-5 justify-center items-center">
        <label className="text-gray-700 text-sm md:text-lg font-bold flex-1 flex flex-col ">
          First Name
          <input
            type="text"
            className="border rounded w-full md:w-[500px]  py-1 px-2 font-normal mt-1"
            {...register("firstName", {
              required: "This field is required",
            })}
          />
          {errors.firstName && (
            <span className="text-red-500 font-normal text-sm">
              {errors.firstName.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm md:text-lg font-bold flex-1 flex flex-col ">
          Last Name
          <input
            type="text"
            className="border rounded w-full md:w-[500px]  py-1 px-2 font-normal mt-1"
            {...register("lastName", {
              required: "This field is required",
            })}
          />
          {errors.lastName && (
            <span className="text-red-500 font-normal text-sm">
              {errors.lastName.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm md:text-lg font-bold flex-1 flex flex-col ">
          Email
          <input
            type="email"
            className="border rounded w-full md:w-[500px]  py-1 px-2 font-normal mt-1 "
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-red-500 font-normal text-sm">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm md:text-lg font-bold flex-1 flex flex-col ">
          Password
          <input
            type="password"
            className="border rounded w-full md:w-[500px]  py-1 px-2 font-normal mt-1"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be of atleast 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 font-normal text-sm">
              {errors.password.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm md:text-lg font-bold flex-1 flex flex-col ">
          Confirm Password
          <input
            type="password"
            className="border rounded w-full md:w-[500px]  py-1 px-2 font-normal mt-1"
            {...register("confirmPassword", {
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
          {errors.confirmPassword && (
            <span className="text-red-500 font-normal text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <span>
          <button
            type="submit"
            className="text-white text-sm md:text-lg  md:p-3  p-2 bg-purple-600 font-bold hover:bg-purple-500 rounded-lg mt-2 flex justify-center items-center w-full md:w-[500px] "
          >
            Sign up
          </button>
        </span>

        <div className="text-sm mt-2">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="underline text-blue-900 hover:text-blue-700"
          >
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
