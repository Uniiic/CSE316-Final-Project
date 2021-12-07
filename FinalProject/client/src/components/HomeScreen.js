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
        store.loadIdNamePairs();
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

    if(store.sort === ""){
        store.idNamePairs.sort(function(x, y){return y.viewNumber - x.viewNumber});
        if(store.search === "" && store.currentPage === "person"){
            let emptyList = [];
            listCard = 
                <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                {
                    emptyList.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
                </List>;
        }else if(store.search === ""){
            listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
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
        }else{
            if(store.currentPage === "home"){
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.search));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "group"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "person"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.owner.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
    }

    if(store.sort === "view"){
        store.idNamePairs.sort(function(x, y){return y.viewNumber - x.viewNumber});
        if(store.search === "" && store.currentPage === "person"){
            let emptyList = [];
            listCard = 
                <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                {
                    emptyList.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
                </List>;
        }else if(store.search === ""){
            listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
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
        }else{
            if(store.currentPage === "home"){
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.search));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "group"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "person"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.owner.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
    }
     if(store.sort === "like"){ 
        store.idNamePairs.sort(function(x, y){return y.likeNumber - x.likeNumber});
        if(store.search === "" && store.currentPage === "person"){
            let emptyList = [];
            listCard = 
                <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                {
                    emptyList.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
                </List>;
        }else if(store.search === ""){
            listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
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
        }else{
            if(store.currentPage === "home"){
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.search));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "group"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "person"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.owner.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
    }
    if(store.sort === "dislike"){ 
        store.idNamePairs.sort(function(x, y){return y.dislikeNumber - x.dislikeNumber});
        if(store.search === "" && store.currentPage === "person"){
            let emptyList = [];
            listCard = 
                <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                {
                    emptyList.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
                </List>;
        }else if(store.search === ""){
            listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
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
        }else{
            if(store.currentPage === "home"){
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.search));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "group"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "person"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.owner.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
    }
    if(store.sort === "newest"){ 
        store.idNamePairs.sort(function(x, y){return new Date(y.publishDate) - new Date(x.publishDate)});
        if(store.search === "" && store.currentPage === "person"){
            let emptyList = [];
            listCard = 
                <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                {
                    emptyList.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
                </List>;
        }else if(store.search === ""){
            listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
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
        }else{
            if(store.currentPage === "home"){
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.search));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "group"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "person"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.owner.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
    } 
    if(store.sort === "oldest"){ 
        store.idNamePairs.sort(function(x, y){return new Date(x.publishDate) - new Date(y.publishDate)});
        if(store.search === "" && store.currentPage === "person"){
            let emptyList = [];
            listCard = 
                <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                {
                    emptyList.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
                </List>;
        }else if(store.search === ""){
            listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
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
        }else{
            if(store.currentPage === "home"){
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.search));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "group"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }else if(store.currentPage === "person"){
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.owner.toLowerCase() === store.search.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
    }
    
    if(store.currentPage === "community"){
        let community = store.idNamePairs;
        console.log();
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        community.map((pair) => (
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