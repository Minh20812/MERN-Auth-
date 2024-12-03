import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/feature/auth/authSlice";
import { toast } from "react-toastify";
import { Checkbox, Label, Field } from "@headlessui/react";
// import GoogleLogin from "./components/SocialLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="rounded-lg py-12 dark:bg-slate-900">
        <div className="m-6 flex flex-col justify-center rounded-lg bg-white px-6 py-12 shadow-md sm:mx-auto sm:w-full sm:max-w-md lg:px-8 dark:bg-slate-950 dark:text-white">
          <div className="mx-auto w-full">
            <div className="flex items-center justify-center gap-3">
              <img
                className="size-8 rounded-xl"
                src="https://i.imgur.com/NOhGpvI.jpeg"
                alt="Your Brand"
              />
              <h1 className="pt-1 font-semibold">MINOVA</h1>
            </div>
            <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight">
              Sign in to your account
            </h2>
          </div>
          <div className="relative mt-10 w-full">
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label for="email" className="text-sm font-semibold leading-6">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="example@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-slate-300 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-600 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="password"
                    className="text-sm font-semibold leading-6"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-orange-500 hover:text-orange-600"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    required
                    className="w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-slate-300 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-slate-950 dark:ring-slate-600 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </div>
              {isLoading && <Loader />}
            </form>

            <p className="mt-10 text-center text-sm dark:text-white">
              First Time Here?{" "}
              <Link
                to={"/"}
                className="inline-flex font-semibold leading-6 text-orange-500 hover:text-orange-600"
              >
                Register Today!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
