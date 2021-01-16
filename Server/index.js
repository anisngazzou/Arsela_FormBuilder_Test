const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const multer = require("multer");
const mongoose  = require("mongoose");
const app = express();
const ImageModel = require('./Models/QuestionImage');
require('dotenv/config')
const cors = require("cors");
const router = require('./Routes/Router')


//Data Base Connextion
mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).then(()=>{console.log("Mongo is here :)")})


//upload
const storage = multer.diskStorage({
  destination: './public',
  filename(req, file, cb) {
    cb(null, "google-form-content-questions-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

//middleware
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json({limit : '50mb',extended : true}));
app.use(bodyParser.urlencoded({limit: '50mb',extended : true}));
app.use(express.json());


//routes
app.get('/', async(req, res)=>{
    try{
        var result = await ImageModel.find().lean();
        res.send(result);     
    }catch(e){
        res.send(e);
    }
});


app.post('/', upload.single('myfile'), async(req, res) => {
    const file = req.file; // file  from client
    const meta = req.body; // all other values  from the client
    
    var data = {
        image: req.file.filename
    }
    var newImage = new ImageModel(data);
        await newImage.save().then((docs)=>{
            console.log(docs);
            res.json({image: docs.image,
                host: req.protocol + '://' + req.get('host')})

        });
});

app.use('/api', router);


app.listen(5000,()=>{
    console.log("Arsela Test app listen on port",5000)
 });