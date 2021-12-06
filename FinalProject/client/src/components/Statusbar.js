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
    // const { store } = useContext(GlobalStoreContext);
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
                disabled={auth.page !== "home"}
                style ={(auth.page === "home")?{}:{color:"grey"}}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2" style ={(auth.page === "home")?{}:{color:"grey"}} >Your Lists</Typography>
        </div>
    );
}

export default Statusbar;