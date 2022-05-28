import React from "react";
import ProjectCard from "../feed/ProjectCard";
import UserProfileCard from "./UserProfileCard";

const ShowFullViewUserProfile = (props) => {
    const { post,
        onSelect,
        showFullCard } = props;


    return (<>
        <div className="project-fullView-card-container">
            <div className="container project-fullView-card-container-inner">
                <div className="row col-12">
                    <i className="fa-solid fa-xmark fa-2x text-end text-danger" onClick={() => props?.onSelect(!props?.showFullCard)}></i>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-6 " >
                        <UserProfileCard
                            post={post}
                            showFullCard={showFullCard}
                            showFullCardButton={false}
                            ShowCloseButton={false}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mt-lg-0 mt-4" >
                        <ProjectCard
                            project={post.project}
                            logo={post.logo}
                            rating={post.current_rating}
                            onSelect={onSelect}
                            showFullCard={showFullCard}
                            ShowCloseButton={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default ShowFullViewUserProfile;