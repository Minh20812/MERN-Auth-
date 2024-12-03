import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/feature/auth/authSlice";
import { toast } from "react-toastify";
// import GoogleLogin from "./components/SocialLogin";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <>
      <div class="rounded-lg py-12 dark:bg-slate-900">
        <div class="m-6 flex flex-col justify-center rounded-lg bg-white px-6 py-12 shadow-md sm:mx-auto sm:w-full sm:max-w-md lg:px-8 dark:bg-slate-950 dark:text-white">
          <div class="mx-auto w-full">
            <div class="flex items-center justify-center gap-3">
              <img
                class="size-8"
                src="https://i.imgur.com/NOhGpvI.jpeg"
                alt="Your Brand"
              />
              <h1 class="pt-1 font-semibold">MINOVA</h1>
            </div>
            <h2 class="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight">
              Register
            </h2>
          </div>
          <div class="relative mt-10 w-full">
            <form class="space-y-6" onSubmit={submitHandler}>
              <div>
                <label for="name" class="text-sm font-semibold leading-6">
                  Name
                </label>
                <div class="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autocomplete="name"
                    placeholder="Enter name"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    required
                    class="w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-slate-300 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-600 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label for="email" class="text-sm font-semibold leading-6">
                  Email Address
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    class="w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-slate-300 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-slate-950 dark:ring-slate-600 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label for="password" class="text-sm font-semibold leading-6">
                    Password
                  </label>
                </div>
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    class="w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-slate-300 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-slate-950 dark:ring-slate-600 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="confirmPassword"
                    class="text-sm font-semibold leading-6"
                  >
                    Confirm Password
                  </label>
                </div>
                <div class="mt-2">
                  <input
                    id="password"
                    name="confirmPassword"
                    type="password"
                    autocomplete="current-password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    class="w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-slate-300 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-slate-950 dark:ring-slate-600 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </div>
              {isLoading && <Loader />}
            </form>

            <p class="mt-10 text-center text-sm dark:text-white">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="inline-flex font-semibold leading-6 text-orange-500 hover:text-orange-600"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
