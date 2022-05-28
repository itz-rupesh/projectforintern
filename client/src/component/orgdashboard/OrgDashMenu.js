import react, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';


const OrgDashMenu = () => {



    return (
        <>
            <div className='w-100 menubar p-2'>
                <div>
                    <ul className="nav " >
                        <li className="nav-item ">
                            <MenuButton link="/organization/dashboard" title="Live Projects" icon="fas fa-clipboard-list" />
                        </li>
                        <li className="nav-item">
                            <MenuButton link="/organization/dashboard/pastproject" title="Past Projects" icon="fa-solid fa-clipboard-check" />
                        </li>
                        <li className="nav-item">
                            <MenuButton link="/organization/dashboard/rating" title="Rating" icon="fas fa-star" />
                        </li>
                        <li className="nav-item">
                            <MenuButton link="/organization/dashboard/achievement" title="Achievements" icon="fas fa-trophy" />
                        </li>
                        <li className="nav-item">
                            <MenuButton link="/organization/dashboard/locations" title="Locations" icon="fa-solid fa-location-dot" />
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    );
}

const MenuButton = (props) => {


    // console.log(window.location.pathname);
    return (
        <Link to={props.link}>
            <button className={`menu-button ms-2 me-2 mt-1 mb-1 p-1`}   >
                <i className={props.icon}></i> {props.title}
            </button>
        </Link>
    );
}
// id = { window.location.pathname === props.link ? 'active' : '' }
export default OrgDashMenu;