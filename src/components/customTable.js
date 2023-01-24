import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { fontWeight } from '@mui/system';
import { paginationClasses } from '@mui/material';
import { Typography, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function CustomTable(props) {
  const columns = props.columns;
  const rows = props.rows;
  // const [page, setPage] = React.useState(0);
  let page = props.pagination.page;
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let rowsPerPage = props.pagination.limit;

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  // must be an inout from props

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  // must be an inout from props
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader
          aria-label="sticky table"
          size="small">
          <TableHead
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.main'
            }}>
            <TableRow sx={{
              bgcolor: 'primary.main',
              color: 'primary.main'
            }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    bgcolor: 'primary.main',
                    fontWeight: 'bold'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        
        
        <IconButton
        disabled={(props.pagination.start <= 1) ? true : false}
        onClick={props.handlePreviousPage}>
          <NavigateBeforeIcon />
        </IconButton>

        <Typography sx={{display: "inline", fontSize: '75%'}}>
          {`${props.pagination.start} - ${props.pagination.end} of ${props.pagination.total} `}
        </Typography>

        <IconButton
        disabled={(props.pagination.end == props.pagination.total) ? true : false}
        onClick={props.handleNextPage}>
          <NavigateNextIcon />
        </IconButton>
        
      </div>
    </Paper>
  );
}