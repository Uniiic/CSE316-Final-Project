import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../auth'
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { handleCreateNewList } = props;
    const { auth } = useContext(AuthContext);
    // let text ="";
    // if (store.currentList)
    //     text = store.currentList.name;
    return (
        <div id="top5-statusbar">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                disabled={store.currentPage !== "home"}
                style ={(store.currentPage === "home")?{}:{color:"grey"}}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2" style ={(store.currentPage === "home")?{}:{color:"grey"}} >Your Lists</Typography>
        </div>
    );
}

export default Statusbar;