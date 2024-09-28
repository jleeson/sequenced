import { useUser } from "@/hooks/user";
import { useState } from "react";
import AuthMenu from "./Login/AuthMenu";

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
                        user.data?.token ?
                            (
                                <div>Logged in as {user.data.user.email}</div>
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