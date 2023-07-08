import React, { useEffect, useState } from 'react';

import {
  AddButton,
  AddModal,
  Loader,
  ProductsTable,
  SortMenu,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import * as productsActions from '../../redux/slices/productsSlice';

export const ProductsPage = (): JSX.Element => {
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();

  const [sortBy, setSortBy] = useState('name');
  const [isAddingOpen, setIsAddingOpen] = useState(false);

  useEffect(() => {
    dispatch(productsActions.init());
  }, []);

  useEffect(() => {
    dispatch(productsActions.sort(sortBy));
  }, [sortBy, products]);

  if (loading) {
    return <Loader />;
  }

  if (!products.length) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <AddButton setIsAddingOpen={setIsAddingOpen} />
      <SortMenu setSortBy={setSortBy} sortBy={sortBy} />
      <ProductsTable />

      {isAddingOpen && (
        <AddModal
          isAddingOpen={isAddingOpen}
          setIsAddingOpen={setIsAddingOpen}
        />
      )}
    </div>
  );
};
