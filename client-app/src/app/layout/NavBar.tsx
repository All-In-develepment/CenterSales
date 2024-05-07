// import { Button, Container, Dropdown, Menu, Image } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import React from "react";
import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";

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
    <AppBar position="static" className="main_header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} height={50} />
          <span className="title">Pulse</span>

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
                <NavLink to={"/projects"} >
                  <Typography textAlign="center" className="subheadingFont">Pojetos</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to={"/sellers"} >
                  <Typography textAlign="center">Vendedores</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/sales" >
                  <Typography textAlign="center">Vendas</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/registers" >
                  <Typography textAlign="center">Cdastros</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/products" >
                  <Typography textAlign="center">Produtos</Typography>
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to={"/projects"} >
                <Typography textAlign="center" className="menuName">Projetos</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to={"/sellers"} >
                <Typography textAlign="center" className="menuName">Vendedores</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to="/sales" >
                <Typography textAlign="center" className="menuName">Vendas</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to="/registers" >
                <Typography textAlign="center" className="menuName">Cadastros</Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <NavLink to="/products" >
                <Typography textAlign="center" className="menuName">Produtos</Typography>
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