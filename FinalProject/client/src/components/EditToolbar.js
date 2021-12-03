import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sortMenuID = "primary-sort-menu"
    const sortMenu = 
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={sortMenuID}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
        <MenuItem onClick={handleMenuClose}>Publish Data(Newest)</MenuItem>  
        <MenuItem onClick={handleMenuClose}>Publish Data(Oldest)</MenuItem>  
        <MenuItem onClick={handleMenuClose}>Views</MenuItem>  
        <MenuItem onClick={handleMenuClose}>Likes</MenuItem> 
        <MenuItem onClick={handleMenuClose}>Dislikes</MenuItem>   
    </Menu>

    return (
        <div>

            <div id="edit-toolbar">
                <Button
                id="home-button"
                >
                    <HomeIcon 
                        
                        style={{fontSize:50}}
                    />
                </Button>

                <Button 
                id="groups-button"
                >
                    <GroupsIcon 
        
                        style={{fontSize:50}}
                    />
                </Button>

                <Button 
                id="person-button"
                >
                    <PersonIcon 
                    
                        style={{fontSize:50}}
                    />
                </Button>

                <Button 
                id="functions-button"
                >
                    <FunctionsIcon 
                       
                        style={{fontSize:50}}
                    />
                </Button>
            <div id="search-bar">
                <TextField 
                    style={{width:300}}
                    placeholder = 'Search'
                />
            </div>


            
            </div>
            <div>
                <Typography variant="h5" id="sort-by">
                    SORT BY
                </Typography>
                <Button 
                    id="sort-button"
                >
                    <SortIcon 
                        style={{fontSize:50}}
                        onClick={handleProfileMenuOpen}
                    />
                </Button>
                {sortMenu}
            </div>
        
        </div>
    )
}

export default EditToolbar;