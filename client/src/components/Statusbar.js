import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Box } from '@mui/system';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";
    if (store.currentList)
        text = store.currentList.name;

    function handleCreateNewList() {
        store.createNewList();
    }

    let con = "";
    if (store.whichLists === "home"){
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
    return (
        <div id="top5-statusbar">
            {con}
        </div>
    );
}

export default Statusbar;