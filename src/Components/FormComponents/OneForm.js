import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';


const useStyles = makeStyles((theme)=>
    ({
        root: {
          maxWidth: 345,
         borderRadius: '10px',
        },
        media: {
          height: 140,
          
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
          
          },
      })
);


export default function OneForm(props) {
    const classes = useStyles();

    const [form, setForm] = React.useState({})


    React.useEffect(()=>{
        //console.log(props.formData)
        setForm(props.formData)
    }, [props.formData])

    return (
       
        <Grid item  xs={12} sm={6} md={3}>
                    <Card className={classes.root} >
                        <CardActionArea href={"/form/"+form._id}  >
                            <CardMedia
                            
                            className={classes.media}
                            image="https://github.com/anisngazzou/e-cole/blob/master/0%20(2).jpg?raw=true"
                            style={{backgroundSize: 'cover'}}
                           

                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'center'}} >
                               {form.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'center'}}>
                               {form.description}
                            </Typography>
                            
                            
                            
                            </CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                           Opened:  <Moment fromNow>{form.updatedAt}</Moment>
                            </Typography>
                        </CardActionArea>
                    
                    </Card>
                </Grid>            
        
    )
}
