import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { UseAuthContext } from "../../context/AuthContext.jsx";

const Signup = () => {
  const [loading, setloading] = useState(false);
  const { setauthUser } = UseAuthContext();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  //   console.log(formData)
  // };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? value : "") : value,
    }));

    console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.username ||
      !formData.password ||
      !formData.gender
    ) {
      toast.error("fill empty fields");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password should > 6 characters");
      return false;
    }

    try {
      setloading(true);

      let response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let res = await response.json();
      console.log("res value:", res);
      localStorage.setItem("chat-user", JSON.stringify(res));
      setauthUser(res);

      if (!response.ok) {
        const errorText = await response.text(); // Read response as text
        let errorMessage = "Failed to submit data";

        // Attempt to parse the response as JSON, but handle if it's not JSON
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          // If parsing fails, use the raw text
          console.log("Response is not valid JSON:", errorText);
        }
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      console.log("Data submitted successfully");
      console.log(formData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    //
    <div className="text-white flex justify-center">
      <div className="mt-7 w-[35%] h-[40vw]  glass-effect">
        <h1 className="mb-2 mt-5  text-center text-2xl font-bold text-gray-300 capitalize lg:text-3xl dark:text-white">
          Sign In
        </h1>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="Name"
                className="block text-left mb-2 text-sm text-gray-200 dark:text-gray-200"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                id="name"
                onChange={handleChange}
                placeholder="Enter Name"
                className="block w-72 px-4 py-2 mb-2 text-gray-300 placeholder-gray-400 bg-gray-800 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>

            <div>
              <label
                htmlFor="Username"
                className="block text-left mb-2 text-sm text-gray-200 dark:text-gray-200"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                id="username"
                onChange={handleChange}
                placeholder="Enter Username"
                className="block w-72 px-4 py-2 mt-2 text-gray-300 placeholder-gray-400 bg-gray-800 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>

            <div className="mt-2">
              <div className="flex justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-200 dark:text-gray-200"
                >
                  Password
                </label>
              </div>

              <input
                type="password"
                name="password"
                value={formData.password}
                id="password"
                onChange={handleChange}
                placeholder="Enter Password"
                className="block w-72 px-4 py-2 mt-2 text-gray-300 placeholder-gray-400 bg-gray-800 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            {/* <div className="mt-2">
            <label
              htmlFor="Username"
              className="block text-left mb-2 text-sm text-gray-300 dark:text-gray-200"
            >
              Gender
            </label>
            <div className="text-left flex items-center">
              <label className="text-gray-400 ml-5" htmlFor="male">
                Male
              </label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="w-4 h-4 ml-1  text-blue-600 bg-gray-700 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                //   checked={selectedGender === "male"}
              />
              <label className="ml-4 text-gray-400" htmlFor="female">
                Female
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="w-4 h-4  ml-1 text-blue-600 bg-gray-700 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                //   checked={selectedGender === "female"}
              />
            </div>
          </div> */}

            <div className="flex">
              <div className="form-control">
                <label className="label gap-2 cursor-pointer">
                  <span className="label-text text-gray-200">Male</span>
                  <input
                    type="checkbox"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="checkbox border-slate-300"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label gap-2 cursor-pointer text-gray-300">
                  <span className="label-text text-gray-200">Female</span>
                  <input
                    type="checkbox"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="checkbox border-slate-300"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-72 px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                {!loading ? (
                  <p>Sign In</p>
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account -{" "}
          <Link
            to={"/"}
            className="text-blue-50 focus:outline-none focus:underline hover:underline"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Signup;
