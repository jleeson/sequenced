import { useNavigate } from "react-router";
import ArrowBack from "../(Login)/ArrowBack";
import { useRegister } from "@/hooks/auth";
import { useState } from "react";

export default function RegisterUser() {
    const navigate = useNavigate();
    const { mutateAsync: register } = useRegister();
    const [status, setStatus] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();

        const first = e.target[0].value;
        const last = e.target[1].value;
        const email = e.target[2].value;
        const password = e.target[3].value;

        const message = await register({ first, last, email, password });

        if (typeof message == "string")
            setStatus(message);

        if (!message)
            navigate("/");
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-gray-50">
            <div className="w-full px-10 text-center flex flex-col gap-10">
                <div className="flex flex-row justify-center items-center relative">
                    <div className="absolute left-0">
                        <div className="flex w-8 aspect-square items-center justify-center" onClick={() => navigate("/auth")}>
                            <ArrowBack />
                        </div>
                    </div>
                    <div className="">
                        <span className="text-xl">Sign Up</span>
                    </div>
                </div>
                <form className="flex flex-col items-start gap-5" onSubmit={(e) => registerUser(e)}>
                    <div className="w-full flex flex-col gap-4">
                        <input required className="w-full border-b bg-transparent py-2 px-1 text-lg" placeholder="First Name" />
                        <input required className="w-full border-b bg-transparent py-2 px-1 text-lg" placeholder="Last Name" />
                        <input required className="w-full border-b bg-transparent py-2 px-1 text-lg" placeholder="Email Address" />
                        <input required className="w-full border-b bg-transparent py-2 px-1 text-lg" placeholder="Password" />
                    </div>
                    <div className="w-full flex items-center text-left gap-2 rounded-md">
                        <input required type="checkbox" className="w-6 h-6 aspect-square border border-accent-blue" />
                        <span>By continuing, you agree to our <span className="text-accent-blue underline">Terms of Service</span> and <span className="text-accent-blue underline">Privacy Policy</span>.</span>
                    </div>
                    {status.length > 0 && <span className="text-red-500">{status}</span>}
                    <button type="submit" className="w-full shadow-md border py-2 bg-accent-blue text-accent-white rounded-md my-4 text-xl uppercase">Get Started</button>
                </form>
            </div>
        </div>
    )
}