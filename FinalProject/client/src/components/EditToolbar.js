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
import AuthContext from '../auth'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const { auth } = useContext(AuthContext);
    const [search,setSearch] = useState("");

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSortViews = () => {
        store.setSearchAndSort(search,"view");
        handleMenuClose();
    };

    const handleSortLikes = () => {
        store.setSearchAndSort(search,"like");
        handleMenuClose();
    };

    const handleSortDislikes = () => {
        store.setSearchAndSort(search,"dislike");
        handleMenuClose();
    };

    const handleSortNewest = () => {
        store.setSearchAndSort(search,"newest");
        handleMenuClose();
    };

    const handleSortOldest = () => {
        store.setSearchAndSort(search,"oldest");
        handleMenuClose();
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
        <MenuItem onClick={handleSortNewest}>Publish Data(Newest)</MenuItem>  
        <MenuItem onClick={handleSortOldest}>Publish Data(Oldest)</MenuItem>  
        <MenuItem onClick={handleSortViews}>Views</MenuItem>  
        <MenuItem onClick={handleSortLikes}>Likes</MenuItem> 
        <MenuItem onClick={handleSortDislikes}>Dislikes</MenuItem>   
    </Menu>




    function handleHomeIconSeaching(){
        setSearch("");
        store.setSearchAndSort("","");
        store.loadIdNamePairs();
    }

    function handleGroupsIconSeaching(){
        setSearch("");
        store.setSearchAndSort("","");
        store.groupLoadIdNamePairs();
    }

    function handlePersonIconSeaching(){
        setSearch("");
        store.setSearchAndSort("","");
        store.personLoadIdNamePairs();
    }

    function handleCommunityIconSeaching(){
        setSearch("");
        store.setSearchAndSort("","");
        store.communityLoadIdNamePairs();
    }

    function handleSearch(text){
        if(text === ""){
            setSearch("");
            store.setSearchAndSort("","");
        }else{
            setSearch(text);
            store.setSearchAndSort(text,"");
        }
    }

    return (
        <div>

            <div id="edit-toolbar">
                <Button
                id="home-button"
                >
                    <HomeIcon 
                        onClick={handleHomeIconSeaching}
                        style={(store.currentPage === "home")?{fontSize:50,borderStyle:"solid",borderColor:"green"}:{fontSize:50}}
                    />
                </Button>

                <Button 
                id="groups-button"
                >
                    <GroupsIcon 
                        onClick={handleGroupsIconSeaching}
                        style={(store.currentPage === "group")?{fontSize:50,borderStyle:"solid",borderColor:"green"}:{fontSize:50}}
                    />
                </Button>

                <Button 
                id="person-button"
                >
                    <PersonIcon 
                        onClick={handlePersonIconSeaching}
                        style={(store.currentPage=== "person")?{fontSize:50,borderStyle:"solid",borderColor:"green"}:{fontSize:50}}
                    />
                </Button>

                <Button 
                id="functions-button"
                >
                    <FunctionsIcon 
                        onClick={handleCommunityIconSeaching}
                        style={(store.currentPage === "community")?{fontSize:50,borderStyle:"solid",borderColor:"green"}:{fontSize:50}}
                    />
                </Button>

                <div id="search-bar-position">
                    <TextField 
                    id="search-bar"
                    style={{width:300}}
                    placeholder = 'Search'
                    onKeyPress={(e)=>{if(e.key==="Enter"){
                        handleSearch(e.target.value.toLowerCase());
                        // e.target.value = "";
                                    }
                            }
                        }
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