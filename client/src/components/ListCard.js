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

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    const [open, setOpen] = useState(false); // Will help with opening/closing collapse

    const handleClick = () => {
        if (!open){
            //store.addView(idNamePair._id);
        }
        setOpen(!open);
      };

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
        setText(event.target.value);
    }

    let cardElement =
    <List>
        <Divider />
        <ListItem
            disabled={store.isListNameEditActive}
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '0px', display: 'flex', pl: 1, pt: 0 , backgroundColor: "white"}}
            /*onClick={(event) => {
                handleLoadList(event, idNamePair._id)
                }
            }*/
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
                            idNamePair.items.map((item, index) => (
                                <Typography sx={{left: "5px"}}variant="h5" component="h5">
                                    {index+1}. {item}
                                </Typography>
                            ))
                        }
                        </Paper></Grid>
                        <Grid item sx={{ flexGrow: 1,p:1 }}>                        
                            <TextField fullWidth={true} label={"Add Comment"} id="outlined-basic" variant="outlined" ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
        </Collapse>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>  
                <Box sx={{ p: 1, display: 'flex', flexGrow: 1, backgroundColor: "white" }}>
                    asddsaf
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
        </List>

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