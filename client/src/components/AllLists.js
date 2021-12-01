import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import AuthContext from '../auth'
import DeleteModal from './DeleteModal'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const AllLists = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    console.log(store.idNamePairs);
    if (store) {
        listCard = 
            <List sx={{top: '1%', width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.filter(pair => pair.date !== "edit").map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            <Divider />
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            <DeleteModal />
        </div>)
}

export default AllLists;