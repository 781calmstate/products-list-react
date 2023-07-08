import React from 'react';

import { IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

import { IComment } from '../../types/model';

type TCommentItemProps = {
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
  comment: IComment;
};

export const CommentItem = ({
  comment,
  setComments,
}: TCommentItemProps): JSX.Element => {
  const handleDeleteClick = (id: number) => {
    setComments((prev) => [...prev].filter((comment) => comment.id !== id));
  };
  return (
    <Item>
      <div style={{ flexDirection: 'column' }}>
        <p>
          {comment.id}. {comment.description}
          <br />
          <i>Posted {comment.date}</i>
        </p>
      </div>
      <IconButton
        aria-label="delete"
        onClick={() => handleDeleteClick(comment.id)}
      >
        <DeleteIcon />
      </IconButton>
    </Item>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
