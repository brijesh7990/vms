// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// const HomePage = () => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const [image, setImage] = useState<string | null>(null);
//     const streamRef = useRef<MediaStream | null>(null);

//     useEffect(() => {
//         const startCamera = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                 }
//                 streamRef.current = stream;

//                 // Capture image after 3 seconds
//                 setTimeout(() => {
//                     captureImage();
//                 }, 3000);

//                 // Stop the camera after 5 seconds
//                 setTimeout(() => {
//                     stopCamera();
//                 }, 5000);
//             } catch (error) {
//                 console.error("Error accessing camera:", error);
//             }
//         };

//         startCamera();

//         return () => {
//             stopCamera();
//         };
//     }, []);

//     const captureImage = () => {
//         if (!videoRef.current || !canvasRef.current) return;

//         const context = canvasRef.current.getContext("2d");
//         if (!context) return;

//         canvasRef.current.width = videoRef.current.videoWidth;
//         canvasRef.current.height = videoRef.current.videoHeight;

//         context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

//         // Convert to Base64 image
//         const imageData = canvasRef.current.toDataURL("image/png");
//         setImage(imageData);

//         // Convert Base64 to Blob and send to API
//         sendImageToAPI(imageData);
//     };

//     const stopCamera = () => {
//         if (streamRef.current) {
//             streamRef.current.getTracks().forEach((track) => track.stop());
//             streamRef.current = null;
//         }
//     };

//     const sendImageToAPI = async (imageBase64: string) => {
//         try {
//             const blob = await fetch(imageBase64).then((res) => res.blob());
//             const formData = new FormData();
//             formData.append("image", blob, "captured_image.png");

//             const response = await axios.post(import.meta.env.VITE_FACE_RECOGNIZE, formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             console.log("Response Data:", response.data); // Debugging log

//             const result = String(response.data.result).trim(); // Ensure it's a string and remove spaces
//             console.log("Processed result:", result);

//             if (response.status === 200 && result === "Unknow face") {
//                 console.log("Unknown face detected, saving new entry...");

//                 // Append additional data and send a new request
//                 const newFormData = new FormData();
//                 newFormData.append("image", blob, "captured_image.png");
//                 newFormData.append("name", "your name");
//                 newFormData.append("address", "your address");

//                 const saveResponse = await axios.post(import.meta.env.VITE_FACE_SAVE, newFormData, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 });

//                 console.log("Face saved successfully:", saveResponse.data);
//             }
//         } catch (error) {
//             console.error("Error uploading image:", error);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center">
//             <video ref={videoRef} autoPlay playsInline className="w-80 h-60 border border-gray-400" />
//             <canvas ref={canvasRef} className="hidden" />

//             {image && (
//                 <div className="mt-4">
//                     <p>Captured Image:</p>
//                     <img src={image} alt="Captured" className="w-40 h-30 border border-gray-400" />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default HomePage;








// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import LiveQA from "./LiveQA"; // Import LiveQA component

// const HomePage = () => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const [image, setImage] = useState<string | null>(null);
//     const streamRef = useRef<MediaStream | null>(null);
//     const [showLiveQA, setShowLiveQA] = useState(false);

//     useEffect(() => {
//         const startCamera = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                 }
//                 streamRef.current = stream;

//                 setTimeout(() => {
//                     captureImage();
//                 }, 3000);

//                 setTimeout(() => {
//                     stopCamera();
//                 }, 5000);
//             } catch (error) {
//                 console.error("Error accessing camera:", error);
//             }
//         };

//         startCamera();

//         return () => {
//             stopCamera();
//         };
//     }, []);

//     const captureImage = () => {
//         if (!videoRef.current || !canvasRef.current) return;

//         const context = canvasRef.current.getContext("2d");
//         if (!context) return;

//         canvasRef.current.width = videoRef.current.videoWidth;
//         canvasRef.current.height = videoRef.current.videoHeight;

//         context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

//         const imageData = canvasRef.current.toDataURL("image/png");
//         setImage(imageData);

//         sendImageToAPI(imageData);
//     };

//     const stopCamera = () => {
//         if (streamRef.current) {
//             streamRef.current.getTracks().forEach((track) => track.stop());
//             streamRef.current = null;
//         }
//     };

//     const sendImageToAPI = async (imageBase64: string) => {
//         try {
//             const blob = await fetch(imageBase64).then((res) => res.blob());
//             const formData = new FormData();
//             formData.append("image", blob, "captured_image.png");

