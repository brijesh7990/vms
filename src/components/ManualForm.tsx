// import { useRef, useState, useEffect } from "react";
// import "regenerator-runtime";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { Mic, RefreshCcw, Camera, MicOff } from "lucide-react";

// const ManualForm = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         address: "",
//         mobile: "",
//         purpose: "",
//     });

//     const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
//     const [activeField, setActiveField] = useState(null);
//     const fieldTextRef = useRef({});
//     const timeoutRef = useRef(null); // To debounce transcript updates
//     const [isCapturing, setIsCapturing] = useState(false);
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         if (activeField && transcript) {
//             // Debounce updates for efficiency
//             clearTimeout(timeoutRef.current);
//             timeoutRef.current = setTimeout(() => {
//                 setFormData((prev) => ({
//                     ...prev,
//                     [activeField]: fieldTextRef.current[activeField] + " " + transcript,
//                 }));
//             }, 500); // 500ms delay to prevent frequent updates
//         }
//     }, [transcript, activeField]);

//     const handleMicClick = (field) => {
//         if (activeField === field) {
//             SpeechRecognition.abortListening(); // Instantly stop listening
//             setActiveField(null);
//         } else {
//             SpeechRecognition.abortListening();

//             // Store existing text before resetting
//             fieldTextRef.current[field] = formData[field] || "";

//             resetTranscript();
//             setActiveField(field);
//             SpeechRecognition.startListening({
//                 continuous: true,
//                 language: "gu-IN",
//                 interimResults: false, // Prevents partial results, improving accuracy
//             });
//         }
//     };

//     const startCamera = async () => {
//         try {
//             setIsCapturing(true);
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoRef.current) videoRef.current.srcObject = stream;
//         } catch (error) {
//             console.error("Error accessing the camera:", error);
//             toast.error("Could not access the camera.");
//         }
//     };

//     const captureImage = async () => {
//         const canvas = canvasRef.current;
//         const video = videoRef.current;
//         if (canvas && video) {
//             const context = canvas.getContext("2d");
//             canvas.width = video.videoWidth;
//             canvas.height = video.videoHeight;
//             context.drawImage(video, 0, 0, canvas.width, canvas.height);

//             canvas.toBlob(async (blob) => {
//                 setFormData((prev) => ({ ...prev, image: blob }));

//                 const stream = video.srcObject;
//                 if (stream) {
//                     stream.getTracks().forEach((track) => track.stop());
//                 }
//                 setIsCapturing(false);

//                 const formDataToSend = new FormData();
//                 formDataToSend.append("image", blob);

//                 try {
//                     const response = await fetch(import.meta.env.VITE_FACE_RECOGNIZE, {
//                         method: "POST",
//                         body: formDataToSend,
//                     });
//                     if (response.ok) {
//                         const data = await response.json();
//                         setFormData({
//                             name: data.name,
//                             address: data.address,
//                             mobile: data.mobile,
//                             purpose: data.purpose,
//                             image: blob,
//                             unique_id: data.unique_id,
//                         });
//                     } else {
//                         toast.error("Error recognizing face. Please try again.");
//                     }
//                 } catch (error) {
//                     console.error("Face recognition error:", error);
//                     toast.error("Network error. Please check your connection.");
//                 }
//             }, "image/png");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formDataToSend = new FormData();
//             Object.entries(formData).forEach(([key, value]) => {
//                 if (value) formDataToSend.append(key, value);
//             });

//             const response = await fetch(import.meta.env.VITE_FACE_SAVE, {
//                 method: "POST",
//                 body: formDataToSend,
//             });

//             if (response.ok) {
//                 toast.success("Form submitted successfully! 🎉");
//                 setFormData({ name: "", address: "", mobile: "", purpose: "", image: null });
//             } else {
//                 toast.error("Error submitting form. Please try again.");
//             }
//         } catch (error) {
//             console.error("Submission error:", error);
//             toast.error("Network error. Please check your connection.");
//         }
//     };

//     if (!browserSupportsSpeechRecognition) {
//         alert("Your browser does not support speech recognition. Please use the latest version of Chrome.");
//         return <p>Your browser does not support speech recognition.</p>;
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-amber-800 relative overflow-hidden">
//             <div className="absolute inset-0 bg-[radial-gradient(circle,white_5%,transparent_10%)] bg-[length:20px_20px] opacity-50"></div>
//             <div className="bg-white p-8 w-full md:w-[600px] z-50 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">
//                 <h2 className="text-2xl font-semibold text-white text-center mb-6">વ્યક્તિગત વિગત</h2>
//                 <div className="relative">
//                     <label className="block text-white font-medium">મુલાકાતીનો ફોટો</label>
//                     {formData.image ? (
//                         <div className="flex flex-col items-center">
//                             <img src={URL.createObjectURL(formData.image)} alt="Captured" className="w-32 h-32 object-cover rounded-lg shadow-lg" />
//                             <button type="button" onClick={() => setFormData({ ...formData, image: null })} className="mt-2 flex items-center gap-1 text-red-500 hover:text-red-700">
//                                 <RefreshCcw size={18} /> Retake
//                             </button>
//                         </div>
//                     ) : (
//                         <button type="button" onClick={startCamera} className="mt-2 flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
//                             <Camera size={20} /> Capture Image
//                         </button>
//                     )}
//                 </div>
//                 {isCapturing && (
//                     <div className="mt-4">
//                         <video ref={videoRef} autoPlay className="w-full rounded-lg shadow-lg"></video>
//                         <button type="button" onClick={captureImage} className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
//                             Capture
//                         </button>
//                     </div>
//                 )}
//                 <canvas ref={canvasRef} className="hidden"></canvas>
//                 <form className="space-y-4">
//                     {[
//                         { key: "name", label: "નામ" },
//                         { key: "address", label: "સરનામું" },
//                         { key: "mobile", label: "મોબાઇલ" },
//                         { key: "purpose", label: "મુલાકાતનું કારણ" },
//                     ].map((field) => (
//                         <div key={field.key} className="relative">
//                             <label className="block text-white font-medium">{field.label}</label>
//                             <div className="flex items-center">
//                                 <textarea
//                                     value={formData[field.key]}
//                                     onChange={(e) =>
//                                         setFormData({ ...formData, [field.key]: e.target.value })
//                                     }
//                                     className="w-full mt-1 p-2 border rounded-lg"
//                                     placeholder={`Enter ${field.label}`}
//                                 />
//                                 {activeField === field.key ? (
//                                     <MicOff className="ml-2 text-white cursor-pointer" onClick={() => handleMicClick(field.key)} />
//                                 ) : (
//                                     <Mic className="ml-2 text-white cursor-pointer" onClick={() => handleMicClick(field.key)} />
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ManualForm;



































