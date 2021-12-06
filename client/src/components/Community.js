import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, stepperClasses, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import AuthContext from '../auth'
import DeleteModal from './DeleteModal'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import  ComList from './ComList';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const Community = () => {
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
                store.idNamePairs
                    .filter(pair => pair.name.toLowerCase().startsWith(store.sortVal.toLowerCase())).sort(function(l1, l2){
                        if (store.sortBy === "l"){
                            return l2.likes - l1.likes;
                        }
                        if (store.sortBy === "d"){
                            return l2.dislikes - l1.dislikes;
                        }
                        if (store.sortBy === "v"){
                            return l2.views - l1.views;
                        }
                        if (store.sortBy === "do"){
                            if (l1.date === "edit" && l2.date !== "edit"){
                                return 1;
                            }

                            if (l2.date === "edit" && l1.date !== "edit"){
                                return -1;
                            }

                            if (l1.date === "edit" && l2.date === "edit"){
                                return 1;
                            }

                            return new Date(l2.date) - new Date(l1.date);

                        }if (store.sortBy === "dn"){
                            if (l1.date === "edit" && l2.date !== "edit"){
                                return 1;
                            }

                            if (l2.date === "edit" && l1.date !== "edit"){
                                return -1;
                            }

                            if (l1.date === "edit" && l2.date === "edit"){
                                return 1;
                            }

                            return new Date(l1.date) - new Date(l2.date);
                        }
                    })
                    .map((pair) => (
                    <ComList
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

export default Community;