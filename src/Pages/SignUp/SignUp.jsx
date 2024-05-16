import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {


    const navigate = useNavigate();

    const { createUser, updateUserProfile } = useContext(AuthContext)

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const password = watch('password');

    const onSubmit = data => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const photoURL = data.photoURL;
        console.log(email, password)

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                const role = 'student';
                console.log(loggedUser);
                updateUserProfile(name, photoURL)
                    .then(() => {
                        const saveUser = { name, email, img: photoURL, role: role }
                        fetch('https://music-instrument-learning-school-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })



                    })
                    .catch(error => console.log(error))
            })

    }

    const strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])");

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full mt-20 p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                    Sign Up
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    {errors.exampleRequired && <span className="text-red-600">This field is required</span>}
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            {...register("name", { required: true })}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.name && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            {...register("email", { required: true })}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.email && <span className="text-red-600">This field is required</span>}
                    </div>

                    <div className="form-control w-full my-5">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", {
                            required: 'Invalid Password',
                            minLength: { value: 6, message: "Password Must Be 6 Characters Or longer." },
                            pattern: {
                                value: strongRegex,
                                message: "Password Must use special Characters!"
                            }

                        })} type="password" className="input input-bordered w-full input-primary" />
                        {errors.password && <p className='text-error font-medium mt-1'>{errors.password?.message}</p>}

                    </div>


                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            {...register("confirmPassword", {
                                required: true,
                                validate: (value) => value === password || 'Passwords do not match',
                            })}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
                    </div>


                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Photo Url
                        </label>
                        <input
                            type="url"
                            name="photoURL"
                            {...register("photoURL")}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" type="submit"  > submit</button>
                        
                    </div>
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>
                <SocialLogin></SocialLogin>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    have an account?{" "}
                    <Link
                        to={'/login'}
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;