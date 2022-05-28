import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import NoDetails from '../setupProfile/Nodetails';


const FavProjects = () => {

    const [favProjects, setFavProjects] = useState([]);
    useEffect(() => {
        axios.get('/account/feed/liveprojects/favprojects', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setFavProjects(res.data);
                console.log(favProjects);
            }).catch((err) => {
                console.log(err.response.data.error);
            })
    }, []);
    return (<>
        <div className='container pt-5 mt-5'>
            {
                favProjects.length === 0 ? <NoDetails message=" No projects added! 🤷‍♂️" /> :
                    favProjects.map((obj, index) => {
                        return <div key={obj._id} className="container-fluid text-white pt-3 pb-3">
                            <div className="body_container bg-black p-3 " style={{ borderRadius: "15px" }}>
                                <ProjectCard
                                    key={obj._id}
                                    project={obj}
                                    // onSelect={setView}
                                    // showFullCard={showFullCard}
                                    showFullCardButton={false}
                                />  
                            </div>
                        </div>
                    })
            } </div>
    </>)

}
export default FavProjects;