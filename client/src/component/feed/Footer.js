import React, { useContext} from "react";
// import ReplayIcon from "@material-ui/icons/Replay";
// import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";
// import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Dashboard from "@material-ui/icons/Dashboard";
// import FullscreenOutlined from "@material-ui/icons/FullscreenOutlined";
// import OpenWith from "@material-ui/icons/OpenWith";
import CropFree from "@material-ui/icons/CropFree";
// import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../App";

export default function Footer(props) {
    const { dispatchh } = useContext(CurrentUserContext);
    
    const navigate = useNavigate();
    return (
        <div className="footer fixed-bottom">
            <IconButton className="expand"
                onClick={() => {
                    props.setView(props.isUserFeed ? props?.current?.project_id : props?.current?.project_id + props?.current?.user_id);
                }}
            >
                <CropFree fontSize="large" />
                {/* <OpenWith fontSize="large" /> */}
            </IconButton>
            {/* <IconButton className="close">
                <CloseIcon fontSize="large" />
            </IconButton> */}
            <IconButton
                className="profile"
                onClick={() => {
                    dispatchh({ type: "USER", payload: props.isUserFeed ? props?.current?.org_id : props?.current?.user_id });
                    navigate(props.orgProfileUrlForUser,{state:{org_id:props?.current?.org_id,user_id:props?.current?.user_id}});
                }}>
                <Dashboard fontSize="large" />
            </IconButton>
            <IconButton className="star"
                onClick={() => {
                    navigate("/Fav");
                }}
            >
                <StarRateIcon fontSize="large" />
            </IconButton>
            <IconButton
                className="fav"
                onClick={() => {
                    navigate(props.favProjectUrl);
                }}
            >
                <FavoriteIcon fontSize="large" />
            </IconButton>
            <IconButton
                className="flash"
                onClick={() => {
                    navigate(props?.matchedUrl);
                }}
            >
                <FlashOnIcon fontSize="large" />
            </IconButton>

        </div>
    );
}
