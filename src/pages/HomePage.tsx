import { useState } from "react";
import { motion } from "framer-motion";
import LiveQA from "./LiveQA";
import { useNavigate } from "react-router-dom";
import Image1 from "../media/images/image-1.png";
import AiHand from "../media/images/ai-hand.png";

const HomePage = () => {
    const navigate = useNavigate();
    const [autoForm, setautoForm] = useState<boolean>(false);

    return (
        <>
            <div className="w-screen h-full sm:h-screen bg-black flex justify-center items-center text-white  bg-gradient-to-r from-blue-500 to-amber-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,white_5%,transparent_10%)] bg-[length:20px_20px] opacity-50"></div>
                {autoForm ? (
                    <>
                        <LiveQA />
                    </>
                ) : (
                    <>
                        <div className="container mx-auto">
                            <div className="absolute right-0 top-0 bottom-0 z-50 xl:block hidden">
                                <img src={Image1} alt="" />
                            </div>
                            <div className="absolute left-0 scale-y-[-1] bottom-0 z-10 transform scale-x-[-1] hidden xl:block">
                                <img src={Image1} alt="" />
                            </div>

                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                                <div className="mt-[100px] p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg z-50">
                                    <h1 className="text-6xl p-2" style={{ lineHeight: "80px" }}>
                                        એઆઈ આધારિત વિઝિટર મેનેજમેન્ટ સિસ્ટમ
                                    </h1>
                                    <h1
                                        className="mt-5 text-2xl p-2 font-extrabold"
                                        style={{ lineHeight: "40px" }}
                                    >
                                        આર્ટિફિશિયલ ઇન્ટેલિજન્સના ઉપયોગથી વ્યક્તિના ચહેરાના
                                        ફીચર્સ મારફત મુલાકાત સેવા વધુ સરળ સુગમ અને પ્રજાલક્ષી બનાવવા
                                        માટેની સિસ્ટમ
                                    </h1>
                                    <div className="flex justify-center items-center gap-10 mt-5 p-5">
                                        <div>
                                            <button
                                                onClick={() => navigate("/form")}
                                                className="px-4 py-4 bg-[#DF6751] rounded-full text-white shadow-md shadow-[#DF6751]/50"
                                            >
                                                મુલાકાત ફોર્મ
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => setautoForm(!autoForm)}
                                                className="p-3 py-4 bg-[#DF6751] rounded-full text-white shadow-md shadow-[#DF6751]/50"
                                            >
                                                વોઇસ બેઇઝ મુલાકાત ફોર્મ
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => navigate("/login")}
                                                className="p-3 py-4 bg-[#DF6751] rounded-full text-white shadow-md shadow-[#DF6751]/50"
                                            >
                                                અધિકારી લૉગિન
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center mt-10 z-50">
                                    <motion.img
                                        src={AiHand}
                                        alt="AI Hand"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default HomePage;