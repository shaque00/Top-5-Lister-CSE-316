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
function ComList(props) {
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
        store.addDislike(idNamePair._id);
        console.log(0);
    }

    function addLike(){
        store.addLike(idNamePair._id);
        console.log(1);
    }

    console.log(idNamePair);

    let lColor = "";
    let dColor = "";
    if (idNamePair.usersD.includes(auth.user.userName)){
        dColor = "red";
    } else if (idNamePair.usersL.includes(auth.user.userName)){
        lColor = "green"
    }

    let cardElement =
        <Grid item xs={12} sx={{p:0,borderRadius: 5}} mt={2} style={{backgroundColor:bgc}}>
                <Grid container spacing={0}>
                    <Grid item xs={10}>
                        <Typography variant="h5"> {idNamePair.name} </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <IconButton disabled={dis} onClick={addLike} aria-label='edit'>
                        <ThumbUpIcon style={{fill: lColor}}/>
                    </IconButton>
                    {idNamePair.likes}
                    <IconButton disabled={dis} onClick={addDislike} aria-label='edit'>
                        <ThumbDownIcon style={{fill: dColor}}/>
                    </IconButton>
                    {idNamePair.dislikes}
                    {delBut}
                    </Grid>
                </Grid>
                <Collapse in={open}>
                <Grid container>
                    <Grid item xs={6} sx={{p:1}} style={{backgroundColor:"#DCAE96"}} sx={{borderRadius:1, p:1}}>
                        {
                            idNamePair.uitems.slice(0,5).map((item, index) => (
                                <div>
                                <Typography style={{color: "black"}} sx={{left: "5px"}}variant="h5" component="h5">
                                    {index+1}. {item}
                                </Typography>
                                Votes: {idNamePair.uvalues[index]}
                                </div>
                            ))
                        }
                    </Grid>
                    <Grid container direction={"row"} xs={6}>
                        
                        <Grid item sx={{p:1}} xs={12}><Paper style={{maxHeight:200, overflow: 'auto'}}>
                        {
                            idNamePair.comments.slice(0).reverse().map((item, index) => (
                                <Box sx={{p:1}}style={{color: "#DCAE96", backgroundColor: "#FFFDD0"}}>
                                    {item.split(":")[0]}
                                <Typography style={{backgroundColor: "#FFFDD0", color:"black"}} sx={{left: "5px", p:0}}variant="h5" component="h5">
                                    {item.split(":")[1]}
                                </Typography>
                                </Box>
                            ))
                        }
                        </Paper></Grid>
                        <Grid item sx={{ flexGrow: 1,p:1 }}>                        
                            {comment}
                        </Grid>
                    </Grid>
                </Grid>
        </Collapse>
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

    return (
        cardElement
    );
}

export default ComList;