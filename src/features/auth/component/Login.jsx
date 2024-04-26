import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkUserAsync, selectError, selectUser } from "../authSlice";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  console.log("my error ", error);

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="bg-orange-100 px-20 pt-5  ">
      <div className="flex flex-1  min-h-full flex-col justify-center mx-20  px-3 py-12 lg:px-0 bg-white border-red-600 border-solid border-2 rounded-lg shadow-lg w-200">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
           className="mx-auto h-15 w-auto"
           src={require("../../../asset/Group1.jpeg")}
           alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="text-red-500 text-center ">{error}</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              console.log("my login data ", data);
              dispatch(checkUserAsync(data));
              // reset()
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>

              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forget-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error && <p className="text-red-500">{error.message}</p>}
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-600  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
      </div>
    </>
  );
}

export default Login;



