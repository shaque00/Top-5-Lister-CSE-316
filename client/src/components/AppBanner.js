import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import EditToolbar from './EditToolbar'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import FunctionsIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';
import TextField from '@mui/material/TextField';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [criteria, setCriteria] = useState("");
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function updateCriteria(event){
        console.log(event.target.value);
        if (store.whichLists !== "users"){
            store.updateSortVal(event.target.value);
        } else {
            setCriteria(event.target.value);
        }
    }

    function userSelection(event){
        if (event.code === "Enter"){
            store.updateSortVal(criteria);
        }
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        store.setHome();
        auth.logoutUser();
    }

    const handleCreateNewList = () => {
        console.log("Trying to crreaete a new list");
        store.createNewList();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/all-lists/'>Guest</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        
    const sortMenu = 
    <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleLogout}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={handleLogout}>Views</MenuItem>
            <MenuItem onClick={handleLogout}>Likes</MenuItem>
            <MenuItem onClick={handleLogout}>Dislikes</MenuItem>
        </Menu>


    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
    }
    
    function getAccountMenu(loggedIn) {
        if (loggedIn){
            let initial = auth.user.firstName.charAt(0).toUpperCase() + '' + auth.user.lastName.charAt(0).toUpperCase();
            return initial;
        }
            
        return <AccountCircle />;
    }

    function goToAllLists(){
        store.allLists();
    }

    function goToHome(){
        store.setHome();
    }

    function goToUsers(){
        store.users();
    }

    let tBar = "";
    if (auth.loggedIn){
        tBar = 
        <AppBar position="static" style={{ background: 'white' }}>
                    <Toolbar>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                edge="start"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={goToHome}
                                color="inherit"
                                disabled={auth.guest}
                            >
                                <HomeIcon style = {{fontSize: "45px", color: "black" }}/>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit"
                                onClick={goToAllLists}
                            >
                                <PeopleIcon style = {{fontSize: "45px", color: "black"  }}/>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={goToUsers}
                                color="inherit"
                            >
                                <PersonIcon style = {{fontSize: "45px", color: "black"  }}/>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <FunctionsIcon style = {{fontSize: "45px", color: "black"  }}/>
                            </IconButton>
                        </Box>
                        <TextField onKeyPress={userSelection} onChange={updateCriteria} sx={{ flexGrow: 1 }} id="outlined-basic" variant="outlined" />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block' } }}
                                    style = {{color: "black"}}  
                                > 
                                    Sort By  
                                </Typography>
                                <SortIcon style = {{fontSize: "45px", color: "black"  }}/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
    }

    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ background: '#35405f' }}>
                    <Toolbar>
                        <Typography                        
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}                        
                        >
                            <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>T<sup>5</sup>L</Link>
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                { getAccountMenu(auth.loggedIn) }
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {
                    menu
                }
            </Box>
            <Box sx={{ flexGrow: 1 }}>{tBar}</Box>
        </Box>
    );
}