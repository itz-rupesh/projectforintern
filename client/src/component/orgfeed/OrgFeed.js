import React from "react";
import TinderCard from "react-tinder-card";
import { useState, useEffect } from "react";
import axios from "axios";
import cogoToast from 'cogo-toast';
import { useNavigate } from 'react-router-dom';
import '../feed/Feed.css';
import Header from "../feed/Header";
import Footer from "../feed/Footer";
import ShowOrgProjects from "../orgdashboard/ShowOrgProjects";
import ProjectCard from "../feed/ProjectCard";
import UserProfileCard from "./UserProfileCard";
import ShowFullViewUserProfile from "./ShowFullViewUserProfile";

export let current = { project_id: '', user_id: '' };

const OrgFeed = () => {
  const navigate = useNavigate();
  const showSetupProfile = () => {                  // USER AUTHENTICATION 
    axios.get('/org/verify', { withCredentials: true })
      .then((res) => {
      }).catch((err) => {
        cogoToast.error("Session expire, Please login again");
        navigate('/organization/login/signin');
      })
  }

  useEffect(() => {
    showSetupProfile();
  }, []);

  const [showFullCard, setShowFullCard] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [moreAboutOrg, setMoreAboutOrg] = useState({})  // logo/ image/ rating of org
  const [posts, setPosts] = useState([]);
  const setView = (_id) => {
    const tempCurr = posts.find((obj) => {
      return obj.project._id + obj.user.userID._id === _id;
    });
    Object.assign(tempCurr, { logo: moreAboutOrg.documents.logo, current_rating: moreAboutOrg.current_rating });
    setCurrentPost(tempCurr);
    setShowFullCard(!showFullCard);
  }
  useEffect(() => {
    axios.get('/org/feed/docandrating', { withCredentials: true }).then((result) => {
      // console.log(result.data);
      setMoreAboutOrg(result.data);
      console.log(moreAboutOrg);
    }).catch((err) => {
      console.log(err.response.data.error);
    })
  }, []);

  useEffect(() => {

    axios.get('/org/feed/liveprojects', { withCredentials: true })
      .then((res) => {
        const tempArray = [];
        res.data.map((obj, index) => {
          obj.right_swipe.map((user, ind) => {
            tempArray.push({
              project: obj,
              user: user
            });
          })
        })
        setPosts(tempArray);
        // current.user_id = posts[posts.length - 1]?.user?.userID?._id;
        // current.project_id = posts[posts.length - 1]?.project._id;
        // console.log(current);
        console.log(posts)
      }).catch((err) => {
        console.log(err);
        // console.log(err.response.data.error);
      })
  }, []);

  useEffect(() => {
    current.user_id = posts[posts.length - 1]?.user?.userID?._id;
    current.project_id = posts[posts.length - 1]?.project._id;

    console.log(current);

  }, [posts]);

  const Swiped = (direction, index, _id, k) => {

    if (direction === "right") {
      axios.post('/org/feed/liveprojects/rightswipe', {
        project_id: k.project._id,
        user_id: k.user.userID._id
      }, { withCredentials: true }).then((res) => {
        cogoToast.success(res.data.message);
        // console.log(fav);
      }).catch((err) => {
        cogoToast.error(err.response.data.error);
      })

    }
    if (direction === "left") {
      axios.post('/org/feed/liveprojects/leftswipe', {
        project_id: k.project._id,
        user_id: k.user.userID._id
      }, { withCredentials: true }).then((res) => {
        cogoToast.success(res.data.message);
      }).catch((err) => {
        cogoToast.error(err.response.data.error);
      })

    }

  };
  const outOfFrame = (_id) => {
    // console.log(name + ' left the screen!');
    setPosts((liveProjects) => {
      return liveProjects.filter((obj, index) => {
        return obj.project._id + obj.user.userID._id !== _id;
      })
    })
    // remove this record from liveprojects state using filter
  }


  return (<>

    {showFullCard && posts.length !== 0 && <ShowFullViewUserProfile
      post={currentPost}
      onSelect={setShowFullCard}
      showFullCard={showFullCard}
    />
    }

    <Header
      dashboard="/organization/dashboard"
      chat="/organization/chat"
    />

    <div className="container-fluid">
      <div className="body_container">
        {!showFullCard ? posts.map((k, index) => <TinderCard
          className="swipe"
          key={k.project._id + k.user.userID._id}
          preventSwipe={["up", "down"]}
          onSwipe={(dir) => Swiped(dir, index, k.project._id + k.user.userID._id, k)
          }

          onCardLeftScreen={() => outOfFrame(k.project._id + k.user.userID._id)}
        >
          <div className="card-tinder" >


            <UserProfileCard
              key={k.project._id + k.user.userID._id}
              post={k}
              onSelect={setView}
              showFullCard={showFullCard}
              showFullCardButton={true}
              ShowCloseButton={true}
            />
          </div>
        </TinderCard>
        ) : ""}
      </div>

    </div>




    <Footer
      // for full view
      setView={setView}
      current={current}
      // org profile url for user/student
      orgProfileUrlForUser={posts.length !== 0 ? "/organization/orgfeed/userprofile" : ""}
      //fav projects url
      favProjectUrl="/organization/orgfeed/fav"
      matchedUrl="/organization/orgfeed/matched"
      isUserFeed={false}
    />
  </>

  );
}

export default OrgFeed;
