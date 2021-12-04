import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AuthContext from '../auth';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    const [open, setOpen] = useState(false); // Will help with opening/closing collapse

    function handleClick () {
        setOpen(!open);
        if (!open){
            if  (idNamePair.date !== "edit")
                addView()
        }
      };

    function addView(){
        console.log("In addView");
        store.addView(idNamePair._id);
    }

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        console.log("update text");
        setText(event.target.value);
    }

    function handleKeyEnter(event) {
        if (event.code === "Enter") {
            console.log(text);
            store.addComment(idNamePair._id, text);
            setText("");
            event.target.value = "";
        }
    }

    function handleEdit(){
        store.setCurrentList(idNamePair._id);
    }

    let bgc = "lightblue";
    if (idNamePair.date === "edit"){
        bgc = "lightyellow";
    }

    let edPub = 
        <Button onClick={handleEdit} style={{color: "red", textDecoration: "underline"}} variant="text">
            Edit
        </Button>

    if (idNamePair.date !== "edit"){
        edPub = 
            <span> Published: {idNamePair.date}</span>
    }

    let comment = "";

    if (idNamePair.date !== "edit"){
        comment = <TextField onChange={handleUpdateText} onKeyPress={handleKeyEnter} fullWidth={true} label={"Add Comment"} id="outlined-basic" variant="outlined" ></TextField>;
    }

    let delBut = "";
    if (store.whichLists === ""){
        delBut = <IconButton onClick={(event) => {
            handleDeleteList(event, idNamePair._id)
        }} aria-label='delete'>
            <DeleteIcon style={{fontSize:'20pt'}} />
        </IconButton>
    }

    let dis = true;
    if (idNamePair.date !== "edit"){
        dis = false;
    }

    function addDislike(){
        sstore.addDL(idNamePair._id, -1);
        console.log(-1);
    }

    function addLike(){
        store.addDL(idNamePair._id, 1);
        console.log(1);
    }

    let cardElement =
        <Grid item xs={12} sx={{p:0,borderRadius: 5}} mt={2} style={{backgroundColor:bgc}}>
                <Grid container spacing={0}>
                    <Grid item xs={10}>
                        <Typography variant="h5"> {idNamePair.name} </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <IconButton disabled={dis} onClick={addLike} aria-label='edit'>
                        <ThumbUpIcon />
                    </IconButton>
                    {idNamePair.likes}
                    <IconButton disabled={dis} onClick={addDislike} aria-label='edit'>
                        <ThumbDownIcon />
                    </IconButton>
                    {idNamePair.dislikes}
                    {delBut}
                    </Grid>
                </Grid>
                <Collapse in={open}>
                <Grid container>
                    <Grid item xs={6} sx={{p:1}}>
                        {
                            idNamePair.items.map((item, index) => (
                                <Typography sx={{left: "5px"}}variant="h5" component="h5">
                                    {index+1}. {item}
                                </Typography>
                            ))
                        }
                    </Grid>
                    <Grid container direction={"row"} xs={6}>
                        
                        <Grid item sx={{p:1}} xs={12}><Paper style={{maxHeight:100, overflow: 'auto'}}>
                        {
                            idNamePair.comments.slice(0).reverse().map((item, index) => (
                                <Typography sx={{left: "5px"}}variant="h5" component="h5">
                                    {item}
                                </Typography>
                            ))
                        }
                        </Paper></Grid>
                        <Grid item sx={{ flexGrow: 1,p:1 }}>                        
                            {comment}
                        </Grid>
                    </Grid>
                </Grid>
        </Collapse>
                <Box>
                    <Typography sx={{p:1}}>By: {idNamePair.userName}</Typography>
                </Box>
                <Grid container>
                    <Grid item xs={11}>
                    {edPub}
                    </Grid>
                    <Grid item xs={1}>
                    Views: {idNamePair.views}
                    <IconButton onClick={handleClick} aria-label='delete'>
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    </Grid>
                    
                </Grid>
        </Grid>
    /*<List>
        <Divider />
        <ListItem
            disabled={store.isListNameEditActive} 
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '0px', display: 'flex', pl: 1, pt: 0 , backgroundColor: "white"}}
            button={false}
            style={{
                fontSize: '20pt',
                width: '100%',
            }}
        >

                <Box sx={{ p: 0, flexGrow: 1 }}>{idNamePair.name}</Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <ThumbUpIcon style={{fontSize:'20pt'}} />
                    </IconButton>
                    {idNamePair.likes}
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <ThumbDownIcon style={{fontSize:'20pt'}} />
                    </IconButton>
                    {idNamePair.dislikes}
                </Box>
                <Divider />
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'20pt'}} />
                    </IconButton>
                </Box>
                
        </ListItem>
        <Collapse in={open}>
                <Grid container>
                    <Grid item xs={6} sx={{p:1}}>
                        {
                            idNamePair.items.map((item, index) => (
                                <Typography sx={{left: "5px"}}variant="h5" component="h5">
                                    {index+1}. {item}
                                </Typography>
                            ))
                        }
                    </Grid>
                    <Grid container direction={"row"} xs={6}>
                        
                        <Grid item sx={{p:1}} xs={12}><Paper style={{maxHeight:100, overflow: 'auto'}}>
                        {
                            idNamePair.comments.slice(0).reverse().map((item, index) => (
                                <Typography sx={{left: "5px"}}variant="h5" component="h5">
                                    {item}
                                </Typography>
                            ))
                        }
                        </Paper></Grid>
                        <Grid item sx={{ flexGrow: 1,p:1 }}>                        
                            {comment}
                        </Grid>
                    </Grid>
                </Grid>
        </Collapse>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>  
                <Box sx={{ p: 1, display: 'flex', flexGrow: 1, backgroundColor: "white" }}>
                    {edPub}
                </Box>
                <Box>
                    <Typography sx={{p: 1}}>
                        Views: {idNamePair.views}
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: "white" }}>
                    <IconButton onClick={handleClick} aria-label='delete'>
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
            </Box>
        </List>*/

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;