import { useState } from "react";

export default function AuthMenu() {
    const [mode, setMode] = useState(0);

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 bg-black absolute top-0 left-0">
            <div className="flex">
                {mode == 0 && <span className="text-xl">Login</span>}
                {mode == 1 && <span className="text-xl">Register</span>}
            </div>
            <form className="w-3/4 flex flex-col gap-4 bg-gray-800 px-6 py-6 rounded-md">
                <div className="h-20 flex flex-col gap-2">
                    <label className="text-lg">Email</label>
                    <input className="h-12 bg-gray-900 border border-white rounded-sm" />
                </div>
                <div className="h-20 flex flex-col gap-2">
                    <label className="text-lg">Password</label>
                    <input className="h-12 bg-gray-900 border border-white rounded-sm" />
                </div>
                {mode == 1 && (
                    <div className="h-20 flex flex-col gap-2">
                        <label className="text-lg">Confirm Password</label>
                        <input className="h-12 bg-gray-900 border border-white rounded-sm" />
                    </div>
                )}
                <div className="">
                    {mode == 0 && <span onClick={() => setMode(1)} className="text-base italic">Need an account? Register.</span>}
                    {mode == 1 && <span onClick={() => setMode(0)} className="text-base italic">Have an account? Login.</span>}
                </div>
                <div className="flex flex-row gap-4">
                    <div>
                        {mode == 0 && <button className="text-lg w-24 h-10 bg-blue-500 px-4 py-1 rounded-md border-2 border-transparent">Login</button>}
                        {mode == 1 && <button className="text-lg w-24 h-10 bg-blue-500 px-4 py-1 rounded-md border-2 border-transparent">Register</button>}
                    </div>
                    <div>
                        <button className="w-24 h-10 text-lg bg-transparent border-2 border-blue-500 px-4 py-1 rounded-md">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}