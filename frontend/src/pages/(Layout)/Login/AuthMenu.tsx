import { useLogin, useRegister } from "@/hooks/auth";
import { useState } from "react";

export default function AuthMenu() {
    const { mutate: login } = useLogin();
    const { mutate: register } = useRegister();

    const [mode, setMode] = useState(0);

    const registerUser = (e) => {
        e.preventDefault();

        register({ email: e.target[0].value, password: e.target[1].value, confirm_password: e.target[2].value });
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    }

    const loginUser = (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        login({ email, password });
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    }

    return (
        <div className="w-full h-full flex flex-col items-center gap-4 bg-white text-accent-black">
            <div className="flex">
                {mode == 0 && <span className="text-xl">Login</span>}
                {mode == 1 && <span className="text-xl">Register</span>}
            </div>
            <form className="w-3/4 flex flex-col gap-4 shadow-2xl border border-solid px-6 py-6 rounded-md" onSubmit={(...args) => {
                if (mode == 0)
                    loginUser(...args);

                if (mode == 1)
                    registerUser(...args);
            }}>
                <div className="h-20 flex flex-col gap-2">
                    <label className="text-lg" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" className="px-2 h-12 bg-accent-white-50 border border-solid rounded-sm" />
                </div>
                <div className="h-20 flex flex-col gap-2">
                    <label className="text-lg" htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" className="px-2 h-12 bg-accent-white-50 border border-solid rounded-sm" />
                </div>
                {mode == 1 && (
                    <div className="h-20 flex flex-col gap-2">
                        <label className="text-lg" htmlFor="confirm_password">Confirm Password</label>
                        <input id="confirm_password" name="confirm_password" type="password" className="px-2 h-12 bg-accent-white-50 border border-solid rounded-sm" />
                    </div>
                )}
                <div className="">
                    {mode == 0 && <span onClick={() => setMode(1)} className="text-base italic">Need an account? Register.</span>}
                    {mode == 1 && <span onClick={() => setMode(0)} className="text-base italic">Have an account? Login.</span>}
                </div>
                <div className="flex flex-row gap-4">
                    <div>
                        {mode == 0 && <button className="text-lg w-24 h-10 bg-blue-500 px-4 py-1 rounded-md border-2 border-transparent text-white">Login</button>}
                        {mode == 1 && <button className="text-lg w-24 h-10 bg-blue-500 px-4 py-1 rounded-md border-2 border-transparent text-white">Register</button>}
                    </div>
                </div>
            </form>
        </div>
    )
}