import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IComment } from '../../types/model';

type TCommentModalProps = {
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
  setIsAddingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddingOpen: boolean;
};

const INITIAL_COMMENT = { id: 0, description: '', date: '' };

export const CommentModal = ({
  comments,
  setComments,
  setIsAddingOpen,
  isAddingOpen,
}: TCommentModalProps): JSX.Element => {
  const [newComment, setNewComment] = useState<IComment>(INITIAL_COMMENT);

  const { description, date } = newComment;
  const isSaveDisabled =
    description.trim().length === 0 || date.trim().length === 0;

  const maxId = [...comments].sort((a, b) => b.id - a.id)[0].id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewComment((prev) => ({
      ...prev,
      [e.target.name]: typeof value === 'string' ? value : +value,
      id: maxId + 1,
    }));
  };

  const addComment = (e: React.FormEvent, newComment: IComment) => {
    e.preventDefault();

    setComments((prev) => [...prev, newComment]);
    setNewComment(INITIAL_COMMENT);
  };

  const handleSave = (e: React.MouseEvent<HTMLElement>) => {
    addComment(e, newComment);
    setIsAddingOpen(false);
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
      <Box sx={styledModalBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add comment
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
            <TextField
              id="outlined-basic"
              label="Description"
              name="description"
              variant="outlined"
              type="text"
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Date"
              name="date"
              variant="outlined"
              type="text"
              onChange={handleChange}
            />
            <div style={styledButtonsContainer}>
              <Button
                variant="outlined"
                disabled={isSaveDisabled}
                onClick={handleSave}
              >
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

const styledModalBox = {
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

const styledButtonsContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: 20,
  padding: '10px 0 ',
};
