import { useContext,useEffect } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { GlobalStoreContext } from '../store/index.js'
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import { style } from '@mui/system';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        let url = window.location.href;
        let indexBeforeURL = url.lastIndexOf("/");
        let loadingListID = url.substring(indexBeforeURL+1);
        store.setCurrentList(loadingListID);
    }, []);

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }

    let save = true;

    function toggleSave(){
        save = false;
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let listName = formData.get('list-name-textfield');
        let itemName1 = formData.get('item-name1-textfield');
        let itemName2 = formData.get('item-name2-textfield');
        let itemName3 = formData.get('item-name3-textfield');
        let itemName4 = formData.get('item-name4-textfield');
        let itemName5 = formData.get('item-name5-textfield');


        console.log(itemName1);
        
        if(listName === "" || itemName1 === "" || itemName2 === "" || itemName3 === "" || itemName4 === "" || itemName5 === "" ){
            console.log("empty")
        }
        else{
            if(save === true){  //save list
                store.saveList(listName, itemName1, itemName2, itemName3, itemName4, itemName5);
            }
            else{  //publish list
                store.publishList(listName, itemName1, itemName2, itemName3, itemName4, itemName5);
            }
        }
    }




    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
                <div id="edit-toolbar">

                    <Button id="home-button" disabled={true}>
                        <HomeIcon style={{fontSize:50, color:'grey'}}/>
                    </Button>

                    <Button id="groups-button" disabled={true}>
                        <GroupsIcon style={{fontSize:50, color:'grey'}}/>
                    </Button>

                    <Button id="person-button" disabled={true}>
                        <PersonIcon style={{fontSize:50, color:'grey'}}/>
                    </Button>

                    <Button id="functions-button" disabled={true}>
                        <FunctionsIcon style={{fontSize:50, color:'grey'}}/>
                    </Button>

                    <div id="search-bar">
                        <TextField style={{width:300}} placeholder = 'Search' disabled={true}/>
                    </div>
                </div>
                <div>
                    <Typography variant="h5" id="sort-by" color ='textSecondary'>SORT BY</Typography>
                    <Button id="sort-button" disabled={true}>
                        <SortIcon style={{fontSize:50, color:'grey'}}/>
                    </Button>
                </div>

            </div>
            








            {/* <div id="top5-workspace">
                <div>
                    <TextField id="11111"
                        style={{width:"50%",backgroundColor:"white",borderStyle:"solid",
                        borderWidth:"0.7mm",borderColor:"#669966"}}
                        inputProps={{style: {fontSize: 10}}}
                        defaultValue={store.currentList.name}
                    />  
                </div>
                <div id="edit-list-item">
                    <div id="edit-numbering">
                        <div className="item-number"><Typography variant="h3">1.</Typography></div>
                        <div className="item-number"><Typography variant="h3">2.</Typography></div>
                        <div className="item-number"><Typography variant="h3">3.</Typography></div>
                        <div className="item-number"><Typography variant="h3">4.</Typography></div>
                        <div className="item-number"><Typography variant="h3">5.</Typography></div>
                    </div>
                    {editItems}
                </div>
            </div>

            
            <Button id='save-button'>
                Save
            </Button>

            <Button id='publish-button'>
                Publish
            </Button> */}









            <div id="top5-workspace">
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <div id="top5-workspace-textfield-part2">
                        <Button id='save-button' style={{maxWidth: '75px',  minWidth: '75px'}} type="submit">
                            Save
                        </Button>
                            
                        <Button id='publish-button' style={{maxWidth: '75px',  minWidth: '75px'}} type="submit" onClick={toggleSave}>
                            Publish
                        </Button>
                    </div>

                    <div id="top5-workspace-textfield">
                        <Grid container spacing={1}>


                            <Grid item xs={3} md={12}>
                                <TextField
                                name="list-name-textfield"
                                id="list-name-textfield"
                                required
                                style={{width: 600}}
                                defaultValue={store.currentList.name}
                                inputProps={{style: {fontSize:26}}}
                                />
                            </Grid>



                            <Grid item xs={3} md={1}>
                                <div className="item-number-border"><Typography variant="h2" style={{fontSize: 57}}>1.</Typography></div>
                            </Grid>
                            <Grid item xs={3} md={11}>
                                <div className="item-number-corresponding-item">
                                    <TextField 
                                    name="item-name1-textfield"
                                    id="item-name1-textfield"
                                    required
                                    style={{width: 1200}} 
                                    defaultValue={store.currentList.items[0]} 
                                    inputProps={{style: {fontSize: 22}}}/>
                                </div>
                            </Grid>



                            <Grid item xs={3} md={1}>
                                <div className="item-number-border"><Typography variant="h2" style={{fontSize: 57}}>2.</Typography></div>
                            </Grid>
                            <Grid item xs={3} md={11}>
                                <div className="item-number-corresponding-item">
                                    <TextField 
                                    name="item-name2-textfield"
                                    id="item-name2-textfield"
                                    required
                                    style={{width: 1200}} 
                                    defaultValue={store.currentList.items[1]} 
                                    inputProps={{style: {fontSize: 22}}}/>
                                </div>
                            </Grid>



                            <Grid item xs={3} md={1}>
                                <div className="item-number-border"><Typography variant="h2" style={{fontSize: 57}}>3.</Typography></div>
                            </Grid>
                            <Grid item xs={3} md={11}>
                                <div className="item-number-corresponding-item">
                                    <TextField 
                                    name="item-name3-textfield"
                                    id="item-name3-textfield"
                                    required
                                    style={{width: 1200}} 
                                    defaultValue={store.currentList.items[2]} 
                                    inputProps={{style: {fontSize: 22}}}/>
                                </div>
                            </Grid>



                            <Grid item xs={3} md={1}>
                                <div className="item-number-border"><Typography variant="h2" style={{fontSize: 57}}>4.</Typography></div>
                            </Grid>
                            <Grid item xs={3} md={11}>
                                <div className="item-number-corresponding-item">
                                    <TextField 
                                    name="item-name4-textfield"
                                    id="item-name4-textfield"
                                    required
                                    style={{width: 1200}} 
                                    defaultValue={store.currentList.items[3]} 
                                    inputProps={{style: {fontSize: 22}}}/>
                                </div>
                            </Grid>


                            <Grid item xs={3} md={1}>
                                <div className="item-number-border"><Typography variant="h2" style={{fontSize: 57}}>5.</Typography></div>
                            </Grid>
                            <Grid item xs={3} md={11}>
                                <div className="item-number-corresponding-item">
                                    <TextField 
                                    name="item-name5-textfield"
                                    id="item-name5-textfield"
                                    required
                                    style={{width: 1200}} 
                                    defaultValue={store.currentList.items[4]} 
                                    inputProps={{style: {fontSize: 22}}}/>
                                </div>
                            </Grid>

                            
                        </Grid>
                    </div>
                </Box>
            </div>


















            <div id="top5-statusbar">
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    disabled={true}
                >
                    <AddIcon />
                </Fab>
                    <Typography variant="h2" color ='textSecondary'>Your Lists</Typography>
            </div>

        </div>
    )
}

export default WorkspaceScreen;