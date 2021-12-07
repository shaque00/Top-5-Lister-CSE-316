import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Box } from '@mui/system';
import AuthContext from '../auth'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let text ="";
    if (store.currentList)
        text = store.currentList.name;

    function handleCreateNewList() {
        store.createNewList();
    }

    let con = "";
    console.log("tesadfsdafdst", store.whichLists);
    if (store.whichLists === "" && auth.user !== null){
        con = 
            <Box>
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                Create New List
            </Box>;
        }

    let u = "";
    if (store.whichLists === "users"){
        u = "User Lists";
        if (store.sortVal != ""){
            u = store.sortVal + "'s Lists";
        }
    }
    if (store.whichLists === "all"){
        u = "All Lists";
        if (store.sortVal != ""){
            u = store.sortVal + "Lists";
        }
    }
    if (store.whichLists === "com"){
        u = "Community Lists"
    }
    
    return (
        <div id="top5-statusbar">
            {con}
            {u}
        </div>
    );
}

export default Statusbar;