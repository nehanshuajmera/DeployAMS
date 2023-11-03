import { useState } from "react";
import { useLogin } from "../context/LoginContext";

const initialLoginData = {
  userId: "",
  password: "",
};
const initialResetData = {
  userId: "",
  password: "",
};

const Login = () => {
  const [toggle, setToggle] = useState(true);
  const {loginHandler} = useLogin()
  // toggle == true --> login form
  // toggle == false --> forget password form
  const [loginData, setLoginData] = useState(initialLoginData);
  const [restData, setRestData] = useState(initialResetData);
  return (
    <div className="h-screen w-full flex flexCenter bg-[#f6f5f7] ">
      {/* desktop */}
      <div className=" w-1/2 bg-white flex md:items-center justify-between flex-col md:flex-row gap-5 relative h-3/4 md:h-2/3">
        {/* reset password */}
        <div
          className={`absolute bottom-0 md:right-0 ease-in-out loginContainers duration-700 flexCenter ${
            toggle
              ? "opacity-0 z-10"
              : "z-20 translate-y-[-100%] opacity-1 md:translate-y-0 md:translate-x-[-100%]"
          }`}
        >
          <div className="flex flex-col gap-2 md:gap-12">
            <h3 className="font-semibold text-xl md:text-3xl">
              Reset Password
            </h3>
            <div className="flex flex-col gap-2 md:gap-12 flex-1">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className=" inputBox font-medium text-secondary"
                >
                  Enrollment
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enrollment"
                  value={restData.enroll}
                  onChange={(e) => {
                    setRestData((perv) => ({
                      ...perv,
                      userId: e.target.value,
                    }));
                  }}
                  className="inputBox  outline-none bg-[#eee]"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="inputBox  font-medium text-secondary"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={restData.password}
                  onChange={(e) => {
                    setRestData((perv) => ({
                      ...perv,
                      password: e.target.value,
                    }));
                  }}
                  className="inputBox outline-none  bg-gray-200"
                />
              </div>
            </div>
            <div>
              <button className="button1">Reset</button>
            </div>
          </div>
        </div>
        {/* log in */}
        <div
          className={`absolute top-0 md:left-0 ease-in-out loginContainers duration-700 flexCenter ${
            toggle
              ? "z-20 translate-y-[100%] opacity-1 md:translate-y-0 md:translate-x-[100%]"
              : "opacity-0 z-10"
          }`}
        >
          <div className="flex flex-col gap-2 md:gap-12">
            <h3 className="font-semibold text-xl md:text-3xl">Log In</h3>
            <div className="flex flex-col gap-2 md:gap-12 flex-1">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className=" inputBox font-medium text-secondary"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={loginData.enroll}
                  onChange={(e) => {
                    setLoginData((perv) => ({
                      ...perv,
                      userId: e.target.value,
                    }));
                  }}
                  className="inputBox  outline-none bg-[#eee]"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="inputBox font-medium text-secondary"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => {
                    setLoginData((perv) => ({
                      ...perv,
                      password: e.target.value,
                    }));
                  }}
                  className="inputBox outline-none  bg-gray-200"
                />
              </div>
            </div>
            <div>
              <button className="button1" onClick={()=>loginHandler(loginData)}>Log In</button>
            </div>
          </div>
        </div>
        {/* overlap container */}
        <div
          className={`px-4 absolute loginContainers z-50 bg-primary flexCenter ease-in-out duration-700 ${
            toggle
              ? ""
              : "translate-y-[100%] md:translate-x-[100%] md:translate-y-0"
          }`}
        >
          <div className={`flexStart flex-col ${toggle ? "block" : "hidden"}`}>
            <h4 className="font-medium text-lg my-1">Welcome</h4>
            <p className="pb-6">Check your Attendance</p>
            <button
              onClick={() => setToggle((prev) => !prev)}
              className="button2"
            >
              Forget Password
            </button>
          </div>
          <div className={`flexStart flex-col ${toggle ? "hidden" : "block"}`}>
            <h4 className="font-medium text-lg my-1">Hey!</h4>
            <p className="pb-6">Come and check Your Attendance</p>
            <button
              onClick={() => setToggle((prev) => !prev)}
              className="button2"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
