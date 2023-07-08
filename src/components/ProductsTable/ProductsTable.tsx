import React from 'react';

import { useAppSelector } from '../../hooks/redux';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export const ProductsTable = (): JSX.Element => {
  const { products } = useAppSelector((state) => state.products);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 16, fontWeight: 'bold' }}>
                ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 16, fontWeight: 'bold' }}
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 16, fontWeight: 'bold' }}
              >
                Count&nbsp;
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 16, fontWeight: 'bold' }}
              >
                Weight&nbsp;(g)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.weight}</TableCell>
                <TableCell align="center">{product.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
