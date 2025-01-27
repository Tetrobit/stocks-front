import React from 'react';
import { useNavigate } from 'react-router-dom'
import { getNavigationValue } from '@brojs/cli';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import './style.css';

const TradePage = (): React.ReactElement => {

  function createData(
    name: string,
    rate: number,
    change: number
  ) {
    return { name, rate, change};
  }
  
  const rows = [
    createData('RUB', 159, 0.9),
    createData('USD', 23, 0.6),
  ];
  
  
  return (
    <div className="trade-wrapper">
      <div className="trade">
        <div className="chart-section">
          <div>
              график
          </div>
        </div>
          <div className='info'>
            <Stack spacing={2} direction='column'>
              <Box sx={{ minWidth: 100 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Выбор валюты</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                    <MenuItem>RUB</MenuItem>
                    <MenuItem>USD</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Валюта</TableCell>
                      <TableCell align="right">Цена</TableCell>
                      <TableCell align="right">Изменение</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.rate}</TableCell>
                        <TableCell align="right">{row.change}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
                <Stack spacing={2} direction='row'>
                  <Button variant="contained">Ставка на повышение</Button>
                  <Button variant="contained">Ставка на понижение</Button>
                </Stack>
              </Stack>  
          </div>
      </div>
    </div>
  );
};

export default TradePage;