import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListItem from '@mui/material/ListItem';


function Comment(props) {
    const { idNamePair } = props;


    return <ListItem

        sx={{ marginTop: '5px', display: 'flex', p: 1,}}
        style={{
                fontSize: '20pt',
                width: '100%',
                backgroundColor: "#d4af37",
                borderRadius:10,
                borderStyle:"solid",
                borderColor:'black',
                borderWidth: '2px'
            }}
        
        >
        <div>
            <div id = "comment-poster-name">
                {idNamePair[0]}
            </div>
            <div>
                {idNamePair[1]}
            </div>
        </div>

        </ListItem>


}

export default Comment;