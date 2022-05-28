import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Outlet } from 'react-router-dom';

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

export default function MenuBar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<>
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                <LinkTab label="Live Projects" to="/orgnization/dashboard" />
                <LinkTab label="Past Projects" to="/orgnization/dashboard/pastproject" />
                <LinkTab label="Rating" href="/orgnization/dashboard/rating" />
                <LinkTab label="Achievements" href="/orgnization/dashboard/achievement" />
            </Tabs>
        </Box>
        <Outlet />
    </>
    );
}
