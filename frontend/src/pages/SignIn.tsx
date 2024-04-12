import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      // console.log("user is signed in");

      showToast({ message: "Sign in Successful", type: "SUCCESS" });
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
        Sign in
      </h2>

      <div className="flex flex-col w-full gap-5 justify-center items-center">
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
        <span>
          <button
            type="submit"
            className=" text-white text-sm md:text-lg  md:p-3  p-2 bg-purple-600 font-bold hover:bg-purple-500 rounded-lg mt-2 flex justify-center items-center w-full md:w-[500px] "
          >
            Sign in
          </button>

          <div className="text-sm mt-2">
            Not Registered?{" "}
            <Link
              to="/register"
              className="underline text-blue-900 hover:text-blue-700"
            >
              Create an account here
            </Link>
          </div>
        </span>
      </div>
    </form>
  );
};

export default SignIn;
