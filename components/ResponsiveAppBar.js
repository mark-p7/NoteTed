import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image'
import Router from 'next/router'
import { useUser } from "../context/userContext.js"
import { styled } from '@mui/material'
import { useRouter } from 'next/router';

const MenuItemCustom = styled(MenuItem)({
  '&:hover': {
    background: 'white'
  }
});

export const NavbarButton = styled(Button)({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: '400',
  borderRadius: '0px',
  letterSpacing: '3px',
  color: '#1E1E1E',
  cursor: 'pointer',
  position: 'relative',
  padding: '7.5px 30px',
  background: 'white',
  fontSize: '15px',
  transition: 'all 0.2s',
  boxShadow: 'none',
  '&:hover': {
    color: 'white',
    background: '#1E1E1E',
    boxShadow: 'none'
  }
});

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { loadingUser, user, signOutOfUser } = useUser()
  const router = useRouter()

  let pages = [];
  pages.push(<>
    <NavbarButton
      variant='contained'
      onClick={() => router.push("/note")}
    >
      Add Note
    </NavbarButton>

  </>)
  pages.push(<>
    <NavbarButton
      variant='contained'
      onClick={() => { handleSignOut() }}
    >
      Log Out
    </NavbarButton>
  </>)

  const handleSignOut = async () => {
    try {
      await signOutOfUser()
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' }
              }}
            >
              <Image src="/images/MiniLogo.png" alt="Logo" width="56.24" height="56.24" style={{ cursor: 'pointer' }} onClick={() => Router.push('/dashboard')} />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                {pages.map((page, index) => (
                  <MenuItemCustom key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      {page}
                    </Typography>
                  </MenuItemCustom>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                margin: '5px',
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
              }}
            >
              <Image src="/images/MiniLogo.png" alt="Logo" width="56.24" height="56.24" style={{ cursor: 'pointer' }} onClick={() => Router.push('/')} />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                <Box
                  key={index}
                  sx={{ m: 2, color: 'black', display: 'block' }}
                >
                  <Typography style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: '400',
                    letterSpacing: '0px',
                  }}>
                    {page}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
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

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
