import { Link } from "react-router-dom"
import { assets } from "../../assets/assets"
import logo from "../../assets/accountsbazaarlogo.png";

const AdminNavbar = () => {

    return (
        <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-200">
            <Link to="/">
                <img className="w-30 h-auto" src={logo} alt="logo" />
            </Link>
        </div>
    )
}

export default AdminNavbar