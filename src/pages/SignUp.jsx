import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {

    const [data, setData] = useState({
        userName: "",
        name: "",
        password: "",
        email: "",
        phoneNumber: "",
        avatar: "",
        address: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
        console.log(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "https://localhost:7199/api/auth/register/customer";
            const { data: res } = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className="flex h-screen py-4">
            <div className="m-auto w-full md:w-3/4 lg:w-2/3 xl:w-2/4 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-between items-center mb-8 px-6 py-4 bg-gray-200">
                    <h1 className="text-3xl font-bold text-gray-700">Welcome Back</h1>
                    <Link to="/login" className="focus:border-blue-400 transition delay-150 duration-300 ease-in-out text-blue-500 hover:text-gray-700 focus:outline-none">
                        Sign in
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="px-6 py-4">
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">Create Account</h3>
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">UserName</label>
                            <input
                                type="text"
                                placeholder="User Name"
                                name="userName"
                                onChange={handleChange}
                                value={data.userName}
                                required
                                className="focus:border-blue-400 transition delay-150 duration-300 ease-in-out appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2 mt-4 md:mt-0">FullName</label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                onChange={handleChange}
                                value={data.name}
                                required
                                className="focus:border-blue-400 transition delay-150 duration-300 ease-in-out appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className="focus:border-blue-400 transition delay-150 duration-300 ease-in-out appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                autoComplete='off'
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2 mt-4 md:mt-0">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                autoComplete='off'
                                className="focus:border-blue-400 transition delay-150 duration-300 ease-in-out appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            onChange={handleChange}
                            value={data.phoneNumber}
                            required
                            className="focus:border-blue-400 transition delay-150 duration-300 ease-in-out appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="avatar" className="block text-gray-700 font-bold mb-2">Avatar</label>
                        <input
                            type="text"
                            placeholder="Avatar URL"
                            name="avatar"
                            onChange={handleChange}
                            value={data.avatar}
                            required
                            className="focus:border-blue-400 transition delay-150 duration-300 ease-in-out appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
                        <textarea
                            placeholder="Address"
                            name="address"
                            onChange={handleChange}
                            value={data.address}
                            className="focus:border-blue-400 transition delay-150 duration-300 ease-in-out appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            class="transition delay-150 duration-300 ease-in-out bg-gradient-to-r from-grey-500 to-grey-700 text-gray-500 font-bold py-3 px-4 rounded hover:bg-sky-500 hover:ring-sky-500 hover:text-white"
                        >
                            Sign up
                        </button>

                    </div>  
                </form>
            </div>
        </div>
    );
}

export default Signup;