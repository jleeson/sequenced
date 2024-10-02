import AuthMenu from "./AuthMenu";

export default function AuthContainer() {
    return (
        <div className="w-screen h-screen flex flex-col items-start gap-4">
            <div className="w-full h-1/4 flex justify-center items-end">
                <span className="text-xl text-blue-400">Sequenced: ADHD Management</span>
            </div>
            <div className="w-full h-3/4">
                <AuthMenu />
            </div>
        </div>
    )
}