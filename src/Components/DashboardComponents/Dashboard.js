import React from 'react';
import auth from '../../FrontServices/auth';
import { fade, makeStyles } from '@material-ui/core/styles';
import NavBar from "../Utils/NavBar"
import Forms from "../FormComponents/Forms";
 
const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
      
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
  

function Dashboard() {
   
    const classes = useStyles();
    const [user, setUser] = React.useState({});
  
    React.useEffect(()=>{
      setUser(auth.getCurrentUser())
    }, [])
  
  
  return (
    <div className={classes.grow}>
        <NavBar  />
   <div style={{display: 'flex', flexGrow: 1, textAlign: 'start'}}>
            <div style={{marginTop:"auto"}}>
                <Forms userId={user.id}/>
            </div>
    </div>

  </div>
  );
}

export default Dashboard;
