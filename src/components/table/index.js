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
  Chip,
  Avatar,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  Fade,
  styled,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  Stack,
  alpha
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Quiz as QuizIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

// Enhanced styled components
const MainContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  // borderRadius: theme.spacing(3),
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
  // border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
}));

const SearchSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.primary.main, 0.06)} 100%)`,
  borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  backdropFilter: 'blur(10px)',
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
  minWidth: 800,
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
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.common.white,
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    transform: 'scale(1.1) translateY(-2px)',
    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(2),
    minWidth: 220,
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
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
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

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(3),
    fontSize: '0.95rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.2),
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.4),
    },
    '&.Mui-focused': {
      boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  '& .MuiInputAdornment-root': {
    marginLeft: theme.spacing(1),
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
      // padding: theme.spacing(2, 4),
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

export default function TableComponent({
  columns,
  rows,
  setSelectedUpdateId,
  handleOpenEditModal,
  setSelectedDeleteId,
  setSelectedName,
  handleOpenDeleteModal,
  module,
  placeholder
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // Filter rows based on search term
  const filteredRows = rows?.filter(row =>
    Object.values(row).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

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

  const handleClick = (event, id, name) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
    setSelectedName(name);
    setSelectedUpdateId(id);
    setSelectedDeleteId(id);
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
    handleClose();
  };

  const handleNavigateStudentQuiz = (id) => {
    navigate(`/student/quiz/${id}`);
    handleClose();
  };

  const getRoleChipColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'error';
      case 'teacher': return 'warning';
      case 'student': return 'success';
      default: return 'default';
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const renderCellContent = (column, value, row) => {
    if (column.id === 'role') {
      return (
        <Chip
          label={value}
          color={getRoleChipColor(value)}
          size="small"
          variant="filled"
          sx={{
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            minWidth: '80px',
            height: '28px'
          }}
        />
      );
    }

    if (column.id === 'firstName' && row.lastName) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: '200px' }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.25)',
              border: '2px solid white'
            }}
          >
            {getInitials(value, row.lastName)}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.primary"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {`${value} ${row.lastName}`}
            </Typography>
          </Box>
        </Box>
      );
    }

    if (column.id === 'lastName') {
      return null; // Already rendered with firstName
    }

    if (column.id === 'email') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: '200px' }}>
          <EmailIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0 }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {value}
          </Typography>
        </Box>
      );
    }

    if (column.id === 'id') {
      return (
        <Typography
          variant="body2"
          fontWeight={600}
          color="primary.main"
          sx={{ fontFamily: 'monospace' }}
        >
          #{value?.slice(-8)}
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
    <Fade in={true} timeout={300 + index * 50} key={row.id}>
      <MobileCard>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'primary.main',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)',
                  border: '3px solid white'
                }}
              >
                {getInitials(row.firstName, row.lastName)}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="h6" fontWeight={700} color="text.primary" noWrap>
                  {`${row.firstName} ${row.lastName}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}
                >
                  <BadgeIcon sx={{ fontSize: 14 }} />
                  #{row.id?.slice(-8)}
                </Typography>
              </Box>
            </Box>
            <ActionButton
              onClick={(event) => handleClick(event, row.id, row.firstName)}
              size="small"
            >
              <MoreVertIcon />
            </ActionButton>
          </Box>

          <Divider sx={{ my: 2, backgroundColor: alpha(theme.palette.primary.main, 0.1) }} />

          <Stack spacing={2.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                {row.email}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                Uloga:
              </Typography>
              <Chip
                label={row.role}
                color={getRoleChipColor(row.role)}
                size="small"
                variant="filled"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </MobileCard>
    </Fade>
  );

  return (
    <MainContainer elevation={0}>
      <SearchSection>
        <SearchField
          fullWidth
          variant="outlined"
          placeholder={placeholder ?? "Pretraži korisnike po imenu, email-u ili ulozi..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" sx={{ fontSize: 22 }} />
              </InputAdornment>
            ),
          }}
        />
        {searchTerm && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 1 }}>
            Pronađeno {filteredRows.length} rezultata
          </Typography>
        )}
      </SearchSection>

      {isMobile ? (
        // Mobile View
        <Box sx={{ p: 2 }}>
          {filteredRows.length === 0 ? (
            <EmptyState>
              <PersonIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" fontWeight={600} gutterBottom>
                {searchTerm ? 'Nema rezultata pretrage' : 'Nema korisnika'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {searchTerm
                  ? 'Pokušajte sa drugim pojmom pretrage'
                  : 'Dodajte nove korisnike da biste ih videli ovde'
                }
              </Typography>
            </EmptyState>
          ) : (
            filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <MobileCardView key={row.id} row={row} index={index} />
              ))
          )}
        </Box>
      ) : (
        // Desktop/Tablet View
        <StyledTableContainer>
          <StyledTable stickyHeader>
            <TableHeaderStyled>
              <TableRow>
                {columns
                  .filter(column => column.id !== 'lastName')
                  .map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || 'left'}
                      style={{
                        minWidth: isTablet ? Math.max(column.minWidth * 0.8, 100) : column.minWidth,
                        width: column.id === 'firstName' ? '25%' :
                          column.id === 'email' ? '30%' :
                            column.id === 'role' ? '15%' : 'auto'
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
              {filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 0, border: 'none' }}>
                    <EmptyState>
                      <PersonIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h5" color="text.secondary" fontWeight={600} gutterBottom>
                        {searchTerm ? 'Nema rezultata pretrage' : 'Nema korisnika'}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {searchTerm
                          ? 'Pokušajte sa drugim pojmom pretrage'
                          : 'Dodajte nove korisnike da biste ih videli ovde'
                        }
                      </Typography>
                    </EmptyState>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <Fade in={true} timeout={200 + index * 30} key={row.id}>
                      <StyledTableRow hover>
                        {columns
                          .filter(column => column.id !== 'lastName')
                          .map((column) => {
                            const content = renderCellContent(column, row[column.id], row);
                            if (content === null) return null;

                            return (
                              <StyledTableCell key={column.id} align={column.align || 'left'}>
                                {column.format && typeof row[column.id] === "number"
                                  ? column.format(row[column.id])
                                  : content}
                              </StyledTableCell>
                            );
                          })}
                        <StyledTableCell align="center">
                          <Tooltip title="Više opcija" arrow placement="left">
                            <ActionButton
                              onClick={(event) => handleClick(event, row.id, row.firstName || row.quizname)}
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
      >
        {module === 'student' ? (
          <MenuItem onClick={() => handleNavigateStudentQuiz(selectedId)}>
            <QuizIcon sx={{ mr: 2, color: 'primary.main', fontSize: 20 }} />
            <Typography variant="body2" fontWeight={600}>
              Pristupi ispitu
            </Typography>
          </MenuItem>
        ) : module === 'quiz' ? (
          <>
            <MenuItem onClick={() => handleNavigateQuiz(selectedId)}>
              <QuizIcon sx={{ mr: 2, color: 'info.main', fontSize: 20 }} />
              <Typography variant="body2" fontWeight={600}>
                Pitanja
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => { handleOpenEditModal(); handleClose(); }}>
              <EditIcon sx={{ mr: 2, color: 'warning.main', fontSize: 20 }} />
              <Typography variant="body2" fontWeight={600}>
                Uredi
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => { handleOpenDeleteModal(); handleClose(); }}>
              <DeleteIcon sx={{ mr: 2, color: 'error.main', fontSize: 20 }} />
              <Typography variant="body2" fontWeight={600}>
                Obriši
              </Typography>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => { handleOpenEditModal(); handleClose(); }}>
              <EditIcon sx={{ mr: 2, color: 'warning.main', fontSize: 20 }} />
              <Typography variant="body2" fontWeight={600}>
                Uredi
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => { handleOpenDeleteModal(); handleClose(); }}>
              <DeleteIcon sx={{ mr: 2, color: 'error.main', fontSize: 20 }} />
              <Typography variant="body2" fontWeight={600}>
                Obriši
              </Typography>
            </MenuItem>
          </>
        )}
      </StyledMenu>

      <PaginationContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25, 50]}
          component="div"
          count={filteredRows.length}
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

