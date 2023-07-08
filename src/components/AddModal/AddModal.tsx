import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';

type TAddModalProps = {
  isAddingOpen: boolean;
  setIsAddingOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddModal = ({
  isAddingOpen,
  setIsAddingOpen,
}: TAddModalProps): JSX.Element => {
  const handleClick = () => {
    console.log('baruh');
  };

  const handleClose = () => {
    setIsAddingOpen(false);
  };
  return (
    <Modal
      open={isAddingOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add product
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="Count" variant="outlined" />
            <TextField
              id="outlined-basic"
              label="Weight (g)"
              variant="outlined"
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 20,
                padding: '10px 0 ',
              }}
            >
              <Button variant="outlined" onClick={handleClick}>
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Box>
        </Typography>
      </Box>
    </Modal>
  );
};

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
  textAlign: 'center',
};
