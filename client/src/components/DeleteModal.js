import { useContext } from 'react';
import { GlobalStoreContext } from '../store'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function ErrorModal() {
    const { store } = useContext(GlobalStoreContext);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        margin: 'auto'
      };

    let open = false;
    let name = "";

    if (store.listMarkedForDeletion){
        open = true;
        name = store.listMarkedForDeletion.name;
    }

    function handleClose(){
        open  = false;
        store.unmarkListForDeletion();
    }

    function handleDelete(){
        open = false;
        store.deleteMarkedList();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={style}>
                <Alert severity="error"> Delete the {name} Top 5 List? </Alert>
                <Button variant="contained" onClick={handleClose}> Cancel </Button>
                <Button variant="outlined" color="error" onClick={handleDelete}> Confirm </Button>
            </Box>
        </Modal>
    );
}