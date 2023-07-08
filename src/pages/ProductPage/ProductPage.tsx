import React, { useEffect, useState } from 'react';

import { Button, Stack } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import * as productsActions from '../../redux/slices/productsSlice';

import { Link, useParams } from 'react-router-dom';

import { NotFoundPage } from '../NotFoundPage';

import { CommentItem, CommentModal, EditModal } from '../../components';

import { IComment } from '../../types/model';
import { EditButton } from '../../components/UI';

export const ProductPage = (): JSX.Element => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const [comments, setComments] = useState<IComment[]>([]);
  const [isAddingOpen, setIsAddingOpen] = useState(false);
  const [isEditingOpen, setIsEditingOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    commentsFetch();
  }, []);

  const commentsFetch = async () => {
    const response = await fetch('http://localhost:8080/comments');
    const data = await response.json();
    setComments(data);
  };

  const productId = Number(id);

  if (!id) {
    return <div>NO ID</div>;
  }

  const product = products.find((product) => {
    return product.id === productId;
  });

  if (!product) {
    return <NotFoundPage />;
  }

  const { name, count, size, weight } = product;

  const handleAddClick = () => {
    setIsAddingOpen(true);
  };

  return (
    <div style={styledContainer}>
      <div style={styledHeader}>
        <Link to={'/'}>
          <Button variant="outlined">Back</Button>
        </Link>
        <h1>Product {name}</h1>
        <EditButton setIsEditingOpen={setIsEditingOpen} />
      </div>
      <p style={styledParagraph}>
        Count: {count}
        <br />
        Width: {size.width} and Height: {size.height}
        <br />
        Weight: {weight}
      </p>
      <div style={styleCommentsHeader}>
        <h2 style={{ textAlign: 'center' }}>Comment Section</h2>
        <Button variant="outlined" onClick={handleAddClick}>
          Add comment
        </Button>
      </div>

      <Stack spacing={2}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            setComments={setComments}
          />
        ))}
      </Stack>

      {isAddingOpen && (
        <CommentModal
          comments={comments}
          setComments={setComments}
          isAddingOpen={isAddingOpen}
          setIsAddingOpen={setIsAddingOpen}
        />
      )}
      {isEditingOpen && (
        <EditModal
          isEditingOpen={isEditingOpen}
          setIsEditingOpen={setIsEditingOpen}
          productId={productId}
        />
      )}
    </div>
  );
};

const styledContainer = {
  margin: '0 auto',
  width: 800,
  padding: '40px 0',
};

const styledHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
};

const styledParagraph = {
  fontSize: 20,
  lineHeight: 1.6,
};

const styleCommentsHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
