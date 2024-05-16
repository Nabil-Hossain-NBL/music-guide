import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";

const Navbar = () => {
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()

    const { user, logOut } = useContext(AuthContext)
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => console.log(error))
    }

    const navList = <>
        <li><Link to={'/'}>Home</Link></li>
        <li>
            <Link to={'allclass'}> Classes</Link>
        </li>
        <li>
            <Link to={'allinstructors'}> Instructors</Link>
        </li>
        {
            !isAdmin && !isInstructor &&
            <>
                <li>
                    <Link to={'/dashboard/mycart'}>
                        Cart
                        <span className="badge badge-secondary">+{cart?.length || 0}</span>
                    </Link>
                </li>
            </>
        }

        {isAdmin && <li><Link to={'/dashboard/manageusers'}>Dashboard</Link></li>}
        {isInstructor && <li><Link to={'/dashboard/addClass'}>Dashboard</Link></li>}
        {!isAdmin && !isInstructor && <li><Link to={'/dashboard/mycart'}>Dashboard</Link></li>}
        {
            user ?
                <><button className=" btn-ghost m-0 p-0" onClick={handleLogOut}>Logout</button></> :
                <><li><Link to={'/login'}>Login</Link></li></>
        }
    </>
    return (
        <div className="navbar  bg-black text-white max-w-screen-2xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52">
                        {navList}
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl" to={'/'}>MusicGuide</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navList}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <>
                            <label tabIndex={0} className="btn btn-ghost btn-circle pr-3 avatar">
                                <div className="w-10 rounded-full">
                                    <img title={user?.displayName} src={user?.photoURL} />
                                </div>
                            </label>
                        </>
                        :
                        <>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;