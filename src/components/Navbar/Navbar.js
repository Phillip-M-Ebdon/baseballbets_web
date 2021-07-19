import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { UserContext } from '../../context/User/User'
import { ListItemLink } from "./ListItemLink";
// Material Imports
import { 
    Drawer, 
    Divider,
    List,
    createTheme,
    ThemeProvider
 } from "@material-ui/core";
 import deepOrange from '@material-ui/core/colors/deepOrange';
 import indigo from '@material-ui/core/colors/indigo';


// icons
import { SportsBaseballTwoTone as GamesIcon } from '@material-ui/icons';
import { EqualizerTwoTone as LadderIcon } from '@material-ui/icons';
import { AssessmentTwoTone as BoardsIcon } from '@material-ui/icons';
import { LocalAtmTwoTone as BettingIcon } from "@material-ui/icons";

import logo from "../../images/baseball.svg"
import "./Navbar.css"
import Login from '../Login';
import { MLBApi } from '../../api/MLBApi';

export const Navbar = () => {

    const api = new MLBApi();
    const [user, setUser] = useContext(UserContext);

    const logout = async (e) => {
        e.preventDefault()
        await api.logout()
        setUser(null);
    }

    const navbarTheme = createTheme({
        
            palette: {
              primary: deepOrange,
              secondary: indigo,
            },
          
    })

    return (
        <div className="Navbar">
        <ThemeProvider>
        <Drawer
            variant="permanent"
        >
            {/* Home button via image */}
            <Link to="/">
                <img src={logo}/>
            </Link>
            <Divider />
            {
                // if logged in show profile, otherwise show login option
                !user ? (
                    
                    // <ListItemLink to="login" text="Login" icon={<LoginIcon />} />
                    <Login />
                    
                ) : (
                    
                    <div>
                        {/* Profile snippet goes here */}
                        <Link to="/" onClick={logout}> Logout </Link>
                    </div>
                    
                )
                }
            <Divider /> 
            <List>
                
                <ListItemLink to="/games" text="Games" icon={<GamesIcon />}/>
            
                <ListItemLink to="/ladder" text="MLB Ladder" icon={<LadderIcon />}/>
            
                <ListItemLink to="/boards" text="Betting Leaderboards" icon={<BoardsIcon />}/>
            
                <ListItemLink to="bets" text="Betting" icon={<BettingIcon />}/>
            </List>
        </Drawer>
        </ThemeProvider>
        </div>
    )
}