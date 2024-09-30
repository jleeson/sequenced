import { useToken, useUser } from "@/hooks/user";
import { useState } from "react";
import AuthMenu from "./Login/AuthMenu";
import { signout } from "@/hooks/auth";
import { redirect } from "react-router-dom";

export default function UserLogin() {
    const user = useUser();

    const [menuActive, setMenuActive] = useState(false);

    return (
        <div>
            {user.isLoading && <></>}
            {user.isSuccess && (
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg">Sync Status</h1>
                    {
                        user.data?.id ?
                            (
                                <div className="flex flex-col gap-2">
                                    <div>Logged in as {user.data.email}</div>
                                    <button onClick={async () => {
                                        await signout();
                                        window.location.href = "/";
                                    }} className="px-4 py-2 bg-blue-500 text-white">Sign Out</button>
                                </div>
                            ) :
                            (
                                <div className="flex flex-col gap-2 justify-center" onClick={() => setMenuActive(true)}>
                                    <span>Logged Out.</span>
                                    <button className="w-16 h-8 bg-blue-500 rounded-md">Sign In</button>
                                </div>
                            )
                    }

                    {menuActive && <AuthMenu setMenuActive={setMenuActive} />}
                </div>
            )}
        </div>
    )
}