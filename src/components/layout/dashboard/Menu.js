import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Avatar,
  Tooltip,
  styled,
} from '@mui/material';
import {
  People as PeopleIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Quiz as QuizIcon,
  CreditScore as CreditScoreIcon,

  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuthenticated } from "./../../../store/store";

const drawerWidth = 280;
const collapsedWidth = 80;

const StyledDrawer = styled(Drawer)(({ theme, open, isMobile }) => ({
  width: open ? drawerWidth : collapsedWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : collapsedWidth,
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    border: 'none',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    position: 'fixed',
    height: '100vh',
    zIndex: 1300,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
      `,
      pointerEvents: 'none',
    },
  },
  ...(isMobile && {
    '& .MuiDrawer-paper': {
      width: open ? drawerWidth : 0,
    },
  }),
}));

const LogoContainer = styled(Box)(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  minHeight: '80px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  },
}));

const LogoIcon = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  marginRight: theme.spacing(1.5),
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
  fontSize: '1.5rem',
  fontWeight: 700,
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  // margin: theme.spacing(0.5, 1.5),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: active
      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
      : 'transparent',
    borderRadius: theme.spacing(2),
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(8px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    '&::before': {
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
    },
  },
  ...(active && {
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: '60%',
      background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '2px 0 0 2px',
    },
  }),
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.9)',
  minWidth: '18px',
  justifyContent: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: '1.4rem',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
  },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 500,
    fontSize: '0.95rem',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  },
}));

const UserSection = styled(Box)(({ theme, open }) => ({
  marginTop: 'auto',
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.9)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)',
  },
  transition: 'all 0.3s ease',
}));

const Menu = ({ open, handleToggle, isMobile }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const role = useSelector((state) => state.auth.role);
  const name = useSelector((state) => state.auth.name);
  const surname = useSelector((state) => state.auth.surname);

  const adminLinks = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Korisnici', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Ispiti', icon: <QuizIcon />, path: '/admin/quiz' },
    { text: 'Rezultati', icon: <CreditScoreIcon />, path: '/admin/scores' },
    { text: 'Profil', icon: <PersonIcon />, path: '/admin/profile' },
  ];

  const teacherLinks = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/teacher/dashboard' },
    { text: 'Ispiti', icon: <QuizIcon />, path: '/teacher/quiz' },
    { text: 'Studenti', icon: <PeopleIcon />, path: '/teacher/students' },
    { text: 'Rezultati', icon: <CreditScoreIcon />, path: '/teacher/scores' },
    { text: 'Profil', icon: <PersonIcon />, path: '/teacher/profile' },
  ];

  const studentLinks = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/student/dashboard' },
    { text: 'Ispiti', icon: <QuizIcon />, path: '/student/quiz' },
    { text: 'Rezultati', icon: <CreditScoreIcon />, path: '/student/scores' },
    { text: 'Profil', icon: <PersonIcon />, path: '/student/profile' },
  ];

  const getLinks = (role) => {
    if (role === 'admin') return adminLinks;
    if (role === 'teacher') return teacherLinks;
    return studentLinks;
  };

  const menuItems = getLinks(role);
  const currentPath = location.pathname;

  // Function to check if a menu item is active
  const isActive = (itemPath) => {
    return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
  };

  function handleLogout() {
    dispatch(setIsAuthenticated(false));
    return <Navigate to='/' />;
  }

  return (
    <StyledDrawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={open}
      onClose={handleToggle}
      isMobile={isMobile}
    >
      <LogoContainer open={open}>
        <LogoIcon>
          <QuizIcon />
        </LogoIcon>
        {open && (
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 700,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                fontSize: '1.1rem'
              }}
            >
              Online Test
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Platform
            </Typography>
          </Box>
        )}
        <CloseButton
          onClick={handleToggle}
          size="small"
        >
          {open ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
        </CloseButton>
      </LogoContainer>

      <List sx={{ flex: 1, py: 2 }}>
        {menuItems?.map((item) => (
          <Tooltip
            key={item.text}
            title={!open ? item.text : ""}
            placement="right"
            arrow
          >
            <StyledListItem
              button
              component={Link}
              to={item.path}
              active={isActive(item.path) ? 1 : 0}
            >
              <StyledListItemIcon>
                {item.icon}
              </StyledListItemIcon>
              {open && (
                <StyledListItemText primary={item.text} />
              )}
            </StyledListItem>
          </Tooltip>
        ))}
      </List>

      <UserSection open={open}>
        {open ? (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.main',
                  mr: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}
              >
                {`${name?.charAt(0) || 'U'}${surname?.charAt(0) || 'S'}`}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {`${name || 'User'} ${surname || 'Name'}`}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textTransform: 'capitalize',
                    fontSize: '0.75rem'
                  }}
                >
                  {role || 'User'}
                </Typography>
              </Box>
            </Box>

            <StyledListItem
              button
              onClick={handleLogout}
              sx={{
                mt: 1,
                '&:hover': {
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  '&::before': {
                    background: 'rgba(244, 67, 54, 0.1)',
                  },
                },
              }}
            >
              <StyledListItemIcon>
                <LogoutIcon />
              </StyledListItemIcon>
              <StyledListItemText primary="Odjava" />
            </StyledListItem>
          </Box>
        ) : (
          <Tooltip title="Odjava" placement="right" arrow>
            <IconButton
              onClick={handleLogout}
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                width: '100%',
                '&:hover': {
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                },
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        )}
      </UserSection>
    </StyledDrawer>
  );
};

export default Menu;
