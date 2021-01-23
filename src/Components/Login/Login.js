import { GoogleLogin } from 'react-google-login';
import authService from '../../FrontServices/auth';
import { useHistory } from "react-router-dom";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GoogleButton from 'react-google-button'
import {Grid,Typography,Container,Paper} from '@material-ui/core';
import NavBar from "../Utils/NavBar";
const useStyles = makeStyles((theme) => ({
 
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  
 
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://www.arsela.co/wp-content/uploads/animated-landing-01-3-1.svg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
 

  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  buttons : {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  buttongg: {
    backgroundColor: '#7141b1'
  },
  buttong: {
    backgroundColor: '#cc33ff'
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const cards = [];


  const CLIENT_ID = "319755431452-2uufldssp7dloe4n5ifm1sldocesijbc.apps.googleusercontent.com";


function Login(props){
    const classes = useStyles();
    let history = useHistory();
    const [isLogined , setIsLogined] = React.useState(false);
    const { from } = props.location.state || { from: { pathname: '/' } }
    const [user, setUser] = React.useState({})
   

 
  
    React.useEffect(()=>{
        setIsLogined(authService.isAuthenticated())
    }, []);
    
    const loginGoogle = (response)=>{
        console.log(response);
        authService.loginWithGoogle(response)
        .then(() => {
          console.log(from.pathname);
          
          if(from.pathname == "/login"){
            history.push("/");

          }else{
            history.push(from.pathname);
          }
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

  
    const handleLoginFailure = (response)=>{
        console.log('Failed to log in');
    }
    
    
    return(
      
        <div>
            
            < NavBar/>
      
            <main style={{textAlign: 'start' }}>
        <div>
          <Container>
          <br></br>
            <br></br>
            <br></br>
          <Paper className={classes.mainFeaturedPost} >
            {/* Increase the priority of the hero background image */}
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography component="h1" variant="h3" color="inherit"  gutterBottom>
                    Arsela Forms
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                  Votre partenaire technologique pour la transformation digitale
                  </Typography>
                  <div className={classes.buttons}>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                      {isLogined ?
                      "": 
                <GoogleLogin
                    clientId={CLIENT_ID}
                    render={renderProps => (
                        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} style={{textAlign: 'center', alignSelf: 'center'}} />                      
                      )}
                    buttonText='Login'
                    onSuccess={loginGoogle}
                    onFailure={handleLoginFailure}
                    cookiePolicy={ 'single_host_origin' }
                    responseType='code,token'
                />
            }
            </div>
              </div>
                 
             </div>
              </Grid>
            </Grid>
          </Paper>
         
          </Container>
        
        </div>
        </main>
       
        </div>
    )
}

export default Login;