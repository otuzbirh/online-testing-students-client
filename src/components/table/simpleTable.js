import * as React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Tooltip,
  Fade,
  styled,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  alpha
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Inventory as InventoryIcon
} from "@mui/icons-material";

// Enhanced styled components (same as main table)
const MainContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  // borderRadius: theme.spacing(3),
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
  // border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: '70vh',
  minHeight: '400px',
  overflowX: 'auto',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: `${alpha(theme.palette.primary.main, 0.3)} transparent`,
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: alpha(theme.palette.grey[300], 0.2),
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    borderRadius: '10px',
    '&:hover': {
      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    },
  },
  '&::-webkit-scrollbar-corner': {
    background: 'transparent',
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  },
}));

const TableHeaderStyled = styled(TableHead)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  '& .MuiTableRow-root': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    '& .MuiTableCell-head': {
      color: theme.palette.common.black,
      fontWeight: 700,
      fontSize: '0.875rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      padding: theme.spacing(2.5, 3),
      borderBottom: 'none',
      textShadow: '0 1px 3px rgba(0,0,0,0.3)',
      whiteSpace: 'nowrap',
      '&:first-of-type': {
        borderTopLeftRadius: 0,
      },
      '&:last-of-type': {
        borderTopRightRadius: 0,
      },
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:nth-of-type(even)': {
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
    '& .MuiTableCell-root': {
      borderColor: alpha(theme.palette.primary.main, 0.2),
    },
  },
  '&:last-child .MuiTableCell-root': {
    borderBottom: 'none',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '200px',
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
  color: theme.palette.common.white,
  boxShadow: `0 4px 12px ${alpha(theme.palette.error.main, 0.3)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.error.dark} 0%, ${theme.palette.error.main} 100%)`,
    transform: 'scale(1.1) translateY(-2px)',
    boxShadow: `0 8px 25px ${alpha(theme.palette.error.main, 0.4)}`,
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(2),
    minWidth: 180,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    overflow: 'visible',
    marginTop: theme.spacing(1),
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
  '& .MuiMenuItem-root': {
    padding: theme.spacing(1.5, 2.5),
    fontSize: '0.875rem',
    fontWeight: 500,
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0.5, 1),
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.error.main, 0.08),
      transform: 'translateX(4px)',
    },
  },
}));

const MobileCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2.5),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
    borderColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(8, 4),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${alpha(theme.palette.grey[50], 0.8)} 0%, ${alpha(theme.palette.grey[100], 0.4)} 100%)`,
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`,
  backdropFilter: 'blur(10px)',
  '& .MuiTablePagination-root': {
    '& .MuiTablePagination-toolbar': {
      padding: theme.spacing(2, 4),
      minHeight: 72,
    },
    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
      fontWeight: 600,
      color: theme.palette.text.primary,
      fontSize: '0.875rem',
    },
    '& .MuiTablePagination-select': {
      borderRadius: theme.spacing(1.5),
      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      // padding: theme.spacing(0.5, 1.5),
      backgroundColor: theme.palette.common.white,
      fontWeight: 600,
      '&:focus': {
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
      },
    },
    '& .MuiTablePagination-actions button': {
      borderRadius: theme.spacing(1.5),
      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      margin: theme.spacing(0, 0.5),
      width: 40,
      height: 30,
      backgroundColor: theme.palette.common.white,
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        borderColor: theme.palette.primary.main,
        transform: 'scale(1.05)',
      },
      '&.Mui-disabled': {
        borderColor: alpha(theme.palette.action.disabled, 0.2),
        backgroundColor: alpha(theme.palette.action.disabled, 0.05),
      },
    },
  },
}));

