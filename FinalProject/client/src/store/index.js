
   
import { createContext, useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    SET_CURRENT_PAGE_HOME: "SET_CURRENT_PAGE_HOME",
    SET_CURRENT_PAGE_GROUP: "SET_CURRENT_PAGE_GROUP",
    SET_CURRENT_PAGE_PERSON: "SET_CURRENT_PAGE_PERSON",
    SET_CURRENT_PAGE_COMMUNITY: "SET_CURRENT_PAGE_COMMUNITY",
    SET_SEARCH_AND_SORT: "SET_SEARCH_AND_SORT",
    CALCULATE_COMMUNITYLIST: "CALCULATE_COMMUNITYLIST"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        currentPage: "",
        search: "",
        sort: "",
        communityList: [],
        communityListAllElement: []
    });

    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    search: store.search,
                    sort: store.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    search: store.search,
                    sort: store.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    search: store.search,
                    sort: store.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentPage: "home",
                    search: store.search,
                    sort: store.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    currentPage: store.currentPage,
                    search: store.search,
                    sort: store.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    search: store.search,
                    sort: store.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    search: store.search,
                    sort: store.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    search: store.search,
                    sort: store.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    search: store.search,
                    sort: store.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            case GlobalStoreActionType.SET_CURRENT_PAGE_GROUP: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentPage: "group",
                    search: store.search,
                    sort: store.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            case GlobalStoreActionType.SET_CURRENT_PAGE_PERSON: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentPage: "person",
                    search: store.search,
                    sort: store.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            case GlobalStoreActionType.SET_CURRENT_PAGE_COMMUNITY: {
                return setStore({
                    idNamePairs: payload.pairsArray,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentPage: "community",
                    search: store.search,
                    sort: store.sort,
                    communityList: payload.uniqueNameList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            case GlobalStoreActionType.SET_SEARCH_AND_SORT:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: store.isListNameEditActive,
                    isItemEditActive: store.isItemEditActive,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    currentPage: store.currentPage,
                    search: payload.search,
                    sort: payload.sort,
                    communityList: store.communityList,
                    communityListAllElement: store.communityListAllElement
                });
            }
            case GlobalStoreActionType.CALCULATE_COMMUNITYLIST:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: store.isListNameEditActive,
                    isItemEditActive: store.isItemEditActive,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    currentPage: store.currentPage,
                    search: payload.search,
                    sort: payload.sort,
                    communityList: [],
                    communityListAllElement: store.communityListAllElement
                });
            }
            default:
                return store;
        }
    }

    store.setSearchAndSort =  async function (search,sort){
        storeReducer({
            type: GlobalStoreActionType.SET_SEARCH_AND_SORT,
            payload: {search: search, sort:sort}
        });
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
        console.log(store);
    }


    store.addNewComment = async function (id,author,text) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let comments = top5List.comments;
            let array = [author,text];
            comments.splice(0,0,array);
            top5List.comments = comments;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
        console.log(store);
    }


    store.likeListButton = async function (id, both, like, dislike) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {

            let top5List = response.data.top5List;
            if(both){
                let likes = top5List.likeList;
                likes.push(auth.user.email);
                top5List.likeList = likes;
                top5List.likeNumber = top5List.likeNumber+1;
            }else if(like){
                let likes = top5List.likeList;
                const index = likes.indexOf(auth.user.email);
                console.log(index);
                if (index >= 0) {
                    likes.splice(index, 1);
                }
                top5List.likeList = likes;
                top5List.likeNumber = top5List.likeNumber-1;
            }else if(dislike){
                let dislikes = top5List.dislikeList;
                const index = dislikes.indexOf(auth.user.email);
                console.log(index);
                if (index >= 0) {
                    dislikes.splice(index, 1);
                }
                top5List.dislikeList = dislikes;
                top5List.dislikeNumber = top5List.dislikeNumber-1;

                let likes = top5List.likeList;
                likes.push(auth.user.email);
                top5List.likeList = likes;
                top5List.likeNumber = top5List.likeNumber+1;
            }

            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.currentPage === "home"){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                    
                                });
                            }
                        }
                        getListPairs(top5List);
                    }else if(store.currentPage ==="group"){
                        async function getListPairs(top5List) {
                            response = await api.getGroupTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.SET_CURRENT_PAGE_GROUP,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    
                }
            }
            updateList(top5List);
        }
        console.log(store);
    }


    store.dislikeListButton = async function (id, both, dislike, like) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {

            let top5List = response.data.top5List;
            if(both){
                let dislikes = top5List.dislikeList;
                dislikes.push(auth.user.email);
                top5List.dislikeList = dislikes;
                top5List.dislikeNumber = top5List.dislikeNumber+1;
            }else if(dislike){
                let dislikes = top5List.dislikeList;
                const index = dislikes.indexOf(auth.user.email);
                console.log(index);
                if (index >= 0) {
                    dislikes.splice(index, 1);
                }
                top5List.dislikeList = dislikes;
                top5List.dislikeNumber = top5List.dislikeNumber-1;
            }else if(like){
                let dislikes = top5List.dislikeList;
                dislikes.push(auth.user.email);
                top5List.dislikeList = dislikes;
                top5List.dislikeNumber = top5List.dislikeNumber+1;

                let likes = top5List.likeList;
                const index = likes.indexOf(auth.user.email);
                console.log(index);
                if (index >= 0) {
                    likes.splice(index, 1);
                }
                top5List.likeList = likes;
                top5List.likeNumber = top5List.likeNumber-1;
            }

            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.currentPage === "home"){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                    
                                });
                            }
                        }
                        getListPairs(top5List);
                    }else if(store.currentPage ==="group"){
                        async function getListPairs(top5List) {
                            response = await api.getGroupTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.SET_CURRENT_PAGE_GROUP,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    
                }
            }
            updateList(top5List);
        }
        console.log(store);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;

        let payload = {
            name: newListName,
            items: ["", "", "", "", ""],
            ownerEmail: auth.user.email,
            owner: auth.user.firstName+" "+auth.user.lastName,
            viewNumber: 0,
            likeNumber: 0,
            dislikeNumber: 0,
            comments: [],
            published: false,
            publishDate: new Date(),
            publishDateString: "",
            communityList: []
        };

        const response = await api.createTop5List(payload);
        console.log(response);

        if (response.data.success) {

            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    store.loadIdNamePairs = async function () { 
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    store.groupLoadIdNamePairs = async function () { 
        const response = await api.getGroupTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_PAGE_GROUP,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    store.personLoadIdNamePairs = async function () { 
        const response = await api.getPersonTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_PAGE_PERSON,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    store.communityLoadIdNamePairs = async function () { 
        const response = await api.getCommunityTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            console.log(pairsArray);
            let name = [];
            let uniqueNameList=[];
            for(let i=0;i<pairsArray.length;i++){
                let flag = false;
                for(let j=0;j<name.length;j++){
                    if(name[j] === pairsArray[i].name){
                        flag = true;
                    }
                }
                if(flag === false){
                    uniqueNameList.push(pairsArray[i].name);
                    name.push(pairsArray[i].name);
                }
            }
            console.log(uniqueNameList);//unique list
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_PAGE_COMMUNITY,
                payload: {pairsArray: pairsArray, uniqueNameList: uniqueNameList}
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }


   
    
    store.changeViewNumber = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.viewNumber = top5List.viewNumber+1;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.currentPage === "home"){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                    
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    
                }
            }
            updateList(top5List);
        }
    }


    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }


    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    store.deleteListCurrentList = async function(){
        store.deleteMarkedList();
        store.unmarkListForDeletion();
    }


    store.saveList = function(listName,Name0,Name1,Name2,Name3,Name4){
        store.currentList.name = listName;
        store.currentList.items[0] = Name0;
        store.currentList.items[1] = Name1;
        store.currentList.items[2] = Name2;
        store.currentList.items[3] = Name3;
        store.currentList.items[4] = Name4;
        store.updateCurrentList();
        store.closeCurrentList();
    }

    store.publishedList = function(listName,Name0,Name1,Name2,Name3,Name4){
        store.currentList.name = listName;
        store.currentList.items[0] = Name0;
        store.currentList.items[1] = Name1;
        store.currentList.items[2] = Name2;
        store.currentList.items[3] = Name3;
        store.currentList.items[4] = Name4;
        store.currentList.published = true;
        store.currentList.publishDate = new Date();
        const date = new Date();
        let month = date.toLocaleString('default', { month: 'short' });
        store.currentList.publishDateString =  month+" "+date.getDate()+", "+date.getFullYear();

        store.updateCurrentList();
        store.closeCurrentList();
    }


    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };