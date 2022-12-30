import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import Header from '../Shared/Header';

const DashBoardLayout = () => {
    const {user} = useContext(AuthContext)
    const [isAdmin]= useAdmin(user.email)
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content  ">
                    <Outlet></Outlet>
                    
                </div>
                <div className="drawer-side ">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100  text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li className='text-black'><Link to='/dashboard'>Dashboard</Link></li>
                        {/* <li><Link to='/allusers'>All users</Link></li>
                        <li><Link to='/dashboard/allusers'>All users (Admin penel)</Link></li> */}
                        {/* securing button */}
                        {
                            isAdmin && <>
                            <li className='text-black'><Link to='/dashboard/allusers'>All users (Admin penel)</Link></li>
                            <li className='text-black'><Link to='/dashboard/adddoctor'>Add a doctor</Link></li>
                            <li className='text-black'><Link to='/dashboard/managedoctor'>Manage doctor</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;