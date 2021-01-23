import React from 'react';
import auth from '../../FrontServices/auth';
import formService from '../../FrontServices/form';
import { fade, makeStyles,AppBar,Toolbar,IconButton,Typography,InputBase,MenuItem,Menu} from '@material-ui/core';
import {Search,ExitToApp,MoreVert,Add} from '@material-ui/icons';
import {DialogTitle,DialogContentText,DialogContent,DialogActions,Dialog,Button,TextField} from '@material-ui/core';
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
    const [open, setOpen] = React.useState(false);
    
    const [formEdit, setFormEdit] = React.useState(false);
    const [formTitle, setFormTitle] = React.useState("");
    const [formDescription, setFormDescription] = React.useState("");

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

     
    const [user, setUser] = React.useState({})
    React.useEffect(()=>{
      if (auth.isAuthenticated()){setUser(auth.getCurrentUser())}
    }, []);

    
  


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

    const cancelAddForm = ()=>{
      handleClose();
      setFormTitle("");
      setFormDescription("");
    }
   

    const createForm = ()=>{
      var data = {
        name : formTitle,
        description: formDescription,
        createdBy: user.id
      }
      if (data.name !=="") {
        formService.createForm(data)
        .then((result) => { 
          console.log(result);
          history.push("/form/"+result._id);
          
           },

           error => {
           const resMessage =
               (error.response &&
               error.response.data &&
               error.response.data.message) ||
               error.message ||
               error.toString();
               console.log(resMessage);
           }
       );
      } 
    }
  
    
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
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
      >{console.log(user)}
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
  
if (isAuthenticated) {
    
  return (
    
    <div className={classes.grow}>
       <div style={{display: 'flex', flexGrow: 1, textAlign: 'start'}}>
        <AppBar position="relative" style={{backgroundColor: '#3a6186',background: 'linear-gradient(to right, #89253e, #3a6186)'}}> 
        {console.log(formEdit)}
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            {<img style={{position: 'relative',width: 160}} src="https://www.arsela.co/wp-content/uploads/arsela-technologies-white.svg" alt="gg" />}
            </Typography>
           
            <div className={classes.search}>
            { console.log(isAuthenticated)}
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />


        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
        
          <IconButton aria-label="Create new form" color="inherit" onClick={handleClickOpen}> 
          <Add />
          
          </IconButton>
         
          <IconButton
            edge="end"
            aria-label="logout"
            color="inherit"
             onClick={logout}
          >
            <ExitToApp/>
          </IconButton>
        </div>

        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreVert />
          </IconButton>
        </div>
          
          </Toolbar>
        </AppBar>
      </div> 
    {renderMobileMenu} 
    {renderMenu}
    <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">New Form</DialogTitle>
              <DialogContent>
                <DialogContentText>
                 Welcome to Arsela Form Builder ,just add form name , description and Click Create to Contniue the Process.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Form Name"
                  type="text"
                  fullWidth={false}
                  value={formTitle} 
                  onChange={(e)=>{setFormTitle(e.target.value)}}
                /> 
                <br></br>
                <TextField
                  autoFocus
                  margin="dense"
                  id="description"
                  label="Form description"
                  type="text"
                  fullWidth
                  value={formDescription} 
                  onChange={(e)=>{setFormDescription(e.target.value)}}
                /> 
                <br></br>
              </DialogContent>
              <DialogActions>
                <Button onClick={cancelAddForm} color="primary">
                  Cancel
                </Button>
                <Button onClick={createForm} color="primary">
                  Create
                </Button>
              </DialogActions>
            </Dialog>   
            </div>
  </div>
  );

}else{
    return (
        <div className={classes.grow}>
        <div style={{display: 'flex', flexGrow: 1, textAlign: 'start'}}>
        { console.log(isAuthenticated)}
         <AppBar position="relative" style={{backgroundColor: '#3a6186',background: 'linear-gradient(to right, #89253e, #3a6186)'}}>
           <Toolbar>
             <Typography variant="h6" color="inherit" noWrap className={classes.title}>
             {<img style={{position: 'relative',width: 160}} src="https://www.arsela.co/wp-content/uploads/arsela-technologies-white.svg" alt="gg" />}
             </Typography>
           
         <div className={classes.grow} />
         <div className={classes.sectionDesktop}>
                 
         </div>
 
         <div className={classes.sectionMobile}>
           <IconButton
             aria-label="show more"
             aria-controls={mobileMenuId}
             aria-haspopup="true"
             onClick={handleMobileMenuOpen}
             color="inherit"
           >
             <MoreVert />
           </IconButton>
         </div>
           
           </Toolbar>
         </AppBar>
       </div> 
     {renderMobileMenu} 
     {renderMenu}
   
   </div>
   
    );
   
  }
}

export default NavBar;