//             const response = await axios.post(import.meta.env.VITE_FACE_RECOGNIZE, formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             console.log("Response Data:", response.data);

//             if (response.status === 200) {
//                 if (response.data.result === "Unknow face") {
//                     console.log("Unknown face detected, mounting LiveQA...");
//                     setShowLiveQA(true);
//                 } else {
//                     console.log("Known face detected:", response.data);
//                 }
//             }
//         } catch (error) {
//             console.error("Error uploading image:", error);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center">
//             {
//                 !showLiveQA && (
//                     <>
//                         <video ref={videoRef} autoPlay playsInline className="w-80 h-60 border border-gray-400" />
//                     </>
//                 )
//             }
//             {
//                 !showLiveQA && (
//                     <>
//                         <canvas ref={canvasRef} className="hidden" />
//                     </>
//                 )
//             }

//             {/* {image && (
//                 <div className="mt-4">
//                     <p>Captured Image:</p>
//                     <img src={image} alt="Captured" className="w-40 h-30 border border-gray-400" />
//                 </div>
//             )} */}

//             {showLiveQA && <LiveQA image={image} />}
//         </div>
//     );
// };

// export default HomePage;







// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import LiveQA from "./LiveQA";
// import { Loader2, Video, CheckCircle, AlertTriangle } from "lucide-react"; // Icons for better UI

// const HomePage = () => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const streamRef = useRef<MediaStream | null>(null);
//     const [image, setImage] = useState<string | null>(null);
//     const [showLiveQA, setShowLiveQA] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         startCamera();
//         return () => stopCamera();
//     }, []);

//     const startCamera = async () => {
//         try {
//             setError(null);
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoRef.current) videoRef.current.srcObject = stream;
//             streamRef.current = stream;

//             setTimeout(() => captureImage(), 3000);
//             setTimeout(() => stopCamera(), 5000);
//         } catch (error) {
//             setError("Error accessing the camera.");
//         }
//     };

//     const stopCamera = () => {
//         streamRef.current?.getTracks().forEach(track => track.stop());
//         streamRef.current = null;
//     };

//     const captureImage = () => {
//         if (!videoRef.current || !canvasRef.current) return;
//         const context = canvasRef.current.getContext("2d");
//         if (!context) return;

//         canvasRef.current.width = videoRef.current.videoWidth;
//         canvasRef.current.height = videoRef.current.videoHeight;

//         context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//         const imageData = canvasRef.current.toDataURL("image/png");
//         setImage(imageData);

//         sendImageToAPI(imageData);
//     };

//     const sendImageToAPI = async (imageBase64: string) => {
//         setLoading(true);
//         try {
//             const blob = await fetch(imageBase64).then(res => res.blob());
//             const formData = new FormData();
//             formData.append("image", blob, "captured_image.png");

//             const response = await axios.post(import.meta.env.VITE_FACE_RECOGNIZE, formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             setLoading(false);
//             if (response.status === 200) {
//                 if (response.data.result === "Unknow face") {
//                     setShowLiveQA(true);
//                 }
//             }
//         } catch (error) {
//             setLoading(false);
//             setError("Error processing the image.");
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//             <h1 className="text-3xl font-bold mb-4">Face Recognition System</h1>

//             {!showLiveQA && (
//                 <div className="relative">
//                     <video ref={videoRef} autoPlay playsInline className="w-80 h-60 border rounded-lg shadow-md" />
//                     <canvas ref={canvasRef} className="hidden" />
//                     {loading && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                             <Loader2 className="animate-spin text-white w-10 h-10" />
//                         </div>
//                     )}
//                 </div>
//             )}

//             {error && <p className="text-red-500 mt-2">{error}</p>}

//             {showLiveQA && (
//                 <LiveQA image={image} />
//             )}
//         </div>
//     );
// };

// export default HomePage;




// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import LiveQA from "./LiveQA";
// import { Loader2, Video, CheckCircle, AlertTriangle } from "lucide-react"; // Icons for better UI
// import { ToastContainer, toast } from 'react-toastify';

// const HomePage = () => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const streamRef = useRef<MediaStream | null>(null);
//     const [image, setImage] = useState<string | null>(null);
//     const [showLiveQA, setShowLiveQA] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [faceData, setFaceData] = useState<{ name: string; address: string; unique_id: string } | null>(null);

//     useEffect(() => {
//         startCamera();
//         return () => stopCamera();
//     }, []);

