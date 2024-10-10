import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UseAuthContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setloading] = useState(false);
  const { setauthUser } = UseAuthContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   fetch('http://localhost:3000/api/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(formData)
  //   })
  //     .then(data => {
  //       console.log('data submitted successfully..')
  //     })
  //     .catch(error => {
  //       console.log('error in sending formData',error.message)
  //     });
  //   console.log(formData);
  // };

  //---------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.username ||
      !formData.password
    ) {
      toast.error("fill empty fields");
      return false;
    }
    // if (formData.password.length < 6) {
    //   toast.error("Password should > 6 characters");
    //   return false;
    // }

    try {
      setloading(true);

      let response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("response-login.jsx", response);
      

      if (!response.ok) {
        const errorText = await response.text(); // Read response as text
        let errorMessage = " invalid username or password";

        // Attempt to parse the response as JSON, but handle if it's not JSON
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          // If parsing fails, use the raw text
          console.log("Response is not valid JSON:", errorText);
          // toast.error(parseError)
        }

        // toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      let res = await response.json();
      console.log("res value:", res);
      localStorage.setItem("chat-user", JSON.stringify(res));
      setauthUser(res);

      console.log("Data submitted successfully");
      console.log(formData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  //----------------------------------------
  return (
    <div className="text-white flex justify-center ">
      <div className="mt-8 w-[35%] h-[40vw]   glass-effect">
        <h1 className="mb-8  mt-8 text-2xl text-center font-bold text-gray-300 capitalize lg:text-3xl dark:text-white">
          login to your account
        </h1>

        <div className="flex justify-center">
          <form onClick={handleSubmit} >
            <div>
              <label
                htmlFor="Username"
                className="block pr-56 mb-2 text-sm text-gray-100 dark:text-gray-200"
              >
                Username
              </label>
              <input
                type="text"
                cal={true}
                name="username"
                value={formData.username}
                id="username"
                placeholder="Enter Username"
                onChange={handleChange}
                className="block w-72 px-4 py-2 mt-2 text-gray-300 placeholder-gray-400 bg-gray-800 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>

            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-100 dark:text-gray-200"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <input
                type="password"
                cal={true}
                name="password"
                id="password"
                value={formData.password}
                placeholder="Enter Password"
                onChange={handleChange}
                className="block w-72 px-4 py-2 mt-2 text-gray-300 placeholder-gray-400 bg-gray-800 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6 ">
              <button
                type="submit"
                className="w-72  px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                {!loading?(<p>Log In</p>):(<span className="loading loading-spinner"></span>)}
                {/* Log In */}
              </button>
            </div>
          </form>
        </div>
        <p className="mt-6 text-sm text-center text-gray-400">
          Don&#x27;t have an account yet?{" "}
          {/* <a
            href="#"
            className="text-blue-50 focus:outline-none focus:underline hover:underline"
          >
            Sign up
          </a> */}
          <Link
            to="/signup"
            className="text-blue-50 focus:outline-none focus:underline hover:underline"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
