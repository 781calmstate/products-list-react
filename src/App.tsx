import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { NotFoundPage, ProductsPage, ProductPage } from './pages';

export const App = (): JSX.Element => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
