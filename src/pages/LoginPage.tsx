import KioskImage from '../media/images/kiosk.png';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLoginCredentialSendMutation } from '../redux/loginSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/loader/Loader';
type Inputs = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    let navigate = useNavigate();

    const [loginCredentialSend, { isLoading, isError, data }] = useLoginCredentialSendMutation();

    const onSubmit: SubmitHandler<Inputs> = async (senddata) => {
        try {
            const response = await loginCredentialSend(senddata).unwrap();
            // toast.success("Login successful!");
            console.log("Login response:", response.message);
            toast.success(response.message);
            navigate("/admin")
        } catch (err: any) {
            console.error("Login error:", err);
            // toast.error(err?.senddata?.message || "Login failed! Please try again.");
            toast.error(err.data.error);

        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black  text-white  bg-gradient-to-r from-blue-500 to-amber-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle,white_5%,transparent_10%)] bg-[length:20px_20px] opacity-50"></div>
            {
                isLoading && (<>
                    <div className='absolute z-50 w-screen h-screen flex justify-center items-center'>
                        <Loader />
                    </div>
                </>)
            }
            <div className="grid md:grid-cols-2 grid-cols-1 bg-white p-8 w-full md:w-[600px] z-40  bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">
                {/* Image Section */}
                <div className="hidden md:flex items-center justify-center  p-6">
                    <img src={KioskImage} alt="Kiosk" className="max-w-full h-auto rounded-lg" />
                </div>

                {/* Form Section */}
                <div className="p-8 flex flex-col justify-center w-full">
                    <h2 className="text-2xl text-center text-white font-extrabold mb-6">Login</h2>

                    {/* Loading & Error Messages */}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-white font-medium">Username</label>
                            <input
                                type="text"
                                placeholder="Enter Your Username"
                                className="text-black w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-white font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                className="text-black w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
