import React, {useEffect, useState} from "react";
import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import useStyles from './styles';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();//so when we change location with history.push('/');
    //from the auth the location is gonna change so the useEffect is gonna run

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    };

    useEffect(() => {
       const token = user?.token;
       //if the token expires wee need to logout the user
       if (token) {
          const decodedToken = decode(token);
           if(decodedToken.exp * 1000 < new Date().getTime()){
               logout();
           }
       }

       setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]); //I can put localStorage.getItem("profile") too
    //so the useEffect will be called when we log in



    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                { user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user.result.name}
                        </Typography>
                        <Button onClick={logout} variant="contained" color="secondary">Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;