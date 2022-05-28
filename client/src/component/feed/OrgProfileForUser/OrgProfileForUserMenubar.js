import react, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';


const OrgProfileForUserMenubar = (props) => {
    // const navigate = useNavigate();
    // const location = useLocation();
    const current_org_id = props.current_org_id;
    useEffect(() => {
        console.log(props.current_org_id);
    }, []);

    return (
        <>
            <div className='w-100 menubar p-2'>
                <div>
                    <ul className="nav " >
                        <li className="nav-item ">
                            <MenuButton link="/feed/orgprofile"  title="Live Projects" icon="fas fa-clipboard-list" />
                        </li>
                        <li className="nav-item">
                            <MenuButton link="/feed/orgprofile/pastproject"  title="Past Projects" icon="fa-solid fa-clipboard-check" />
                        </li>
                        <li className="nav-item">
                            <MenuButton link="/feed/orgprofile/rating"  title="Rating" icon="fas fa-star" />
                        </li>
                        <li className="nav-item">
                            <MenuButton link="/feed/orgprofile/achievement"  title="Achievements" icon="fas fa-trophy" />
                        </li>
                        <li className="nav-item">
                            <MenuButton link="/feed/orgprofile/locations"  title="Locations" icon="fa-solid fa-location-dot" />
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <Outlet context={[current_org_id]} />
            </div>
        </>
    );
}

const MenuButton = (props) => {
    // const navigate = useNavigate();


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
export default OrgProfileForUserMenubar;