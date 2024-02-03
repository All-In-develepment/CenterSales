// import { Button, Container, Dropdown, Menu, Image } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import React from "react";
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";

const pages = ["Horarios", "Maximas", "Ultimos Jogos"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default observer(function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} height={50} />
          Virtual-Analyzer

          <Box sx={{ flexGrow: 1, display: {xs: "flex", md: "none"} }} >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to={"/game-times"} >
                  <Typography textAlign="center">Horarios</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to={"/game-multtimes"} >
                  <Typography textAlign="center">Multi Horarios</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/maximas" >
                  <Typography textAlign="center">Máximas</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/last-games" >
                  <Typography textAlign="center">Últimos Jogos</Typography>
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to={"/game-times"} >
                <Typography textAlign="center" className="menuName">Horarios</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to={"/game-multtimes"} >
                <Typography textAlign="center" className="menuName">Multi Horarios</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to="/maximas" >
                <Typography textAlign="center" className="menuName">Máximas</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink onClick={handleCloseNavMenu} to="/last-games" >
                <Typography textAlign="center" className="menuName">Últimos Jogos</Typography>
              </NavLink>
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.displayName} src={user?.image || "/assets/user.png"} />
              </IconButton>
            </Tooltip>
            <Menu
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
              <MenuItem onClick={handleCloseUserMenu} >
                <Typography textAlign="center">Perfil</Typography>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Typography textAlign="center">Sair</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>  
    </AppBar>
  );
});