import { useRef, useState, useEffect } from "react";
import "regenerator-runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Mic, RefreshCcw, Camera, MicOff } from "lucide-react";
import toast from "react-hot-toast";

const ManualForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        mobile: "",
        purpose: "",
        image: null,
    });

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [activeField, setActiveField] = useState(null);
    const fieldTextRef = useRef({});
    const timeoutRef = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (activeField && transcript) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setFormData((prev) => ({
                    ...prev,
                    [activeField]: fieldTextRef.current[activeField] + " " + transcript,
                }));
            }, 500);
        }
    }, [transcript, activeField]);

    const handleMicClick = (field) => {
        if (activeField === field) {
            SpeechRecognition.abortListening();
            setActiveField(null);
        } else {
            SpeechRecognition.abortListening();
            fieldTextRef.current[field] = formData[field] || "";
            resetTranscript();
            setActiveField(field);
            SpeechRecognition.startListening({
                continuous: true,
                language: "gu-IN",
                interimResults: false,
            });
        }
    };

    const startCamera = async () => {
        try {
            setIsCapturing(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Error accessing the camera:", error);
            toast.error("Could not access the camera.");
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
                setFormData((prev) => ({ ...prev, image: blob }));

                const stream = video.srcObject;
                if (stream) {
                    stream.getTracks().forEach((track) => track.stop());
                }
                setIsCapturing(false);

                const formDataToSend = new FormData();
                formDataToSend.append("image", blob);

                try {
                    const response = await fetch(import.meta.env.VITE_FACE_RECOGNIZE, {
                        method: "POST",
                        body: formDataToSend,
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setFormData({
                            name: data.name,
                            address: data.address,
                            mobile: data.mobile,
                            purpose: data.purpose,
                            image: blob,
                            unique_id: data.unique_id,
                        });
                    } else {
                        toast.error("Error recognizing face. Please try again.");
                    }
                } catch (error) {
                    console.error("Face recognition error:", error);
                    toast.error("Network error. Please check your connection.");
                }
            }, "image/png");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) formDataToSend.append(key, value);
            });

            const response = await fetch(import.meta.env.VITE_FACE_SAVE, {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success("Form submitted successfully! 🎉");
                setFormData({ name: "", address: "", mobile: "", purpose: "", image: null });
            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Network error. Please check your connection.");
        }
    };

    if (!browserSupportsSpeechRecognition) {
        alert("Your browser does not support speech recognition. Please use the latest version of Chrome.");
        return <p>Your browser does not support speech recognition.</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-amber-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle,white_5%,transparent_10%)] bg-[length:20px_20px] opacity-50"></div>
            <div className="bg-white p-8 w-full md:w-[600px] z-50 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">વ્યક્તિગત વિગત</h2>
                <div className="relative">
                    <label className="block text-white font-medium">મુલાકાતીનો ફોટો</label>
                    {formData.image ? (
                        <div className="flex flex-col items-center">
                            <img src={URL.createObjectURL(formData.image)} alt="Captured" className="w-32 h-32 object-cover rounded-lg shadow-lg" />
                            <button type="button" onClick={() => setFormData({ ...formData, image: null })} className="mt-2 flex items-center gap-1 text-red-500 hover:text-red-700">
                                <RefreshCcw size={18} /> Retake
                            </button>
                        </div>
                    ) : (
                        <button type="button" onClick={startCamera} className="mt-2 flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                            <Camera size={20} /> Capture Image
                        </button>
                    )}
                </div>
                {isCapturing && (
                    <div className="mt-4">
                        <video ref={videoRef} autoPlay className="w-full rounded-lg shadow-lg"></video>
                        <button type="button" onClick={captureImage} className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
                            Capture
                        </button>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden"></canvas>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {["name", "address", "mobile", "purpose"].map((field) => (
                        <div key={field} className="relative">
                            <label className="block text-white font-medium">{field}</label>
                            <div className="flex items-center">
                                <textarea value={formData[field]} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} className="w-full mt-1 p-2 border rounded-lg" placeholder={`Enter ${field}`} />
                                {activeField === field ? <MicOff className="ml-2 text-white cursor-pointer" onClick={() => handleMicClick(field)} /> : <Mic className="ml-2 text-white cursor-pointer" onClick={() => handleMicClick(field)} />}
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ManualForm;
