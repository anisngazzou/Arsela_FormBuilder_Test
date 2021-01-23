import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import { Paper, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import QuestionsTab from './QuestionsTab';
import ResponseTab from './ResponseTab';
import formService from '../../FrontServices/form';
import auth from '../../FrontServices/auth';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      // minHeight: 128,
      alignItems: 'flex-start',
   
     
    },
    title: {
      flexGrow: 1,
      alignSelf: 'flex-end',
      justifySelf: 'center'
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      display: 'flex',
      alignContent: 'space-between',
      alignItems: 'center'
  }
    
  }));



function EditForm(props) {
  let history = useHistory();
  const classes = useStyles();
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
   

    
      history.push("/");

  }

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


    React.useEffect(() => {
        var formId = props.match.params.formId
        if(formId !== undefined){
          setFormID(formId)
          formService.getForm(formId)
          .then((data) => { 
             // console.log(data);     
              setFormDetails(data)       
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
    },[props.match.params.formId]);


    return (
        <div>
          { formDeatils.createdBy === user.id ? (
            <div>
            <div >
            <AppBar position="relative" style={{backgroundColor: '#3a6186',background: 'linear-gradient(to right, #89253e, #3a6186)'}}> 
                    <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" noWrap style={{marginTop: '8.5px', color:'white'}}>
                    <EditIcon />
                    {formDeatils.name}
                    </Typography>
                    <Tabs
                    className={classes.title}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="white"
                    centered
                >
                    <Tab label="Questions" />
                    <Tab label="Responses" />
                </Tabs>
                    <IconButton aria-label="search"  color="white" onClick={sendForm}>
                        <SendIcon style={{color: 'white'}}/>
                    </IconButton>
                
                    <IconButton aria-label="search" onClick={home}>
                        <HomeIcon  style={{color: 'white'}}/>
                    </IconButton>
                   
                    <IconButton  edge="end"
                     edge="end"
                     aria-label="logout"
                     
                     onClick={logout}>
                        <ExitToAppIcon style={{color: 'white'}} />
                    </IconButton>
                   
                    </Toolbar>
                </AppBar>
            </div>
            <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              
            >
              <DialogTitle id="alert-dialog-title">{"Copy and share link."}</DialogTitle>
              <DialogContent>
              <Paper className={classes.paper}>
                  <Grid container alignContent="space-between" alignItems="center">
                      <Grid item>
                          <Typography variant="body1">{window.location.origin + "/s/" + formDeatils._id}</Typography>
                      </Grid>
                      <Grid item>
                          <IconButton className={classes.button} aria-label="Add" size="medium" onClick={clipToClipboard} color="white" ><FilterNoneIcon /></IconButton>
                      </Grid>
                  </Grid>
              </Paper>
                <DialogContentText id="alert-dialog-description">
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="white">
                   Cancel
                </Button>
                
              </DialogActions>
            </Dialog>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={openOfAlert}
              autoHideDuration={3000}
              onClose={handleCloseOfAlert}
              message="Copied to clipboard"
              action={
                <React.Fragment>
                 
                  <IconButton size="small" aria-label="close" color="white" onClick={handleCloseOfAlert}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
            </div>

        <div>
            <TabPanel value={value} index={0}>
              <QuestionsTab formData={formDeatils} /> 
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ResponseTab formData={formDeatils} formId={formID} /> 
            </TabPanel>
           
        </div>
        </div>
          ) : (
            <p>you're not the owner of the form</p>
          )}
        </div>
    );
}

export default EditForm;

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };


 
  
