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

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function getAccountMenu(loggedIn) {
        if(loggedIn === true){
            return auth.user.firstName.charAt(0).toUpperCase()+auth.user.lastName.charAt(0).toUpperCase();
        }
    }

    const CreateAccount = <MenuItem ><Link to='/register/'>Create New Account</Link></MenuItem>
    const LoggedIn = <MenuItem ><Link to='/login/'>Login</Link></MenuItem>
    const ContinueAsGuest = <MenuItem >Continue as Guest</MenuItem>         

    const menuId = 'primary-search-account-menu';

    const loggedOutMenu = 
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

    if(!auth.loggedIn){
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography                        
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}                        
                        >
                            <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>T<sup>5</sup>L</Link>
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {
                                CreateAccount
                            }
                            {
                                LoggedIn
                            }
                            {
                                ContinueAsGuest
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }else{
        return <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography                        
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}                        
                        >
                            <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>T<sup>5</sup>L</Link>
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }} id = 'logout-menu'>
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
                        loggedOutMenu
                    }
                </Box>
    }
    
}



        