//     const startCamera = async () => {
//         try {
//             setError(null);
//             setFaceData(null); // Reset face data on new attempt
//             setShowLiveQA(false); // Reset LiveQA visibility
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoRef.current) videoRef.current.srcObject = stream;
//             streamRef.current = stream;

//             setTimeout(() => captureImage(), 3000);
//             setTimeout(() => stopCamera(), 5000);
//         } catch (error) {
//             setError("Error accessing the camera.");
//         }
//     };

//     const stopCamera = () => {
//         streamRef.current?.getTracks().forEach(track => track.stop());
//         streamRef.current = null;
//     };

//     const captureImage = () => {
//         if (!videoRef.current || !canvasRef.current) return;
//         const context = canvasRef.current.getContext("2d");
//         if (!context) return;

//         canvasRef.current.width = videoRef.current.videoWidth;
//         canvasRef.current.height = videoRef.current.videoHeight;

//         context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//         const imageData = canvasRef.current.toDataURL("image/png");
//         setImage(imageData);

//         sendImageToAPI(imageData);
//     };

//     // const sendImageToAPI = async (imageBase64: string) => {
//     //     setLoading(true);
//     //     try {
//     //         const blob = await fetch(imageBase64).then(res => res.blob());
//     //         const formData = new FormData();
//     //         formData.append("image", blob, "captured_image.png");

//     //         const response = await axios.post(import.meta.env.VITE_FACE_RECOGNIZE, formData, {
//     //             headers: { "Content-Type": "multipart/form-data" },
//     //         });

//     //         setLoading(false);
//     //         if (response.status === 200) {
//     //             if (response.data.result === "Unknow face") {
//     //                 setShowLiveQA(true);
//     //             } else if (response.data.name && response.data.address && response.data.unique_id) {
//     //                 setFaceData(response.data);
//     //             }else{
//     //                 setFaceData(response.error)
//     //             }
//     //         }
//     //     } catch (error) {
//     //         setLoading(false);
//     //         setError("Error processing the image.");
//     //     }
//     // };


//     const sendImageToAPI = async (imageBase64: string) => {
//         setLoading(true);
//         try {
//             const blob = await fetch(imageBase64).then(res => res.blob());
//             const formData = new FormData();
//             formData.append("image", blob, "captured_image.png");

//             const response = await axios.post(import.meta.env.VITE_FACE_RECOGNIZE, formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             setLoading(false);
//             if (response.status === 200) {
//                 if (response.data.result === "Unknow face") {
//                     setShowLiveQA(true);
//                 } else if (response.data.name && response.data.address && response.data.unique_id) {
//                     setFaceData(response.data);
//                 }
//             }
//         } catch (error: any) {
//             setLoading(false);
//             if (error.response && error.response.status === 400) {
//                 setError(error.response.data.error); // Extracting the exact error message from API response
//             } else {
//                 setError("Error processing the image.");
//             }
//         }
//     };


//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//             <h1 className="text-3xl font-bold mb-4">Face Recognition System</h1>

//             {!showLiveQA && !faceData && (
//                 <div className="relative">
//                     <video ref={videoRef} autoPlay playsInline className="w-80 h-60 border rounded-lg shadow-md" />
//                     <canvas ref={canvasRef} className="hidden" />
//                     {loading && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                             <Loader2 className="animate-spin text-white w-10 h-10" />
//                         </div>
//                     )}
//                 </div>
//             )}

//             {error && <p className="text-red-500 mt-2">{error}</p>}

//             {faceData && (
//                 <div className="bg-white p-4 rounded-lg shadow-md mt-4 w-80 text-center">
//                     <CheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
//                     <h2 className="text-xl font-semibold">Face Recognized</h2>
//                     <p className="text-gray-600 mt-2"><strong>Name:</strong> {faceData.name}</p>
//                     <p className="text-gray-600"><strong>Address:</strong> {faceData.address}</p>
//                     <p className="text-gray-600"><strong>Unique ID:</strong> {faceData.unique_id}</p>
//                 </div>
//             )}

//             {showLiveQA && <LiveQA image={image} />}
//         </div>
//     );
// };

// export default HomePage;





// import { useEffect, useRef, useState } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import LiveQA from "./LiveQA";
// import { Loader2, Video, CheckCircle } from "lucide-react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

