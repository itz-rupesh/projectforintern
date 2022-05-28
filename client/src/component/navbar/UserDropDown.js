
import { styled, alpha } from '@mui/material/styles';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Search from './Search';
import Box from '@material-ui/core/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Dashboard from "@material-ui/icons/Dashboard";
import Home from "@material-ui/icons/Home";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { NavbarContext } from '../../App';
import { CurrentUserContext } from '../../App';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from '@material-ui/core/styles';
// ************************
const useStyles = makeStyles(theme => ({}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginTop: '5px',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginleft: theme.spacing(1),
        width: 'auto',
    },
    // display:"flex"
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 0.5, 0, 0),
    height: '100%',
    position: 'absolute',
    top: "0px",
    right: "0px",
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}));

const CloseIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 0.5, 0, 0),
    height: '100%',
    position: 'absolute',
    top: "0px",
    right: "0px",
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 0, 1, 1),
        // vertical padding + font size from searchIcon
        paddingRight: `calc(1em + ${theme.spacing(2)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            // '&:focus': {
            //     width: '20ch',

            // },

        },
        [theme.breakpoints.down('sm')]: {

            width: '10ch',
            // '&:focus': {
            //     width: '12ch',
            // },
        },
    },
}));



const ITEM_HEIGHT = 35;
const UserDropDown = () => {
    const { state } = React.useContext(NavbarContext);
    const { dispatchh } = React.useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = React.useState([]);
    function renderRow(props) {

        return (<>{
            searchResult.length !== 0 ? searchResult.map((val, index) => {
                return <ListItem key={index} component="div" onClick={() => { dispatchh({ type: 'USER', payload: val._id }); navigate('/feed/orgprofile'); handleCloseList(); }} className="p-1" >
                    <ListItemButton className='p-1'>
                        <span className='d-flex' style={{ flexDirection: 'column' }}>
                            {/* <ListItemText primary={val.name} /> */}
                            <span style={{ fontSize: "small" }} >{val.name}</span>
                            <span style={{ fontSize: "0.7rem", color: "#5d5d5d" }} >{val.email}</span>
                        </span>
                    </ListItemButton>
                </ListItem>
            }) : <ListItem component="div" onClick={() => { handleCloseList(); }} className="p-1" >
                <ListItemButton className='p-1'>
                    <span style={{ fontSize: "small" }} className="m-auto mt-3 mb-3">No results</span>
                </ListItemButton>
            </ListItem>
        }
        </>
        );
    }

    // // my account menu bar*********************
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {

        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //  search bar list **************************
    const [anchorElList, setAnchorElList] = React.useState(false);
    const openList = Boolean(anchorElList);
    const classes = useStyles();
    const handleClickList = (event) => {
        setAnchorElList(true);
    };
    const handleCloseList = () => {
        setAnchorElList(false);
        setKeyword('');
        setSearchResult([]);
    };


    const [keyword, setKeyword] = React.useState();
    const onSearch = async (e) => {
        let cancelToken;
        setKeyword(e.target.value);
        if (keyword === '') {
            setSearchResult([]);
            return;
        }
        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel("canceling the previous req");
        }
        cancelToken = axios.CancelToken.source();
        console.log(keyword);
        await axios.get(`/search/org/${keyword}`, { cancelToken: cancelToken.token }).then((res) => {
            setSearchResult(res.data);
        }).catch((err) => { console.log(err.response.data.error) });
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                <Search>

                    <StyledInputBase
                        placeholder="Search Organization ..."
                        inputProps={{ 'aria-label': 'search' }}
                        onFocus={handleClickList}
                        // onBlur={handleCloseList}
                        className={classes.input}
                        onChange={onSearch}
                        value={keyword}
                        aria-controls={openList ? 'search-results' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openList ? 'true' : undefined}
                    />
                    {
                        openList && <FixedSizeList
                            id="search-results"
                            MenuListProps={{
                                'aria-labelledby': 'search',
                            }}

                            // position={absolute}
                            height={ITEM_HEIGHT * 4.5}
                            style={{
                                zIndex: "99",
                                position: "absolute",
                                top: "50px",
                                width: "100%",
                                left: "0px",
                                backgroundColor: "white",
                                color: "black"
                            }}
                            // width={360}
                            // zIndex={99}
                            itemSize={46}
                            itemCount={searchResult.length === 0 ? 1 : searchResult.length}
                        // overscanCount={1}
                        >
                            {renderRow}
                        </FixedSizeList>
                    }
                    {!openList ? <SearchIconWrapper

                    // onClick={() => handleCloseList()}
                    >
                        <SearchIcon />
                    </SearchIconWrapper> : <CloseIconWrapper

                    // onClick={() => handleCloseList()}
                    >
                        <CloseIcon />
                    </CloseIconWrapper>}

                </Search>
                {/* <Search /> */}
                <Tooltip title="My Account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {
                            state?.image !== "" ? <Avatar sx={{ width: 35, height: 35 }} src={state.image} alt="A" /> :
                                <Avatar sx={{ width: 35, height: 35 }} />
                        }

                        {/* <Avatar /> */}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => navigate('/dashboard')}>
                    {
                        state?.image !== "" ? <Avatar sx={{ width: 35, height: 35 }} src={state.image} alt="A" /> :
                            <Avatar sx={{ width: 35, height: 35 }} />
                    } Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => navigate('/home')}>
                    <ListItemIcon >
                        <Home fontSize="medium" />
                    </ListItemIcon>
                    Home
                </MenuItem>
                <MenuItem onClick={() => navigate('/feed')}>
                    <ListItemIcon >
                        <Dashboard fontSize="small" />
                    </ListItemIcon>
                    Feed
                </MenuItem>
                <MenuItem onClick={() => navigate('/user/chat')}>
                    <ListItemIcon >
                        <ChatBubbleIcon fontSize="small" />
                    </ListItemIcon>
                    Chat box
                </MenuItem>
                <MenuItem onClick={() => navigate('/setup')}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Setup profile
                </MenuItem>
                <MenuItem onClick={() => navigate('/logout')}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment >
    );
}
export default UserDropDown;
