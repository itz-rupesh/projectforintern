import react from 'react';
import { Link, Outlet } from 'react-router-dom';



const UserProfileForOrgMenubar = (props) => {

    const current_user_id = props.current_user_id;

    return (
        <>
            <div className='w-100 menubar p-2'>
                <div>
                    <ul className="nav" >
                        <li className="nav-item ">
                            <MenuButton link="/organization/orgfeed/userprofile" title="Projects" icon="fas fa-clipboard-list" />
                        </li>
                        <li className="nav-item">
                            <MenuButton link="/organization/orgfeed/userprofile/education" title="Education" icon="fas fa-graduation-cap" />
                        </li>
                        <li className="nav-item">
                            <MenuButton link="/organization/orgfeed/userprofile/achievements" title="Achievements" icon="fas fa-trophy" />
                        </li>
                        <li className="nav-item">
                            <MenuButton link="/organization/orgfeed/userprofile/Rating" title="Rating" icon="fas fa-star" />
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <Outlet context={[current_user_id]}/>
            </div>
        </>
    );
}

const MenuButton = (props) => {

    return (
        <Link to={props.link}>
            <button className={`menu-button ms-2 me-2 mt-1 mb-1 p-1 ${window.location.path}`}  >
                <i className={props.icon}></i> {props.title}
            </button>
        </Link>
    );
}

export default UserProfileForOrgMenubar;