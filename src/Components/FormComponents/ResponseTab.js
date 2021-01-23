import React from 'react'
import formService from '../../FrontServices/form';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Doughnut} from 'react-chartjs-2';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    maxWidth: 345,
   borderRadius: '10px',
  },
});



function ResponseTab(props) {
  const classes = useStyles();

  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
      if(props.formData){
       // console.log(props.formData.questions.length);
        setQuestions(props.formData.questions)

        setFormData(props.formData)
      }
      var formId = props.formId
      if(formId !== undefined && formId !== ""){
        formService.getResponse(formId)
        .then((data) => { 
      //      console.log(data);     
            setResponseData(data)
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
    },[props.formId, props.formData]);



const ola=[];
responseData.map((res, i)=>(
  ola.push(res.response.map((r)=>(r.optionId)))
  ))
const oId =[];
  questions.map((ques, i)=>(
    oId[i]=ques.options.map((opt)=>(opt.optionText))
    ))

const odd =[];
questions.map((ques, i)=>(
  odd[i]=ques.options.map((opt)=>(opt._id))
  ))


   

    function getSelectedOption(qId, i, j){
      var oneResData = responseData[j];      
      var selectedOp = oneResData.response.filter(qss => qss.questionId === qId);
    //  console.log(selectedOp);

      if(selectedOp.length > 0){

        var finalOption = questions[i].options.find(oo => oo._id === selectedOp[0].optionId);
        
   
        return finalOption.optionText
      } else{
        return "not attempted"
      }

      
    }
   

  

function foo(arr) {
  var a = []
   
for (var i = 0; i < arr.length; i++) {
    for(var j = 0; j < arr[i].length; j++) {
    
    a.push(arr[i][j]);

  }
  }
  return a;
}

     

  function maxDuplicateCount(_arr){
    const res=[];
    const temp={};
    const uniqueArrayKeyToCompare = Array.from(new Set(_arr));
    let compareKey='';
    console.log('Individually Count');
    uniqueArrayKeyToCompare.forEach((unqKey,i)=>{
      const filterOutArray = _arr.filter((key)=>key===unqKey);
      temp.name = unqKey;
      temp.count = filterOutArray.length;
      res[i]=[temp.name,temp.count]
     
    });
    return res;
    }
// console.log(maxDuplicateCount((foo(ola))));
 

const r=maxDuplicateCount(foo(ola));
console.log(r);



function Zen(i){
  const data1 = {
    
    labels: [],
    datasets: [{
      data: [20,23,12,4],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#3AA2ZB',
      '#32EB'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#3AA2ZB',
        '#32EB'
        
      ]
    }]
  };

  data1.labels=oId[i];
   

return data1;
}

  return (
       <div>
          
          {/* {console.log(questions.length)} */}
          <div>
        <div>
          {questions.map((ques, i)=>(
                  <TableCell key={i} align="right"><Doughnut key={i}data={Zen(i)} /><h2>{ques.questionText}</h2></TableCell>  
                    ))}</div>
            <TableContainer component={Paper}>
              
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><h2>User</h2></TableCell>
                    {questions.map((ques, i)=>(
                      <TableCell key={i} align="right"><h3>{ques.questionText}</h3></TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
              
                  {responseData.map((rs, j) => (
                    <TableRow key={j}>
                      <TableCell component="th" scope="row">
                        {rs.userId}
                      </TableCell>
                      {questions.map((ques, i)=>(
                      <TableCell key={i} align="right">{getSelectedOption(ques._id, i,j)}
                        </TableCell> ))}
                    </TableRow>
                  ))}
               
                </TableBody>
                
              </Table>

            </TableContainer>
            <div>
       
        
    
          
                  
     
                      
                 
    </div>
          </div>



       </div>
  );
}
export default ResponseTab







