import React from 'react';

import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import { IComment } from '../../types/model';

type TCommentItemProps = {
  comment: IComment;
};

export const CommentItem = ({ comment }: TCommentItemProps): JSX.Element => {
  return (
    <Item>
      {comment.id}. {comment.description}
    </Item>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
