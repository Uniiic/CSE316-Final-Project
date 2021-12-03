import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Grid from '@mui/material/Grid';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }
            }
            style={{
                fontSize: '40pt',
                width: '100%'
            }}
        >

        <Grid container style={{height:150}}>

        <Grid xs={3} md={7} style={{fontSize:'28pt'}}>
          {idNamePair.name}
        </Grid>

        <Grid xs={3} md={2}>
          <IconButton>
                <ThumbUpIcon style={{fontSize:'37pt'}} />
          </IconButton>
          #
        </Grid>

        <Grid xs={3} md={2}>
          <IconButton>
                <ThumbDownIcon style={{fontSize:'37pt'}} />
          </IconButton>
          #
        </Grid>

        <Grid xs={3} md={1}>
            <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'37pt'}} />
            </IconButton>
        </Grid>
{/*  */}
        <Grid xs={3} md={12} style={{fontSize:'20pt',paddingBottom:15}}>
          By: ???
        </Grid>
{/*  */}
        <Grid xs={3} md={7} style={{fontSize:'20pt',height:30}}>
          Edit
        </Grid>

        <Grid xs={3} md={4} style={{fontSize:'20pt',height:30}}>
          Views: #####
        </Grid>

        <Grid xs={3} md={1}>
          <IconButton>
                <ExpandMoreIcon style={{fontSize:'45pt',height:50}}
                                viewBox='0 7 24 24' />
          </IconButton>
        </Grid>

      </Grid>
            
        </ListItem>


    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;