// const HomePage = () => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const streamRef = useRef<MediaStream | null>(null);
//     const [image, setImage] = useState<string | null>(null);
//     const [showLiveQA, setShowLiveQA] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [faceData, setFaceData] = useState<{ name: string; address: string; unique_id: string } | null>(null);

//     useEffect(() => {
//         startCamera();
//         return () => stopCamera();
//     }, []);

//     const startCamera = async () => {
//         try {
//             setFaceData(null);
//             setShowLiveQA(false);
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoRef.current) videoRef.current.srcObject = stream;
//             streamRef.current = stream;

//             setTimeout(() => captureImage(), 3000);
//             setTimeout(() => stopCamera(), 5000);
//         } catch (error) {
//             toast.error("Error accessing the camera.");
//         }
//     };

//     const stopCamera = () => {
//         streamRef.current?.getTracks().forEach(track => track.stop());
//         streamRef.current = null;
//     };

//     const captureImage = () => {
//         if (!videoRef.current || !canvasRef.current) return;
//         const context = canvasRef.current.getContext("2d");
//         if (!context) return;

//         canvasRef.current.width = videoRef.current.videoWidth;
//         canvasRef.current.height = videoRef.current.videoHeight;

//         context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//         const imageData = canvasRef.current.toDataURL("image/png");
//         setImage(imageData);

//         sendImageToAPI(imageData);
//     };

//     const sendImageToAPI = async (imageBase64: string) => {
//         setLoading(true);
//         try {
//             const blob = await fetch(imageBase64).then(res => res.blob());
//             const formData = new FormData();
//             formData.append("image", blob, "captured_image.png");

//             const response = await axios.post(import.meta.env.VITE_FACE_RECOGNIZE, formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             setLoading(false);
//             if (response.status === 200) {
//                 if (response.data.result === "Unknow face") {
//                     setShowLiveQA(true);
//                 } else if (response.data.name && response.data.address && response.data.unique_id) {
//                     setFaceData(response.data);
//                 }
//             }
//         } catch (error: any) {
//             setLoading(false);
//             if (error.response && error.response.status === 400) {
//                 toast.error(error.response.data.error || "Error processing the image.");
//             } else {
//                 toast.error("Unexpected error occurred.");
//             }
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//             <h1 className="text-3xl font-bold mb-4">KIOSK</h1>

//             {!showLiveQA && !faceData && (
//                 <div className="relative">
//                     <video ref={videoRef} autoPlay playsInline className="w-80 h-60 border rounded-lg shadow-md" />
//                     <canvas ref={canvasRef} className="hidden" />
//                     {loading && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                             <Loader2 className="animate-spin text-white w-10 h-10" />
//                         </div>
//                     )}
//                 </div>
//             )}

//             {faceData && (
//                 <div className="bg-white p-4 rounded-lg shadow-md mt-4 w-80 text-center">
//                     <CheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
//                     <h2 className="text-xl font-semibold">Face Recognized</h2>
//                     <p className="text-gray-600 mt-2"><strong>Name:</strong> {faceData.name}</p>
//                     <p className="text-gray-600"><strong>Address:</strong> {faceData.address}</p>
//                     <p className="text-gray-600"><strong>Unique ID:</strong> {faceData.unique_id}</p>
//                 </div>
//             )}

//             {showLiveQA && <LiveQA image={image}  />}

//             <ToastContainer position="top-right" autoClose={3000} />
//         </div>
//     );
// };

// export default HomePage;










// import { useState } from 'react'
// import BannerImage from '../media/images/ai-robot2.svg';
// import LiveQA from './LiveQA';
// import { useNavigate } from 'react-router-dom';
// import Image1 from '../media/images/image-1.png';
// import Image2 from '../media/images/image-2.png';
// import AiHand from '../media/images/ai-hand.png';

// const HomePage = () => {
//     const navigate = useNavigate();
//     const [autoForm, setautoForm] = useState<boolean>(false);
//     return (
//         <>
//             <div className="w-screen h-full sm:h-screen bg-[#374151] flex justify-center items-center text-white ">
//                 {
//                     autoForm ? (
//                         <>
//                             <LiveQA />
//                         </>
//                     ) :
//                         (
//                             <>
//                                 <div className="container mx-auto">
//                                     <div className='absolute right-0 top-0 bottom-0 z-50'>
//                                         <img src={Image1} alt="" />
//                                     </div>

