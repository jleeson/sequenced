import { Link } from "react-router-dom";

export default function NavItem({ to, title, children }) {
    return (
        <Link to={to} className="flex flex-col items-center">
            <div className="flex items-center justify-center text-center w-12 h-12">
                <div className="flex justify-center items-center w-full h-full p-1">
                    {children}
                </div>
            </div>
            <span className="text-accent-blue">{title}</span>
        </Link>
    )
}