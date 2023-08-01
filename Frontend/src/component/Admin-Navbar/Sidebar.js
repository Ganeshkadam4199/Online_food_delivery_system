import React from 'react';
import './assets/css/style.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/img/apple-touch-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCurrentUser } from '../../store/action/user.action';

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate("/login")
    }

    return (
        <div>
            {/* id="sidebar" className="sidebar" */}
            <aside id="sidebar" className="sidebar" >

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <Link to="/admin/home" className="nav-link ">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#category-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-menu-button-wide"></i><span>Category</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="category-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="addCategory">
                                    <i className="bi bi-circle-fill"></i>
                                    <span>Add</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="viewCategory">
                                    <i className="bi bi-circle-fill"></i>
                                    <span>View</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#book-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-journal-richtext"></i>
                            <span>Food</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="book-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="addFood">
                                    <i className="bi bi-circle-fill"></i>
                                    <span>Add</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="viewFood">
                                    <i className="bi bi-circle-fill"></i>
                                    <span>View</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* <li className="nav-heading">Pages</li> */}

                    <li className="nav-item">
                        <Link to="orders" className="nav-link collapsed" >
                            <i className="bi bi-app"></i>
                            <span>Orders</span>
                        </Link></li>

                    <li className="nav-item">
                        <Link to="users" className="nav-link collapsed">
                            <i className="bi bi-person"></i>
                            <span>Users</span>
                        </Link></li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" onClick={() => logout()}>
                            <i className="bi bi-person"></i>
                            <span>Logout</span>
                        </a></li>



                </ul>
            </aside>
            {/* <!-- End Sidebar--> */}
        </div>
    )
}

export { Sidebar };
