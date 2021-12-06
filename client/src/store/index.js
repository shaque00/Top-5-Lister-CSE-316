import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
import UpdateItem_Transaction from '../transactions/UpdateItem_Transaction'
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
    ADD_LIKE_DISLIKE: "ADD_LIKE_DISLIKE",
    ADD_VIEW: "ADD_VIEW",
    ADD_COMMENT: "ADD_COMMENT",
    PUBLISH_LIST: "PUBLISH_LIST",
    HOME: "HOME",
    SORT_VAL: "SORT_VAL",
    SORT_BY: "SORT_BY"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

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
        whichLists: "",
        sortBy: "",
        sortVal: ""
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
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    whichLists: store.whichLists,
                    sortBy: store.sortBy,
                    sortVal: store.sortVal
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
                    whichLists: store.whichLists,
                    sortBy: store.sortBy,
                    sortVal: store.sortVal
                })
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
                    whichLists: store.whichLists,
                    sortBy: store.sortBy,
                    sortVal: store.sortVal
                })
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
                    whichLists: store.whichLists,
                    sortBy: store.sortBy,
                    sortVal: store.sortVal
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
                    whichLists: store.whichLists,
                    sortBy: store.sortBy,
                    sortVal: store.sortVal
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
                    whichLists: store.whichLists,
                    sortBy: store.sortBy,
                    sortVal: store.sortVal
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
                    whichLists: store.whichLists,
                    sortBy: store.sortBy,
                    sortVal: store.sortVal
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    whichLists: store.whichLists,
                    sortBy: store.sortBy,
                    sortVal: store.sortVal
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
                    whichLists: store.whichLists,
                    sortBy: store.sortBy,
                    sortVal: store.sortVal
                });
            }

            case GlobalStoreActionType.ADD_VIEW: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    whichLists: store.whichLists,
                    sortBy: store.sortBy,
                    sortVal: store.sortVal
                });
            } 

            case GlobalStoreActionType.HOME:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    whichLists: payload,
                    sortBy: "",
                    sortVal: ""
                });
            }

            case GlobalStoreActionType.SORT_VAL:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    whichLists: store.whichLists,
                    sortBy: store.sortBy,
                    sortVal: payload
                });
            }

            case GlobalStoreActionType.SORT_BY:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    whichLists: store.whichLists,
                    sortBy: payload,
                    sortVal: store.sortVal
                });
            }

            default:
                return store;
        }
    }

    store.setLists = function(val) {
        storeReducer({
            type: GlobalStoreActionType.HOME,
            payload: val
        });
        if (val === "all"){
            history.push("/all-lists");
        } else if (val === "users"){
            history.push("/user");
        } else if (val === "com"){
            history.push("/community-lists");
        }
    }

    store.setSortBy = function(val){
        storeReducer({
            type: GlobalStoreActionType.SORT_BY,
            payload: val
        });
    }

    store.users = function(){
        store.setLists("users");
    }

    store.updateSortVal = function(val){
        storeReducer({
            type: GlobalStoreActionType.SORT_VAL,
            payload: val
        });
    }

    store.allLists = function(){
        console.log("sadfsadfsdaf", store.whichLists);
        store.setLists("all");
        console.log("test:", store.whichLists);
    }

    store.setHome = function(){
        store.setLists("");
        history.push("/");
    }

    store.addLike = async function(id){
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            // Already likeed so return
            if (top5List.usersL.includes(auth.user.userName)){
                console.log("already liked");
                return;
            } else {
                // Check if previously disliked, if so, then remove it and decreasee dislikes
                if (top5List.usersD.includes(auth.user.userName)){
                    top5List.usersD.splice(top5List.usersL.indexOf(auth.user.userName), 1);
                    top5List.dislikes--;
                }

                // add to array
                top5List.usersL.push(auth.user.userName);
                // increase likes
                top5List.likes++;
                // Update the lists
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    store.loadIdNamePairs();
                }
            }

        }
    }

    store.addDislike = async function(id){
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            // Already dislikeed so return
            if (top5List.usersD.includes(auth.user.userName)){
                console.log("already disliked");
                return;
            } else {
                // Check if previously liked, if so, then remove it and decreasee likes
                if (top5List.usersL.includes(auth.user.userName)){
                    top5List.usersL.splice(top5List.usersL.indexOf(auth.user.userName), 1);
                    top5List.likes--;
                }

                // add to array
                top5List.usersD.push(auth.user.userName);
                // increase dislikes
                top5List.dislikes++;
                // Update the lists
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    store.loadIdNamePairs();
                }
            }

        }
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
    }

    store.saveEdit = async function(text1, text2, text3, text4, text5, title){
        console.log("in save edit");
        store.currentList.name = title;
        store.currentList.items[0] = text1;
        store.currentList.items[1] = text2;
        store.currentList.items[2] = text3;
        store.currentList.items[3] = text4;
        store.currentList.items[4] = text5;
        store.updateCurrentList();
        store.loadIdNamePairs();
        store.closeCurrentList();
        history.push('/');
    }

    store.community = function (){
        store.setLists("com");
    }

    store.publishList = async function(text1, text2, text3, text4, text5, title){
        console.log("publish");
        store.currentList.date = new Date().toLocaleDateString();
        store.saveEdit(text1, text2, text3, text4, text5, title);
        // Check if com list of same namme exsits, if so update that list
        // otherwise create a new com list
        let e = store.idNamePairs.filter(e => e.userName === "com" && e.name.toLowerCase() === title.toLowerCase);
            // we have founnd a communit list with the same name, nnow we just update it with itemms

        if (e.length !== 0){
            let list = e[0];
            // update the items here

            if (list.uitems.indexOf(text1.toLowerCase()) < -1){
                list.vitems[list.uitems.indexOf(text1.toLowerCase())] = list.uitems.indexOf(text1.toLowerCase()) + 5;
            } else {
                list.uitems.push(text1.toLowerCase());
                list.vitems.push(5);
            }

            if (list.uitems.indexOf(text2.toLowerCase()) < -1){
                list.vitems[list.uitems.indexOf(text2.toLowerCase())] = list.uitems.indexOf(text2.toLowerCase()) + 4;
            } else {
                list.uitems.push(text2.toLowerCase());
                list.vitems.push(4);
            }

            if (list.uitems.indexOf(text3.toLowerCase()) < -1){
                list.vitems[list.uitems.indexOf(text3.toLowerCase())] = list.uitems.indexOf(text3.toLowerCase()) + 3;
            } else {
                list.uitems.push(text3.toLowerCase());
                list.vitems.push(3);
            }

            if (list.uitems.indexOf(text4.toLowerCase()) < -1){
                list.vitems[list.uitems.indexOf(text4.toLowerCase())] = list.uitems.indexOf(text4.toLowerCase()) + 2;
            } else {
                list.uitems.push(text4.toLowerCase());
                list.vitems.push(2);
            }

            if (list.uitems.indexOf(text5.toLowerCase()) < -1){
                list.vitems[list.uitems.indexOf(text5.toLowerCase())] = list.uitems.indexOf(text5.toLowerCase()) + 1;
            } else {
                list.uitems.push(text5.toLowerCase());
                list.vitems.push(1);
            }

            // Sort the items, to make it easier
            let l2 = [];
            for (let j = 0; j < list.uitems.length; j++) 
                l2.push({'name': store.vitems[j], 'age': store.vutems[j]});
            l2.sort(function(a, b) {
                return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
            });

            for (let k = 0; k < list.uitems.length; k++) {
                list.vitems[k] = list[k].name;
                list.uitems[k] = list[k].age;
            }

            const response = await api.updateTop5ListById(list._id, list);
            if (response.data.success){
                store.loadIdNamePairs();
            }
            return;
        }

        // we were not able to find a community list with that name, nnow wwe have create a new com list with that nnamme and itemss
        let payload = {
            name: title.toLowerCase(),
            items: ["", "", "", "", ""],
            ownerEmail: "com",
            userName: "com",
            likes: 0,
            dislikes: 0,
            views: 0,
            date: new Date().toLocaleDateString(), 
            comments: [],
            usersL: [],
            usersD: [],
            uitems: [text1, text2, text3, text4, text5],
            uvalues: [5, 4, 3, 2, 1]
        };
        
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            console.log("success");
            tps.clearAllTransactions();
            let newList = response.data.top5List;
            store.loadIdNamePairs();
        }


    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        console.log("In Store: ", auth.user.userName);
        let newListName = "Untitled" + store.newListCounter;
        let m = new Map();
        let payload = {
            name: newListName,
            items: ["", "", "", "", ""],
            ownerEmail: auth.user.email,
            userName: auth.user.userName,
            likes: 0,
            dislikes: 0,
            views: 0,
            date: "edit", 
            comments: [],
            usersL: [],
            usersD: [],
            uitems: [],
            uvalues: []
        };
        console.log("success");
        console.log(auth.user.email);
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            console.log("success");
            tps.clearAllTransactions();
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

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            console.log(pairsArray);
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        console.log("Trying to mark the list");
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            console.log(top5List.name);
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.addView = async function(id){
        console.log("Here");
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            console.log(top5List);
            top5List.views = top5List.views + 1;
            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                store.loadIdNamePairs();
            }
        }
    }

    store.addComment = async function(id, comment){
        console.log("In Comment")
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            console.log(top5List);
            top5List.comments.push(auth.user.userName + ":" + comment);
            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                store.loadIdNamePairs();
            }
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

    store.addMoveItemTransaction = function (start, end) {
        let transaction = new MoveItem_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.addChangeItemTransaction = function(newText, index){
        let transaction = new UpdateItem_Transaction(store, index, store.currentList.items[index], newText);
        tps.addTransaction(transaction);
    }

    store.addUpdateItemTransaction = function (newText, index) {
        console.log(newText, "Sadsf");
        let oldText = store.currentList.items[index];
        let transaction = new UpdateItem_Transaction(store, index, oldText, newText);
        tps.addTransaction(transaction);
    }

    store.moveItem = function (start, end) {
        start -= 1;
        end -= 1;
        if (start < end) {
            let temp = store.currentList.items[start];
            for (let i = start; i < end; i++) {
                store.currentList.items[i] = store.currentList.items[i + 1];
            }
            store.currentList.items[end] = temp;
        }
        else if (start > end) {
            let temp = store.currentList.items[start];
            for (let i = start; i > end; i--) {
                store.currentList.items[i] = store.currentList.items[i - 1];
            }
            store.currentList.items[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
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

    store.undo = function () {
        tps.undoTransaction();
    }

    store.redo = function () {
        tps.doTransaction();
    }

    store.canUndo = function() {
        return tps.hasTransactionToUndo();
    }

    store.canRedo = function() {
        return tps.hasTransactionToRedo();
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