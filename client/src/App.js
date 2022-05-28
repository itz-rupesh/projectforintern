
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import  DemoForm from './component/support/DemoForm';
import Home from './component/Home';
import Navbar from './component/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
// import RegLogFormNav from './component/RegLogFormNav';
import { Login, SignUp } from './component/auth/Login';
import { OrgLogin, OrgSignup } from './component/auth/orgAuth/OrgLogin';
import About from './pages/About';
import Service from './pages/Service';
import DashBoard from './component/dashboard/DashBoard';
import SetupProfile from './component/setupProfile/SetupProfile';
import Logout from './component/auth/Logout';

import ShowProjects from './component/dashboard/ShowProjects';
import ShowEducations from './component/dashboard/ShowEducations';
import ShowAchievements from './component/dashboard/ShowAchievements';
import ShowUserRating from './component/dashboard/ShowUserRating';
import SetupOrganization from './component/setupOrg/SetupOrganization';
import OrgDashboard from './component/orgdashboard/OrgDashboard';

import LiveProjects from './component/orgdashboard/LiveProjects';
import ShowOrgPastProjects from './component/orgdashboard/ShowOrgPastProjects';
import ShowOrgAchievements from './component/orgdashboard/ShowOrgAchievements';
import OrgRating from './component/orgdashboard/OrgRating';
import PageNotFound from './component/PageNotFound';
import ShowOrgLocations from './component/orgdashboard/ShowOrgLocations';
import Feed from './component/feed/Feed';
import FavProjects from './component/feed/FavProjects';
import MatchedProjects from './component/feed/MatchedProjects';
import OrgProfileForUser from './component/feed/OrgProfileForUser/OrgProfileForUser';
import OrgProfileForUserLiveProject from './component/feed/OrgProfileForUser/OrgProfileForUserLiveProjects';
import OrgProfileForUserPastProject from './component/feed/OrgProfileForUser/OrgProfileForUserPastProjects';
import OrgProfileForUserAchievements from './component/feed/OrgProfileForUser/OrgProfileForUserAchievements';
import OrgProfileForUserLocations from './component/feed/OrgProfileForUser/OrgProfileForUserLocations';
import OrgProfileForUserRating from './component/feed/OrgProfileForUser/OrgProfileForUserRating';

import OrgFeed from './component/orgfeed/OrgFeed';
import MatchedProfiles from './component/orgfeed/MatchedProfiles';
import UserProfileForOrg from './component/orgfeed/UserProfileForOrg/UserProfileForOrg';
import UserProfileForOrgShowProjects from './component/orgfeed/UserProfileForOrg/UserProfileForOrgShowProjects';
import UserProfileForOrgShowEducation from './component/orgfeed/UserProfileForOrg/UserProfileForOrgShowEducation';
import UserProfileForOrgShowAchievements from './component/orgfeed/UserProfileForOrg/UserProfileForOrgShowAchievements';
import UserProfileForOrgRating from './component/orgfeed/UserProfileForOrg/UserProfileForOrgRatings';
import UserLiveChat from './component/chat/UserLiveChat';
import OrgLiveChat from './component/chat/OrgLiveChat';

import { initialState, reducer } from './Reducer/useReducer';
import { initialUser, userReducer } from './Reducer/currentUser';
import axios from 'axios';
export const NavbarContext = createContext();
export const CurrentUserContext = createContext();



const Routing = () => {


  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/dashboard" element={<DashBoard />}>
          <Route path="projects" element={<ShowProjects />} />
          <Route path="" element={<ShowProjects />} />
          <Route path="projects" element={<ShowProjects />} />
          <Route path="education" element={<ShowEducations />} />
          <Route path="achievements" element={<ShowAchievements />} />
          <Route path="Rating" element={<ShowUserRating />} />
        </Route>
        <Route path="/setup" element={<SetupProfile />} />
        <Route path="/organization/setup" element={<SetupOrganization />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login">
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/fav" element={<FavProjects />} />
        <Route path="/feed/matched" element={<MatchedProjects />} />

        <Route path="/feed/orgprofile" element={<OrgProfileForUser />} >
          <Route path="" element={<OrgProfileForUserLiveProject />} />
          <Route path="pastproject" element={<OrgProfileForUserPastProject />} />
          <Route path="rating" element={<OrgProfileForUserRating />} />
          <Route path="achievement" element={<OrgProfileForUserAchievements />} />
          <Route path="locations" element={<OrgProfileForUserLocations />} />
        </Route>

        <Route path="/organization/login" >
          <Route path="signin" element={<OrgLogin />} />
          <Route path="signup" element={<OrgSignup />} />
        </Route>
        <Route path="/organization/dashboard" element={<OrgDashboard />} >
          <Route path="" element={<LiveProjects />} />
          <Route path="pastproject" element={<ShowOrgPastProjects />} />
          <Route path="rating" element={<OrgRating />} />
          <Route path="achievement" element={<ShowOrgAchievements />} />
          <Route path="locations" element={<ShowOrgLocations />} />
        </Route>

        <Route path="/organization/orgfeed" element={<OrgFeed />} />
        <Route path="/organization/orgfeed/matched" element={<MatchedProfiles />} />


        <Route path="/organization/orgfeed/userprofile" element={<UserProfileForOrg />}>
          <Route path="" element={<UserProfileForOrgShowProjects />} />
          <Route path="projects" element={<UserProfileForOrgShowProjects />} />
          <Route path="education" element={<UserProfileForOrgShowEducation />} />
          <Route path="achievements" element={<UserProfileForOrgShowAchievements />} />
          <Route path="Rating" element={<UserProfileForOrgRating />} />
        </Route>

        <Route path="/user/chat" element={<UserLiveChat />} />
        <Route path="/organization/chat" element={<OrgLiveChat />} />


        <Route path="*" element={<PageNotFound />} />

      </Routes>

    </>
  );
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userState, dispatchh] = useReducer(userReducer, initialUser);

  useEffect(() => {
    axios.get('/verify/user', { withCredentials: true })
      .then((res) => {
        dispatch({ type: res.data.type, payload: { image: res.data.image, name: res.data.name } });
      }).catch((err) => {
        dispatch({ type: err.response.data.type, payload: { image: err.response.data.image, name: err.response.data.name } });
      });

  }, []);

  return (
    <div className="App">
      <NavbarContext.Provider value={{ state, dispatch }}>
        <CurrentUserContext.Provider value={{ userState, dispatchh }}>
          <Navbar />
          <Routing />
        </CurrentUserContext.Provider>
      </NavbarContext.Provider>
    </div>
  );
}

export default App;

















{/* <>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/service" element={<Service />} />
    <Route path="/dashboard" element={<DashBoard />}>
      <Route path="projects" element={<ShowProjects />} />
      <Route path="" element={<ShowProjects />} />
      <Route path="projects" element={<ShowProjects />} />
      <Route path="education" element={<ShowEducations />} />
      <Route path="achievements" element={<ShowAchievements />} />
      <Route path="Rating" element={<ShowUserRating />} />
    </Route>
    <Route path="/setup" element={<SetupProfile />} />
    <Route path="/organization/setup" element={<SetupOrganization />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/login">
      <Route path="signin" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Route>
    <Route path="/feed" element={<Feed />} />
    <Route path="/feed/fav" element={<FavProjects />} />
    <Route path="/feed/matched" element={<MatchedProjects />} />
    <Route path="/feed/orgprofile" element={<OrgProfileForUser />} >
      <Route path="" element={<OrgProfileForUserLiveProject />} />
      <Route path="pastproject" element={<OrgProfileForUserPastProject />} />
      <Route path="rating" element={<OrgProfileForUserRating />} />
      <Route path="achievement" element={<OrgProfileForUserAchievements />} />
      <Route path="locations" element={<OrgProfileForUserLocations />} />
    </Route>

    <Route path="/organization/login" >
      <Route path="signin" element={<OrgLogin />} />
      <Route path="signup" element={<OrgSignup />} />
    </Route>
    <Route path="/organization/dashboard" element={<OrgDashboard />} >
      <Route path="" element={<LiveProjects />} />
      <Route path="pastproject" element={<ShowOrgPastProjects />} />
      <Route path="rating" element={<OrgRating />} />
      <Route path="achievement" element={<ShowOrgAchievements />} />
      <Route path="locations" element={<ShowOrgLocations />} />
    </Route>

    <Route path="/organization/orgfeed" element={<OrgFeed />} />
    <Route path="/organization/orgfeed/matched" element={<MatchedProfiles />} />
    <Route path="/organization/orgfeed/userprofile" element={<UserProfileForOrg />}>
      <Route path="" element={<UserProfileForOrgShowProjects />} />
      <Route path="projects" element={<UserProfileForOrgShowProjects />} />
      <Route path="education" element={<UserProfileForOrgShowEducation />} />
      <Route path="achievements" element={<UserProfileForOrgShowAchievements />} />
      <Route path="Rating" element={<UserProfileForOrgRating />} />
    </Route>

    <Route path="/user/chat" element={<UserLiveChat />} />
    <Route path="/organization/chat" element={<OrgLiveChat />} />


    <Route path="*" element={<PageNotFound />} />

  </Routes> */}