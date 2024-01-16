import { Link } from "react-router-dom";

export default function NavBox({ children, href }) {
    return (
        <li className="border border-black px-2 py-1">
            <Link to={href}>
                <div>
                    {children}
                </div>
            </Link>
        </li>
    )
}