import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import DeleteModal from './DeleteModal'
import Statusbar from './Statusbar';
import EditToolbar from './EditToolbar';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs("text","home");
    }, []);



    function handleCreateNewList() {
        store.createNewList();
    }


    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;

    }






    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <EditToolbar
            />
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            <Statusbar
                handleCreateNewList={handleCreateNewList}
            />
            <DeleteModal/>
        </div>)
}

export default HomeScreen;