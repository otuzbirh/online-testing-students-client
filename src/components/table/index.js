import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { Table, Menu, MenuItem, Button } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from 'react-router-dom'

export default function TableComponent({
  columns,
  createData,
  rows,
  setSelectedUpdateId,
  handleOpenEditModal,
  setSelectedDeleteId,
  setSelectedName,
  handleOpenDeleteModal,
  module
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState("");

  const navigate = useNavigate()


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleNavigateQuiz = (id) => {
    const currentUrl = window.location.pathname;
    let destinationUrl = '';

    if (currentUrl.includes('teacher/quiz')) {
      destinationUrl = `/teacher/quiz/${id}`;
    } else if (currentUrl.includes('admin/quiz')) {
      destinationUrl = `/admin/quiz/${id}`;
    }

    if (destinationUrl) {
      navigate(destinationUrl);
    }
  };

  const handleNavigateStudentQuiz = (id) => {
    navigate(`/student/quiz/${id}`)
  }

  return (
    // <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="right">
                        <Button
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(event) => {
                            handleClick(event, row.id);
                            setSelectedId(row.id)
                            setSelectedName(row.firstName || row.quizname)
                          }}
                        >
                          <MoreVertIcon sx={{ color: "#253237" }} />
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                          onClick={() => {
                            if (selectedId) {
                              setSelectedUpdateId(selectedId)
                              setSelectedDeleteId(selectedId)
                            }
                          }}

                        >
                          {module === 'student' ? (
                            <MenuItem onClick={() => handleNavigateStudentQuiz(selectedId)}>
                              Pristupi ispitu
                            </MenuItem>
                          ) : module === 'quiz' ? (
                            <>
                              <MenuItem onClick={() => handleNavigateQuiz(selectedId)}>
                                Pitanja
                              </MenuItem>
                              <MenuItem onClick={handleOpenEditModal}>
                                Uredi
                              </MenuItem>
                              <MenuItem onClick={handleOpenDeleteModal}>
                                Obriši
                              </MenuItem>
                            </>
                          ) : (
                            <>
                              <MenuItem onClick={handleOpenEditModal}>
                                Uredi
                              </MenuItem>
                              <MenuItem onClick={handleOpenDeleteModal}>
                                Obriši
                              </MenuItem>
                            </>
                          )}


                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
    // </Paper>
  );
}
