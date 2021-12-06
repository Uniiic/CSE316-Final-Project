import { useContext, useState, useEffect } from 'react'
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
import { Typography } from '@mui/material'
import Comment from './Comment';
import List from '@mui/material/List';
import AuthContext from '../auth'



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
    const [expandActive, setexpandActive] = useState(false);
    const { auth } = useContext(AuthContext);
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


    let listCardBackgroundColor = idNamePair.published ? '#d4d4f5' : '#fffff1'

    let editButton = 
    <div xs={3} md={0.5} style={{fontSize:'12pt',color:"red",textDecoration:"underline",cursor:"grab"}}
          button onClick={(event) => {handleLoadList(event, idNamePair._id)}}>
      Edit
    </div>
    if(idNamePair.published){
        editButton = 
        <div>
            <Typography display="inline" sx={{my: 0, mx: 0}}>Published: </Typography>
            <Typography display="inline" sx={{color: '#6db665'}}>{idNamePair.publishDateString}</Typography>
        </div>
    }

    function handleExpand(event) {
        setexpandActive(true);
        store.changeViewNumber(idNamePair._id);
    }

    function handleNotExpand(event) {
        setexpandActive(false);
    }


    let expandOrNotIcon = 
        <div>
            <IconButton>
                <ExpandMoreIcon style={{fontSize:'25pt'}}
                                viewBox='0 0 24 24' 
                                onClick={handleExpand}/>
            </IconButton>
        </div>

    if(expandActive){
        expandOrNotIcon = 
        <div>
            <IconButton>
                <ExpandLessIcon style={{fontSize:'25pt'}}
                                viewBox='0 0 24 24' 
                                onClick={handleNotExpand}/>
            </IconButton>
        </div>
    }


    let showCardContent = 
        <div id = "showCardContent-section">
            <div className="showCardContent-item">1.{idNamePair.items[0]}</div>
            <div className="showCardContent-item">2.{idNamePair.items[1]}</div>
            <div className="showCardContent-item">3.{idNamePair.items[2]}</div>
            <div className="showCardContent-item">4.{idNamePair.items[3]}</div>
            <div className="showCardContent-item">5.{idNamePair.items[4]}</div>
        </div>


    let comments = 
        <div id = 'comment-list'>
            <List sx={{ width: '90%', left: '5%' }}>
            {
                idNamePair.comments.map((pair) => (
                    <Comment
                        key={pair._id}
                        idNamePair={pair}
                    />
                ))
            }
            </List>
        </div>


    let showComments =
        <div>
            <div>
                {comments}
            </div>

            <div style={{fontSize:'30pt'}}>
                <TextField
                    id = 'add-comment'
                    placeholder="Add Comment"
                    style={{
                        fontSize: '20pt',
                        width: '90%',
                        position: "relative",
                        left: "5%",
                    }}
                    onKeyPress={(e)=>{if(e.key==="Enter" && e.target.value != ""){
                                store.addNewComment(idNamePair._id, auth.user.firstName+" "+auth.user.lastName ,e.target.value);
                                e.target.value = "";
                            }
                        }
                    }
                />
            </div>
        </div>



    function handleAddLike() {
        var both = false;
        var likeAlready= false;
        var dislikeAlready = false;

        if(idNamePair.likeList.indexOf(auth.user.email) < 0 && idNamePair.dislikeList.indexOf(auth.user.email) < 0){
            both = true;
            document.getElementById("ThumbUpIcon").style.color = "red";
        }else if(idNamePair.likeList.indexOf(auth.user.email) >= 0 && idNamePair.dislikeList.indexOf(auth.user.email) < 0){
            likeAlready = true;
            document.getElementById("ThumbUpIcon").style.color = "grey";
        }else{
            dislikeAlready = true;
            document.getElementById("ThumbUpIcon").style.color = "red";
            document.getElementById("ThumbDownIcon").style.color = "grey";
        }
        store.likeListButton(idNamePair._id , both, likeAlready, dislikeAlready);
    }

    function handleAddDislike() {
        var both = false;
        var dislikeAlready = false;
        var likeAlready= false;

        if(idNamePair.likeList.indexOf(auth.user.email) < 0 && idNamePair.dislikeList.indexOf(auth.user.email) < 0){
            both = true;
            document.getElementById("ThumbDownIcon").style.color = "red";
        }else if(idNamePair.likeList.indexOf(auth.user.email) < 0 && idNamePair.dislikeList.indexOf(auth.user.email) >= 0){
            dislikeAlready = true;
            document.getElementById("ThumbDownIcon").style.color = "grey";
        }else{
            likeAlready = true;
            document.getElementById("ThumbDownIcon").style.color = "red";
            document.getElementById("ThumbUpIcon").style.color = "grey";
        }
        store.dislikeListButton(idNamePair._id , both, dislikeAlready, likeAlready);
    }








    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '5px', display: 'flex', p: 1 }}
            style={{
                fontSize: '20pt',
                width: '100%',
                borderStyle:"solid",
                borderColor:"grey",
                borderWidth:'1px',
                backgroundColor: listCardBackgroundColor
            }}
        >

        <Grid container>

        <Grid xs={3} md={7} style={{fontSize:'20pt'}}>
          {idNamePair.name}
        </Grid>

        <Grid xs={3} md={2}>
          <IconButton>
                <ThumbUpIcon id = "ThumbUpIcon"style={{fontSize:'29pt'}} onClick={handleAddLike} />
          </IconButton>
          {idNamePair.likeNumber}
        </Grid>

        <Grid xs={3} md={2}>
          <IconButton>
                <ThumbDownIcon id = "ThumbDownIcon" style={{fontSize:'29pt'}} onClick={handleAddDislike}/>
          </IconButton>
          {idNamePair.dislikeNumber}
        </Grid>

        <Grid xs={3} md={1}>
            <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} 
                        aria-label='delete'
                        // style =  { (auth.pageName>1) ? {display:"block",disabled:"false"} : {display:"none",disabled:"true"}}
                        style =  {{display:"inline",disabled:"false"}}>
                        <DeleteIcon style =  {{fontSize:'29pt'}}/>
            </IconButton>
        </Grid>
{/*  */}
        <Grid xs={3} md={0.5} style={{fontSize:'12pt'}}>
          By:
        </Grid>

        <Grid xs={3} md={11.5} style={{fontSize:'12pt',color:"blue",textDecoration:"underline"}}>
          {idNamePair.owner}
        </Grid>
{/*  */}
        <Grid xs={3} md={2}>
          {editButton}
        </Grid>

        <Grid xs={3} md={5} style={{fontSize:'12pt'}}>

        </Grid>

        <Grid xs={3} md={1} style={{fontSize:'12pt'}}>
          Views:
        </Grid>
        <Grid xs={3} md={3} style={{fontSize:'12pt',color:"red"}}>
            {idNamePair.viewNumber}
        </Grid>

        <Grid xs={3} md={1}>
            {expandOrNotIcon}
        </Grid>

      </Grid>
            
        </ListItem>










    if(expandActive){
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ 
                marginTop: '5px', display: 'flex', p: 1 }}
            style={{
                fontSize: '20pt',
                width: '100%',
                borderStyle:"solid",
                borderColor:"grey",
                borderWidth:'1px',
                backgroundColor: listCardBackgroundColor
            }}
        >

        <Grid container>

        <Grid xs={3} md={7} style={{fontSize:'20pt'}}>
          {idNamePair.name}
        </Grid>

        <Grid xs={3} md={2}>
          <IconButton>
                <ThumbUpIcon style={{fontSize:'29pt'}} />
          </IconButton>
          {idNamePair.likeNumber}
        </Grid>

        <Grid xs={3} md={2}>
          <IconButton>
                <ThumbDownIcon style={{fontSize:'29pt'}} />
          </IconButton>
          {idNamePair.dislikeNumber}
        </Grid>

        <Grid xs={3} md={1}>
            <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'29pt'}} />
            </IconButton>
        </Grid>
{/*  */}
        <Grid xs={3} md={0.5} style={{fontSize:'12pt'}}>
          By:
        </Grid>

        <Grid xs={3} md={11.5} style={{fontSize:'12pt',color:"blue",textDecoration:"underline"}}>
          {idNamePair.owner}
        </Grid>
{/*  */}
        <Grid xs={3} md={6} style={{fontSize:'80pt'}}>
            {showCardContent}
        </Grid>

        <Grid xs={3} md={6} style={{fontSize:'80pt'}}>
            {showComments}
        </Grid>

{/*  */}
        <Grid xs={3} md={2}>
          {editButton}
        </Grid>

        <Grid xs={3} md={5} style={{fontSize:'12pt'}}>

        </Grid>

        <Grid xs={3} md={1} style={{fontSize:'12pt'}}>
          Views:
        </Grid>
        <Grid xs={3} md={3} style={{fontSize:'12pt',color:"red"}}>
            {idNamePair.viewNumber}
        </Grid>

        <Grid xs={3} md={1}>
          {expandOrNotIcon}
        </Grid>

      </Grid>
            
        </ListItem>
    }








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