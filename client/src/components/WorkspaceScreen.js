import { useContext, useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { ListItem, Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import { useParams } from 'react-router-dom'
import AuthContext from '../auth'
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let {id} = useParams();
    console.log(id);

    const [text1, setText1] = useState(store.currentList.items[0]);
    const [text2, setText2] = useState(store.currentList.items[1]);
    const [text3, setText3] = useState(store.currentList.items[2]);
    const [text4, setText4] = useState(store.currentList.items[3]);
    const [text5, setText5] = useState(store.currentList.items[4]);
    const [title, setTitle] = useState(store.currentList.name);

    function handleUpdateText1(event) {
        console.log(event.target.value);
        setText1(event.target.value);
    }

    function handleUpdateText2(event) {
        console.log(event.target.value);
        setText2(event.target.value);
    }

    function handleUpdateText3(event) {
        console.log(event.target.value);
        setText3(event.target.value);
    }

    function handleUpdateText4(event) {
        console.log(event.target.value);
        setText4(event.target.value);
    }

    function handleUpdateText5(event) {
        console.log(event.target.value);
        setText5(event.target.value);
    }

    function handleTitle(event){
        console.log(event.target.value);
        setTitle(event.target.value);
    }

    function readyForPublish(){
        // Check if items and title all have names and are not empty
        if (text1 === "" || text2 === "" || text3 === "" || text4 === "" || text5 === "" || title === ""){
            return true;
        }

        let s = Set();
        s.add(text1.toLowerCase());
        s.add(text2.toLowerCase());
        s.add(text3.toLowerCase());
        s.add(text4.toLowerCase());
        s.add(text5.toLowerCase());
        if (s.size !== 5){
            return true;
        }

        // Now check if the title name isnt the same as a published title
        let a = store.idNamePairs.filter(list => list.email === auth.user.email).filter(list => list.date !== "edit").filter(list => list.name === title);
        console.log(a);
        if (a.length !== 0){
            return true;
        }

        return false;
    }

    function save(){
        store.saveEdit(text1, text2, text3, text4, text5, title);
    }

    function publish(){
        console.log("local");
        store.publishList(text1, text2, text3, text4, text5, title);
    }

    if (!store.idNamePairs){
        auth.logoutUser("","");
    }

    let a = store.idNamePairs.filter(e => e._id === id);
    if (!a){
        auth.logoutUser("","");
    }

    let editItems = 
            /*<List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;*/
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }} style={{backgroundColor: "darkblue"}}>
                <ListItem className="top5-item" sx={{ display: 'flex', p: 1 }} style={{ ontSize: '48pt', width: '100%' }}>
                    <TextField sx={{ p: 0 }}
                        defaultValue={store.currentList.items[0]}
                        style={{backgroundColor: "gold"}}
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        autoComplete="Top 5 Item Name"
                        className='list-card'
                        inputProps={{style: {fontSize: 30}}}
                        InputLabelProps={{style: {fontSize: 24}}}
                        autoFocus
                        onChange={handleUpdateText1}
                    ></TextField>
                </ListItem>

                <ListItem className="top5-item" sx={{ display: 'flex', p: 1 }} style={{ ontSize: '48pt', width: '100%' }}>
                    <TextField sx={{ p: 0 }}
                        style={{backgroundColor: "gold"}}
                        defaultValue={store.currentList.items[1]}
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        autoComplete="Top 5 Item Name"
                        className='list-card'
                        inputProps={{style: {fontSize: 30}}}
                        InputLabelProps={{style: {fontSize: 24}}}
                        autoFocus
                        onChange={handleUpdateText2}
                    ></TextField>
                </ListItem>

                <ListItem className="top5-item" sx={{ display: 'flex', p: 1 }} style={{ ontSize: '48pt', width: '100%' }}>
                    <TextField sx={{ p: 0 }}
                        style={{backgroundColor: "gold"}}
                        defaultValue={store.currentList.items[2]}
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        autoComplete="Top 5 Item Name"
                        className='list-card'
                        inputProps={{style: {fontSize: 30}}}
                        InputLabelProps={{style: {fontSize: 24}}}
                        autoFocus
                        onChange={handleUpdateText3}
                    ></TextField>
                </ListItem>

                <ListItem className="top5-item" sx={{ display: 'flex', p: 1 }} style={{ ontSize: '48pt', width: '100%' }}>
                    <TextField sx={{ p: 0 }}
                        style={{backgroundColor: "gold"}}
                        defaultValue={store.currentList.items[3]}
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        autoComplete="Top 5 Item Name"
                        className='list-card'
                        inputProps={{style: {fontSize: 30}}}
                        InputLabelProps={{style: {fontSize: 24}}}
                        autoFocus
                        onChange={handleUpdateText4}
                    ></TextField>
                </ListItem>

                <ListItem className="top5-item" sx={{ display: 'flex', p: 1 }} style={{ ontSize: '48pt', width: '100%' }}>
                    <TextField sx={{ p: 0 }}
                        style={{backgroundColor: "gold"}}
                        defaultValue={store.currentList.items[4]}
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        autoComplete="Top 5 Item Name"
                        className='list-card'
                        inputProps={{style: {fontSize: 30}}}
                        InputLabelProps={{style: {fontSize: 24}}}
                        autoFocus
                        onChange={handleUpdateText5}
                    ></TextField>
                </ListItem>
                <Button onClick={save} variant="contained" style={{left:'80%', color:"black", backgroundColor:"white"}}>
                    Save
                </Button>
                <Button onClick={publish} disabled={readyForPublish()} variant="contained" style={{left:'85%', color:"black", backgroundColor:"white"}}>
                    Publish
                </Button>
            </List>

    return (
        <div id="top5-workspace">
            <TextField onChange={handleTitle} defaultValue={store.currentList.name} style={{backgroundColor: "white", width:'50%'}} sx={{p:1}} margin="none">
            </TextField>
            <div id="workspace-edit">
                <div id="edit-numbering">
                    <div className="item-number"><Typography sx={{p:0, pl:10, pr:10, borderRadius: 5}} style={{backgroundColor:"gold"}} variant="h3">1.</Typography></div>
                    <div className="item-number"><Typography sx={{p:0, pl:10, pr:10, borderRadius: 5}} style={{backgroundColor:"gold"}} variant="h3">2.</Typography></div>
                    <div className="item-number"><Typography sx={{p:0, pl:10, pr:10, borderRadius: 5}} style={{backgroundColor:"gold"}} variant="h3">3.</Typography></div>
                    <div className="item-number"><Typography sx={{p:0, pl:10, pr:10, borderRadius: 5}} style={{backgroundColor:"gold"}} variant="h3">4.</Typography></div>
                    <div className="item-number"><Typography sx={{p:0, pl:10, pr:10, borderRadius: 5}} style={{backgroundColor:"gold"}} variant="h3">5.</Typography></div>
                </div>
                {editItems}
                
            </div>
        </div>
    )
}

export default WorkspaceScreen;