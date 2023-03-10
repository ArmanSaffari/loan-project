import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Tooltip, Grid, Divider, Badge, ThemeProvider} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { getUserPhoto } from 'api/file';
import { useNavigate } from "react-router-dom";
import { navbarTheme } from "components/theme";
import { getMyInfo } from 'api/user';
import { getUnreadMessageCount } from 'api/message';

const pages = [
  {title: 'Membership', path: "/membership"},
  {title: 'Payments', path: "/payments"},
  {title: 'Loans', path: "/loans"},
  {title: 'Guarantees', path: "/guarantees"},
  {title: 'Messages', path: "/messages"}
];

const settings = [
  {title: 'User Account', path: "/userInfo"},
  {title: 'Messages', path: "/messages"},
  {title: 'Dashboard', path: "/dashboard"},
  {title: 'Admin Page', path: "/admin"},
  {title: 'Logout', path: "/"}
];

function ResponsiveAppBar(props) {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [myInfo, setMyInfo] = useState(null);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const navigate = useNavigate();

  useEffect( () => {
    fetchUserPhoto();
    fetchMyInfo();
    fetchUnreadMessage();
  }, [props.updatePage]);
  
  // useEffect(() => {
  //   fetchMessages();
  // }, [props.updatePage]);

  const fetchUserPhoto = async () => {
    const { data } = await getUserPhoto({
        params: {category: "userPhoto"},
        responseType: 'blob'
      });
      const url = (data.size > 0) ? URL.createObjectURL(data) : null;
      setUserPhoto(url);
  };

  const fetchMyInfo = async () => {
    const { data } = await getMyInfo();
    if (data.success == true) {
      setMyInfo(data.value);
    }
  };

  const fetchUnreadMessage = async () => {
    const { data } = await getUnreadMessageCount();
    if (data.success == true) {
      setUnreadMessageCount(data.value);
    } 
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log(event.currentTarget)
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <ThemeProvider theme={navbarTheme}>
      <AppBar>
        <Container maxWidth="lg" className='navbaContainer'>
          <Toolbar disableGutters>
            
            {/* sandwich icon for menu */}
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                className="navbarMenuButton"
              >
                <MenuIcon/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.title}
                    onClick={handleCloseNavMenu}
                  >
                    <Button className="navbarMenuItem"
                      onClick={ () => navigate(page.path) }>{page.title}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>

            </Box>

            {/* Logo */}
            <Box
              sx={{display: 'flex',
              flexGrow: {xs: 1, md: 0},
              justifyContent: 'center',
              alignItems: 'center'}}
              onClick={() => navigate("/dashboard")}
              >
              <img 
              className='navbarLogo'
              src='logos/Kish Financial Institution-darkGray.svg' alt='KFI'
              />
            </Box>
            
            {/* Menu bar */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                className="navbarMenuButtons"
                  key={page.title}
                  href={page.path}
                  onClick={handleCloseNavMenu}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{border: '1pt solid red', p: 0 }}
                className='avatarContainer'>

                  <Badge
                  badgeContent={unreadMessageCount}
                  color="secondary"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}>
                    <Avatar alt="User"
                      src={userPhoto}
                      className='avatar'/>
                  </Badge>

                </IconButton>
              </Tooltip>
              <Menu 
                className="navbarMenu"
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {(myInfo) ? 
                <Grid>

                  <Typography component='div' className='userInfo'>
                    {`${(myInfo).firstName} ${(myInfo).lastName}`}
                  </Typography>

                  <Typography component='div' className='userInfo'>
                    {(myInfo).personnelCode}
                  </Typography>

                  <Typography component='div' className='userInfo'>
                    {`${(myInfo.isActiveUser) ? 'active' : 'inactive' } member`}
                  </Typography>

                  <Divider variant="middle"/>
                  
                </Grid>
                : ''}

                {settings.map((setting) => (
                  <MenuItem
                  
                    key={setting.title}
                    sx={{
                      display: ((setting.path != "/admin") ) ?
                      "block" : 
                      ((localStorage.getItem("isAdmin")) ? "block" : "none" )
                    }}
                    >
                    <Button className="navbarMenuItem"
                      onClick={ () => (setting.title == "Logout") ? handleLogOut() : navigate(setting.path) }>
                      {setting.title}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
              {/* </Grid> */}
            </Box>
            
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;