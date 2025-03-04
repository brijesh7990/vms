import { useState, useRef } from "react";
import { Mic, CheckCircle, Camera } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserIcon from '../media/icons/user.png'
import UniqueId from '../media/icons/uniqueid.png';
import UserAddress from '../media/icons/address.png';
import UserMobile from '../media/icons/MobilePhone.png';
import UserPurpose from '../media/icons/UserPurpose.png';

const questions = [
    "What is your name?",
    "What is your address?",
    "What is your mobile number?",
    "What is your purpose?"
];

const LiveQA = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState<string[]>(Array(questions.length).fill(""));
    const [isRecognized, setIsRecognized] = useState(false);
    const [recognizedData, setRecognizedData] = useState<any>(null);
    const [startQASession, setStartQASession] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            toast.error("Failed to access camera. Please check your permissions.");
        }
    };

    const captureImage = async () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(async (blob) => {
                const formDataToSend = new FormData();
                formDataToSend.append("image", blob);

                try {
                    const response = await fetch(import.meta.env.VITE_FACE_RECOGNIZE, {
                        method: "POST",
                        body: formDataToSend,
                    });

                    const data = await response.json();
                    if (response.ok) {
                        if (data.unique_id) {
                            setRecognizedData(data);
                            setIsRecognized(true);
                            toast.success("Face recognized successfully!");
                        } else {
                            setStartQASession(true);
                            toast.warn("Face not recognized. Please answer the questions.");
                        }
                    }
                } catch (error) {
                    setStartQASession(true);
                    toast.error("Error processing request.");
                }
            }, "image/png");
        }
    };

    const speakQuestion = (question: string) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(question);
        synth.speak(utterance);
    };

    const startSpeechRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const newResponses = [...responses];
            newResponses[currentQuestion] = transcript;
            setResponses(newResponses);
            toast.success(`Recorded: ${transcript}`);
        };
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            speakQuestion(questions[currentQuestion + 1]);
        }
    };

    
    const handleSubmit = async () => {
        try {
            const canvas = canvasRef.current;
            if (!canvas) {
                toast.error("No image captured. Please try again.");
                return;
            }

            // Convert canvas to Blob (image file)
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    toast.error("Failed to process image.");
                    return;
                }

                const formData = new FormData();
                formData.append("image", blob, "captured_image.png"); // Append image file
                formData.append("name", responses[0]);
                formData.append("address", responses[1]);
                formData.append("mobile", responses[2]);
                formData.append("purpose", responses[3]);

                const response = await fetch(import.meta.env.VITE_FACE_SAVE, {
                    method: "POST",
                    body: formData, // Send form data
                });

                if (!response.ok) {
                    throw new Error("Submission failed. Please try again.");
                }

                toast.success("Form submitted successfully!");
                // navigate("/");
                window.location.reload();
            }, "image/png");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-amber-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,white_5%,transparent_10%)] bg-[length:20px_20px] opacity-50"></div>
                <div className="flex flex-col items-center bg-white text-white p-6 w-full md:w-[600px] mx-auto my-10 space-y-4 z-50 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">
                    <h2 className="text-5xl font-bold mb-10">Live Q&A Session</h2>
                    {!isRecognized && !startQASession ? (
                        <div className="flex flex-col items-center space-y-4">
                            <video ref={videoRef} autoPlay playsInline className="w-full max-w-xs h-auto rounded-lg border border-gray-600" />
                            <button className="w-full py-3 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition" onClick={startCamera}>
                                <Camera className="mr-2" /> Start Camera
                            </button>
                            <button className="w-full py-3 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition" onClick={captureImage}>
                                <Camera className="mr-2" /> Capture Image
                            </button>
                        </div>
                    ) : isRecognized ? (
                        <div className="flex flex-col items-center space-y-10 flex-wrap">
                            <div className="flex flex-col space-y-10">
                                <div className="flex  items-center gap-5">
                                    <img src={UniqueId} alt="" className="w-[50px] h-[50px]" />
                                    <div className="text-2xl">
                                        {
                                            recognizedData.unique_id
                                        }
                                    </div>
                                </div>
                                <div className="flex  items-center gap-5">
                                    <img src={UserIcon} alt="" className="w-[50px] h-[50px]" />
                                    <div className="text-2xl">
                                        {
                                            recognizedData.name
                                        }
                                    </div>
                                </div>
                                <div className="flex  items-center gap-5 ">
                                    <img src={UserAddress} alt="" className="w-[50px] h-[50px]" />
                                    <div className="text-2xl">
                                        {
                                            recognizedData.address
                                        }
                                    </div>
                                </div>
                                <div className="flex  items-center gap-5 ">
                                    <img src={UserMobile} alt="" className="w-[50px] h-[50px]" />
                                    <div className="text-2xl">
                                        {
                                            recognizedData.mobile
                                        }
                                    </div>
                                </div>
                                <div className="flex  items-center gap-5 ">
                                    <img src={UserPurpose} alt="" className="w-[50px] h-[50px]" />
                                    <div className="text-2xl">
                                        {
                                            recognizedData.purpose
                                        }
                                    </div>
                                </div>
                            </div>
                            <CheckCircle className="text-green-500 w-12 h-12" />
                        </div>
                    ) : (
                        <div className="w-full space-y-4 text-center">
                            <p className="text-lg font-medium">{questions[currentQuestion]}</p>
                            <button className="w-full py-3 bg-yellow-500 text-white rounded-lg flex items-center justify-center hover:bg-yellow-600 transition" onClick={startSpeechRecognition}>
                                <Mic className="mr-2" /> Speak Answer
                            </button>
                            {currentQuestion < questions.length - 1 ? (
                                <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={handleNextQuestion}>
                                    Next Question
                                </button>
                            ) : (
                                <button className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" onClick={handleSubmit}>
                                    Submit
                                </button>
                            )}
                        </div>
                    )}
                    <canvas ref={canvasRef} className="hidden" />

                </div>
                <ToastContainer position="top-right" />
            </div>
        </>
    );
};

export default LiveQA;