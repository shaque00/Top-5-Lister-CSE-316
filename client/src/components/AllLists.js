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
import { Grid } from '@mui/material';
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
    //console.log("all lists, ", store.sortVal);

    let listCard = "";
    //console.log(store.idNamePairs);
    if (store) {
        listCard = 
            <Grid container spacing={1} direction="row" sx={{pl:3}}>
            {
                store.idNamePairs.filter(pair => pair.date !== "edit")
                    .filter(pair => pair.name.toLowerCase().startsWith(store.sortVal.toLowerCase())).map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </Grid>;
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