//                                     <div className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
//                                         <div className=' mt-[100px] p-8'>
//                                             <h1 className='text-6xl p-2' style={{ lineHeight: "80px" }}>એઆઈ આધારિત વિઝિટર મેનેજમેન્ટ સિસ્ટમ</h1>
//                                             <h1 className='mt-5 text-2xl p-2 font-extrabold' style={{ lineHeight: "40px" }}>આર્ટિફિશિયલ ઇન્ટેલિજન્સના ઉપયોગથી વ્યક્તિના ચહેરાના ફીચર્સ મારફત મુલાકાત સેવા વધુ સરળ સુગમ અને પ્રજાલક્ષી બનાવવા માટેની સિસ્ટમ
//                                             </h1>
//                                             <div className='flex justify-center items-center gap-10 mt-5 p-5'>
//                                                 <div>
//                                                     <button onClick={() => navigate("/form")} className='p-3 bg-[#DF6751] rounded-full  text-white'>
//                                                         મુલાકાત ફોર્મ
//                                                     </button>
//                                                 </div>
//                                                 <div>
//                                                     <button onClick={() => setautoForm(!autoForm)} className='p-3 bg-[#DF6751] rounded-full w-[140px] text-white '>
//                                                         વોઇસ બેઇઝ મુલાકાત ફોર્મ
//                                                     </button>
//                                                 </div>
//                                             </div>

//                                         </div>
//                                         <div className='flex justify-center items-center'>
//                                             {/* <img src={BannerImage} alt="banner image" className='rounded-3xl w-[600px]' /> */}
//                                             <img src={AiHand} alt="" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </>
//                         )
//                 }

//             </div>
//         </>
//     )
// }

// export default HomePage








// import { useState } from "react";
// import { motion } from "framer-motion";
// import BannerImage from "../media/images/ai-robot2.svg";
// import LiveQA from "./LiveQA";
// import { useNavigate } from "react-router-dom";
// import Image1 from "../media/images/image-1.png";
// import Image2 from "../media/images/image-2.png";
// import AiHand from "../media/images/ai-hand.png";

// const HomePage = () => {
//     const navigate = useNavigate();
//     const [autoForm, setautoForm] = useState<boolean>(false);

//     return (
//         <>
//             <div className="w-screen h-full sm:h-screen bg-[#374151] flex justify-center items-center text-white">
//                 {autoForm ? (
//                     <>
//                         <LiveQA />
//                     </>
//                 ) : (
//                     <>
//                         <div className="container mx-auto">
//                             <motion.div
//                                 className="absolute right-0 top-0 bottom-0 z-50"
//                                 initial={{ opacity: 0, x: 50 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ duration: 0.8 }}
//                             >
//                                 <img src={Image1} alt="" />
//                             </motion.div>

//                             <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
//                                 <div className="mt-[100px] p-8">
//                                     <h1 className="text-6xl p-2" style={{ lineHeight: "80px" }}>
//                                         એઆઈ આધારિત વિઝિટર મેનેજમેન્ટ સિસ્ટમ
//                                     </h1>
//                                     <h1
//                                         className="mt-5 text-2xl p-2 font-extrabold"
//                                         style={{ lineHeight: "40px" }}
//                                     >
//                                         આર્ટિફિશિયલ ઇન્ટેલિજન્સના ઉપયોગથી વ્યક્તિના ચહેરાના
//                                         ફીચર્સ મારફત મુલાકાત સેવા વધુ સરળ સુગમ અને પ્રજાલક્ષી બનાવવા
//                                         માટેની સિસ્ટમ
//                                     </h1>
//                                     <div className="flex justify-center items-center gap-10 mt-5 p-5">
//                                         <div>
//                                             <button
//                                                 onClick={() => navigate("/form")}
//                                                 className="p-3 bg-[#DF6751] rounded-full text-white"
//                                             >
//                                                 મુલાકાત ફોર્મ
//                                             </button>
//                                         </div>
//                                         <div>
//                                             <button
//                                                 onClick={() => setautoForm(!autoForm)}
//                                                 className="p-3 bg-[#DF6751] rounded-full w-[140px] text-white"
//                                             >
//                                                 વોઇસ બેઇઝ મુલાકાત ફોર્મ
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="flex justify-center items-center">
//                                     <motion.img
//                                         src={AiHand}
//                                         alt=""
//                                         initial={{ opacity: 0, scale: 0.8 }}
//                                         animate={{ opacity: 1, scale: 1 }}
//                                         transition={{ duration: 5 }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </>
//     );
// };

// export default HomePage;





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

                            <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
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
