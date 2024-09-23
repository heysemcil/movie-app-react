import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {createUser, signUpProvider} = useAuth()


  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = `${name} ${lastName}`
    createUser(email, password, displayName)
  };

  return (
    <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main">
      <div
        className={`mt-[10vh] mx-auto overflow-hidden relative w-[380px] h-[540px] rounded-[8px] dark:bg-[#1c1c1c] 
   before:content-[""] before:absolute before:w-[380px] before:h-[420px] before:top-[-50%] before:left-[-50%] 
    after:content-[""] after:absolute after:w-[380px] after:h-[420px] after:top-[-50%] after:left-[-50%]
    custom-linear-gradient 

    `}
      >
        <form
          onSubmit={handleSubmit}
          className="absolute inset-[2px] rounded-[8px] bg-gray-100 dark:bg-[#28292d] z-[10] flex flex-col py-[50px] px-[40px]"
        >
          <h2 className="text-red-main text-2xl font-[500] text-center mb-3 tracking-[0.1em]">
            Sign Up
          </h2>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="peer"
              id="floating_name"
              name="floating_name"
              type="text"
              placeholder=" "
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floating_name"> FirstName</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="peer"
              id="floating_lastName"
              name="floating_lastName"
              type="text"
              placeholder=" "
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="floating_lastName"> Last Name</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="peer"
              id="floating_email"
              name="floating_email"
              type="email"
              placeholder=" "
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floating_email"> Email</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="peer"
              id="floating_password"
              name="floating_password"
              type="password"
              placeholder=" "
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floating_password"> Password</label>
          </div>

           
          <button className="btn-danger" type="submit">
            Register
          </button>
          <button
            type="button"
            className="btn-danger flex justify-between items-center"
            onClick={()=> signUpProvider()}
          >
            <span> Continue with Google</span>
            <FcGoogle className="text-3xl" />
          </button>
        </form>
      </div>
    </div>
  );
}
