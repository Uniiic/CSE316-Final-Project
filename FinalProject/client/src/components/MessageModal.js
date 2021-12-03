import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { useContext } from 'react';
import AuthContext from '../auth'
const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};
const ButtonStyle = {
    position: "relative",
    left: 130
};
export default function MessageModal(){
    const { auth } = useContext(AuthContext);

    return(
        <Modal
            open={auth.error}
            onClose={!auth.error}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            <Box sx={style}>
                <Alert severity="error">{auth.msg}</Alert>
                <Button style={ButtonStyle}
                    onClick={auth.handleClose}
                >
                    Got it!
                </Button>
            </Box>

        </Modal>
    )
}