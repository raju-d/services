/* eslint-disable react/prop-types */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';

const pages = ['Home','Dashboard'];
const settings = ['Profile', 'Dashboard', 'Logout'];

function Header({onLogout, token}) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  // const [token, setToken] = useState(localStorage.getItem('token'));

  const navigate = useNavigate();

  const handleCloseUserMenu = () => {
    console.log("handle close");
    setAnchorElUser(null);
  };

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout();
    console.log('Navigated to login');
  }

  return (
    <AppBar position="static">
      <Container maxWidth="l">
        <Toolbar disableGutters>
          {token && <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>}
          {token && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  component={Link}
                  to={`/${setting.toLowerCase()}` != '/logout' &&  `/${setting.toLowerCase()}`}
                  onClick={ () => {
                    handleCloseUserMenu();
                    if (setting.toLowerCase() === 'logout') {
                      logout();
                    }else {
                      navigate(`/${setting.toLowerCase()}`);
                    }
                  }
                  }
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;