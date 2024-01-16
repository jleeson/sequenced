import { Link } from "react-router-dom";

export default function NavItem({ children, href }) {
    return (
        <li className="flex justify-center border border-black px-2 py-1">
            <Link to={href}>
                <div>
                    {children}
                </div>
            </Link>
        </li>
    )
}