export default function SimpleTable({
  columns,
  createData,
  rows,
  handleOpenDeleteModal,
  setSelectedDeleteId
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const open = Boolean(anchorEl);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const renderCellContent = (column, value) => {
    if (column.id === 'id') {
      return (
        <Typography
          variant="body2"
          fontWeight={600}
          color="primary.main"
          sx={{ fontFamily: 'monospace' }}
        >
          #{value?.toString().slice(-6)}
        </Typography>
      );
    }

    return (
      <Typography
        variant="body2"
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {value}
      </Typography>
    );
  };

  // Mobile Card Component
  const MobileCardView = ({ row, index }) => (
    <Fade in={true} timeout={300 + index * 50} key={row.id || row.code}>
      <MobileCard>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" fontWeight={700} color="text.primary" gutterBottom>
                <InventoryIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
                Stavka #{row.id?.toString().slice(-6) || 'N/A'}
              </Typography>
            </Box>
            <ActionButton
              onClick={(event) => handleClick(event, row.id)}
              size="small"
            >
              <MoreVertIcon />
            </ActionButton>
          </Box>

          <Stack spacing={2}>
            {columns.map((column) => {
              if (column.id === 'id') return null;
              const value = row[column.id];
              return (
                <Box key={column.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    {column.label}:
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ wordBreak: 'break-word', textAlign: 'right' }}>
                    {column.format && typeof value === "number" ? column.format(value) : value}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </CardContent>
      </MobileCard>
    </Fade>
  );

  return (
    <MainContainer elevation={0}>
      {isMobile ? (
        // Mobile View
        <Box sx={{ p: 2 }}>
          {!rows || rows.length === 0 ? (
            <EmptyState>
              <InventoryIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" fontWeight={600} gutterBottom>
                Nema podataka
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Trenutno nema stavki za prikaz
              </Typography>
            </EmptyState>
          ) : (
            rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <MobileCardView key={row.id || row.code || index} row={row} index={index} />
              ))
          )}
        </Box>
      ) : (
        // Desktop/Tablet View
        <StyledTableContainer>
          <StyledTable stickyHeader>
            <TableHeaderStyled>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    style={{
                      minWidth: isTablet ? Math.max(column.minWidth * 0.8, 100) : column.minWidth
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center" style={{ width: '80px', minWidth: '80px' }}>
                  Akcije
                </TableCell>
              </TableRow>
            </TableHeaderStyled>
            <TableBody>
              {!rows || rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 0, border: 'none' }}>
                    <EmptyState>
                      <InventoryIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h5" color="text.secondary" fontWeight={600} gutterBottom>
                        Nema podataka
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Trenutno nema stavki za prikaz
                      </Typography>
                    </EmptyState>
                  </TableCell>
                </TableRow>
              ) : (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <Fade in={true} timeout={200 + index * 30} key={row.id || row.code || index}>
                      <StyledTableRow hover>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <StyledTableCell key={column.id} align={column.align || 'left'}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : renderCellContent(column, value)}
                            </StyledTableCell>
                          );
                        })}
                        <StyledTableCell align="center">
                          <Tooltip title="Više opcija" arrow placement="left">
                            <ActionButton
                              onClick={(event) => {
                                handleClick(event, row.id);
                                setSelectedId(row.id);
                              }}
                              size="small"
                            >
                              <MoreVertIcon sx={{ fontSize: 18 }} />
                            </ActionButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    </Fade>
                  ))
              )}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      )}

      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClick={() => {
          setSelectedDeleteId(selectedId);
        }}
      >
        <MenuItem
          onClick={() => {
            handleOpenDeleteModal();
            handleClose();
          }}
        >
          <DeleteIcon sx={{ mr: 2, color: 'error.main', fontSize: 20 }} />
          <Typography variant="body2" fontWeight={600}>
            Obriši
          </Typography>
        </MenuItem>
      </StyledMenu>

      <PaginationContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25, 50]}
          component="div"
          count={rows?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Redova po stranici:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} od ${count !== -1 ? count : `više od ${to}`}`
          }
        />
      </PaginationContainer>
    </MainContainer>
  );
}


