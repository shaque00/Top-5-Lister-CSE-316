import { useContext } from 'react';
import AuthContext from '../auth';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function ErrorModal() {
    const { auth } = useContext(AuthContext);

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

    if (auth.error){
        open = true;
    }

    function handleClose(){
        open = false;
        auth.removeError();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={style}>
                <Alert severity="error"> {auth.error} </Alert>
                <Button variant="contained" onClick={handleClose}> Close </Button>
            </Box>
        </Modal>
    );
}