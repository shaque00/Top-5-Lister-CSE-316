import { useContext } from 'react'
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
                        value="asd"
                        style={{backgroundColor: "gold"}}
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        autoComplete="Top 5 Item Name"
                        className='list-card'
                        inputProps={{style: {fontSize: 48}}}
                        InputLabelProps={{style: {fontSize: 24}}}
                        autoFocus
                    ></TextField>
                </ListItem>

                <ListItem className="top5-item" sx={{ display: 'flex', p: 1 }} style={{ ontSize: '48pt', width: '100%' }}>
                    <TextField sx={{ p: 0 }}
                        style={{backgroundColor: "gold"}}
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        autoComplete="Top 5 Item Name"
                        className='list-card'
                        inputProps={{style: {fontSize: 48}}}
                        InputLabelProps={{style: {fontSize: 24}}}
                        autoFocus
                    ></TextField>
                </ListItem>

                <ListItem className="top5-item" sx={{ display: 'flex', p: 1 }} style={{ ontSize: '48pt', width: '100%' }}>
                    <TextField sx={{ p: 0 }}
                        style={{backgroundColor: "gold"}}
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        autoComplete="Top 5 Item Name"
                        className='list-card'
                        inputProps={{style: {fontSize: 48}}}
                        InputLabelProps={{style: {fontSize: 24}}}
                        autoFocus
                    ></TextField>
                </ListItem>

                <ListItem className="top5-item" sx={{ display: 'flex', p: 1 }} style={{ ontSize: '48pt', width: '100%' }}>
                    <TextField sx={{ p: 0 }}
                        style={{backgroundColor: "gold"}}
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        autoComplete="Top 5 Item Name"
                        className='list-card'
                        inputProps={{style: {fontSize: 48}}}
                        InputLabelProps={{style: {fontSize: 24}}}
                        autoFocus
                    ></TextField>
                </ListItem>

                <ListItem className="top5-item" sx={{ display: 'flex', p: 1 }} style={{ ontSize: '48pt', width: '100%' }}>
                    <TextField sx={{ p: 0 }}
                        style={{backgroundColor: "gold"}}
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        autoComplete="Top 5 Item Name"
                        className='list-card'
                        inputProps={{style: {fontSize: 48}}}
                        InputLabelProps={{style: {fontSize: 24}}}
                        autoFocus
                    ></TextField>
                </ListItem>
                
            </List>

    return (
        /*<div id="top5-workspace">
            <div id="workspace-edit">
                <div id="edit-numbering">
                    <div className="item-number"><Typography sx={{p:3, pl:10, pr:10, borderRadius: 5}} style={{backgroundColor:"gold"}} variant="h3">1.</Typography></div>
                    <div className="item-number"><Typography sx={{p:3, pl:10, pr:10, borderRadius: 5}} style={{backgroundColor:"gold"}} variant="h3">2.</Typography></div>
                    <div className="item-number"><Typography sx={{p:3, pl:10, pr:10, borderRadius: 5}} style={{backgroundColor:"gold"}} variant="h3">3.</Typography></div>
                    <div className="item-number"><Typography sx={{p:3, pl:10, pr:10, borderRadius: 5}} style={{backgroundColor:"gold"}} variant="h3">4.</Typography></div>
                    <div className="item-number"><Typography sx={{p:3, pl:10, pr:10, borderRadius: 5}} style={{backgroundColor:"gold"}} variant="h3">5.</Typography></div>
                    <div className="item-number"><Typography sx={{p:3, pl:10, pr:10, borderRadius: 5}} style={{backgroundColor:"gold"}} variant="h3">5.</Typography></div>
                </div>
                {editItems}
            </div>
        </div>*/
        <div id="top5-workspace">
            <Grid container direction={'column'} spacing={0}>
                <Grid item xs={2}>
                    <TextField
                        style={{backgroundColor: "white", width: "45%"}}
                        margin="dense"
                    >
                    </TextField>
                </Grid>

                
                <Grid container direction={'row'} spacing={2}>
                    <Grid item xs={2}>
                    <TextField
                            style={{backgroundColor: "gold", width: "98%"}}
                            margin="dense"
                            variant="outlined"
                            sx={{borderRadius: "25px"}}
                            disabled={true}
                            value="1."
                            inputProps={{min: 0, style: { textAlign: 'center', fontSize: 30 }}}
                            >
                        </TextField>
                    </Grid>

                    <Grid item xs={10}>
                        <TextField
                            style={{backgroundColor: "gold", width: "98%"}}
                            margin="dense"
                            variant="outlined"
                            sx={{borderRadius: "25px"}}
                            inputProps={{style: {fontSize: 30}}}
                            >
                        </TextField>
                    </Grid>
                </Grid>

                <Grid container direction={'row'} spacing={2}>
                    <Grid item xs={2}>
                    <TextField
                            style={{backgroundColor: "gold", width: "98%"}}
                            margin="dense"
                            variant="outlined"
                            sx={{borderRadius: "25px"}}
                            disabled={true}
                            value="2."
                            inputProps={{min: 0, style: { textAlign: 'center', fontSize: 30 }}}
                            >
                        </TextField>
                    </Grid>

                    <Grid item xs={10}>
                        <TextField
                            style={{backgroundColor: "gold", width: "98%"}}
                            margin="dense"
                            variant="outlined"
                            sx={{borderRadius: "25px"}}
                            inputProps={{style: {fontSize: 30}}}
                            >
                        </TextField>
                    </Grid>
                </Grid>

                <Grid container direction={'row'} spacing={2}>
                    <Grid item xs={2}>
                    <TextField
                            style={{backgroundColor: "gold", width: "98%"}}
                            margin="dense"
                            variant="outlined"
                            sx={{borderRadius: "25px"}}
                            disabled={true}
                            value="3."
                            inputProps={{min: 0, style: { textAlign: 'center', fontSize: 30 }}}
                            >
                        </TextField>
                    </Grid>

                    <Grid item xs={10}>
                        <TextField
                            style={{backgroundColor: "gold", width: "98%"}}
                            margin="dense"
                            variant="outlined"
                            sx={{borderRadius: "25px"}}
                            inputProps={{style: {fontSize: 30}}}
                            >
                        </TextField>
                    </Grid>
                </Grid>

                <Grid container direction={'row'} spacing={2}>
                    <Grid item xs={2}>
                    <TextField
                            style={{backgroundColor: "gold", width: "98%"}}
                            margin="dense"
                            variant="outlined"
                            sx={{borderRadius: "25px"}}
                            disabled={true}
                            value="4."
                            inputProps={{min: 0, style: { textAlign: 'center', fontSize: 30 }}}
                            >
                        </TextField>
                    </Grid>

                    <Grid item xs={10}>
                        <TextField
                            style={{backgroundColor: "gold", width: "98%"}}
                            margin="dense"
                            variant="outlined"
                            sx={{borderRadius: "25px"}}
                            inputProps={{style: {fontSize: 30}}}
                            >
                        </TextField>
                    </Grid>
                </Grid>

                <Grid container direction={'row'} spacing={2}>
                    <Grid item xs={2}>
                    <TextField
                            style={{backgroundColor: "gold", width: "98%"}}
                            margin="dense"
                            variant="outlined"
                            sx={{borderRadius: "25px"}}
                            disabled={true}
                            value="5."
                            inputProps={{min: 0, style: { textAlign: 'center', fontSize: 30 }}}
                            >
                        </TextField>
                    </Grid>

                    <Grid item xs={10}>
                        <TextField
                            style={{backgroundColor: "gold", width: "98%"}}
                            margin="dense"
                            variant="outlined"
                            sx={{borderRadius: "25px"}}
                            inputProps={{style: {fontSize: 30}}}
                            >
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button variant="contained" style={{ "min-height": "200px", top: "50px", left: "50px"}}>
                            Save
                        </Button>
                        <Button variant="contained">
                            Publish
                        </Button>
                    </Box>
        </div>
    )
}

export default WorkspaceScreen;