import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaHome, FaUsers } from 'react-icons/fa';
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {

  const [cart] = useCart();
  const [isAdmin] = useAdmin()
  const [isInstructor] = useInstructor()

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">

          {
            isAdmin &&
            <>
              <li><NavLink to="/dashboard/manageClass"><FaWallet></FaWallet> Manage Classes</NavLink></li>
              <li><NavLink to="/dashboard/manageUsers"><FaUsers></FaUsers> Manage Users</NavLink></li>

            </>
          }
          {
            isInstructor &&
            <>
              <li><NavLink to="/dashboard/addClass"><FaHome></FaHome> Add A Class</NavLink></li>
              <li><NavLink to="/dashboard/myClass"><FaHome></FaHome> My Classes</NavLink></li>
            </>
          }
          {
            !isAdmin && !isInstructor &&
            <>
              <li><NavLink to="/"><FaWallet></FaWallet> Payment History</NavLink></li>
              <li><NavLink to="/dashboard/enrolledClass"><FaWallet></FaWallet> Enrolled Classes</NavLink></li>
              <li>
                <NavLink to="/dashboard/myCart"><FaShoppingCart></FaShoppingCart> Selected Classes
                  <span className="badge inl badge-secondary">+{cart?.length || 0}</span>
                </NavLink>

              </li>
            </>
          }




          <div className="divider"></div>
          <li><NavLink to="/"><FaHome></FaHome> Home</NavLink> </li>
        </ul>

      </div>
    </div>
  );
};

export default Dashboard;