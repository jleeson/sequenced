import { useUser } from "@/hooks/user";
import AuthMenu from "./AuthMenu";

export default function AuthContainer() {
    const user = useUser();

    if (user.isError)
        console.log(`[ERROR] `, user.error);

    if ((user.isFetched && user.data == null) || user?.data?.statusCode == 401)
        return (
            <div className="w-screen h-screen absolute top-0 left-0 z-50">
                <div className="w-full h-full flex flex-col items-start gap-4">
                    <div className="w-full h-1/4 flex justify-center items-end">
                        <span className="text-xl text-blue-400">Sequenced: ADHD Management</span>
                    </div>
                    <div className="w-full h-3/4">
                        <AuthMenu />
                    </div>
                </div>
            </div>
        )

    return <></>
}