import React from 'react';
import auth from '../../FrontServices/auth';
import formService from '../../FrontServices/form';
import { fade, makeStyles,AppBar,Toolbar,IconButton,Typography,InputBase,MenuItem,Menu} from '@material-ui/core';
 import {Search,ExitToApp,MoreVert,Add} from '@material-ui/icons';

 import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ViewListIcon from '@material-ui/icons/ViewList';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
        
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      
      
      
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));
  

function NavBar() {
    let history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
   
    
    const [formEdit, setFormEdit] = React.useState(false);
    const [formTitle, setFormTitle] = React.useState("");
    const [formDescription, setFormDescription] = React.useState("");

    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState({})
    const [formID, setFormID] = React.useState("");
  
  
    const [formDeatils, setFormDetails] = React.useState({});
    const [openOfAlert, setOpenOfAlert] = React.useState(false);
  
    React.useEffect(()=>{
      setUser(auth.getCurrentUser);  
  }, [])
  
    const clipToClipboard = ()=>{
      navigator.clipboard.writeText(window.location.origin + "/s/" + formDeatils._id)
      handleClickOfAlert();
      handleClose();
    }
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
     const handleClickOfAlert = () => {
    setOpenOfAlert(true);
  };
  const logout =()=>{
    var logoutConfirmation = window.confirm("Really want to logout?");

    if(logoutConfirmation){
      auth.logout();
      history.push("/login");
    }
  }
  const home =()=>{
   
const handleCloseOfAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenOfAlert(false);
  };


  function sendForm(){
    handleClickOpen(); 
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    // React.useEffect(() => {
    //     var formId = props.match.params.formId
    //     if(formId !== undefined){
    //       setFormID(formId)
    //       formService.getForm(formId)
    //       .then((data) => { 
    //          // console.log(data);     
    //           setFormDetails(data)       
    //          },
    //          error => {
    //          const resMessage =
    //              (error.response &&
    //              error.response.data &&
    //              error.response.data.message) ||
    //              error.message ||
    //              error.toString();
    //              console.log(resMessage);
    //          }
    //      );
    //     }
    // },[props.match.params.formId]);



     
 

    
  


    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const home =()=>{
   

    
      history.push("/");

  }

    const logout =()=>{
      var logoutConfirmation = window.confirm("Really want to logout?");

      if(logoutConfirmation){
         auth.logout();
        history.push("/login");
      }
    }

  
  
    
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
   
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>EXIT</MenuItem>
        <MenuItem onClick={handleMenuClose}>Create</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleClickOpen}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
           
              <Add />
          
          </IconButton>
          <p>Create </p>
        </MenuItem>

        <MenuItem>
          <IconButton
            aria-label="account of current user"
            color="inherit"
          >
            <ExitToApp />
          </IconButton>
          <p>EXIT</p>
        </MenuItem>
      </Menu>
    );
   
    const isAuthenticated = auth.isAuthenticated();
  

    
  return (
    
    <div className={classes.grow}>
       <div style={{display: 'flex', flexGrow: 1, textAlign: 'start'}}>
        <AppBar position="relative" style={{backgroundColor: '#3a6186',background: 'linear-gradient(to right, #89253e, #3a6186)'}}> 
       
        <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        aria-label="Rohit Saini's form"
                        style={{color: '#140078'}}
                        
                    >
                        <ViewListIcon />
                    </IconButton>
                  
                    <IconButton
                        aria-label="Rohit Saini's form" 
                    >
                        <StarBorderIcon />
                    </IconButton>
                    

                    <Tabs
                    className={classes.title}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Questions" />
                    <Tab label="Responses" />
                </Tabs>
                    <IconButton aria-label="search" onClick={sendForm}>
                        <SendIcon />
                    </IconButton>
                
                    <IconButton aria-label="search" onClick={home}>
                        <HomeIcon />
                    </IconButton>
                   
                   
                    
                    <IconButton  edge="end"
                     edge="end"
                     aria-label="logout"
                     
                     onClick={logout}>
                        <ExitToAppIcon />
                    </IconButton>
                   
                    </Toolbar> </AppBar>
      </div> 
    {renderMobileMenu} 
    {renderMenu}
    </div>
  );

                }
}

export default NavBar();