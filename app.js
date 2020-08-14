//  V A R I A B L E S
var express     =  require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    User    = require('./mongoose'),
    cors        = require('cors'),
    multer      = require('multer');


const PORT = process.env.PORT || 8085;

// U S E  /  S E T T I N G S
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors());

var upload = multer();

//R O U T E S
app.post("/add",upload.single("image"),(req,res)=>{
    console.log(req.file);
    const newUser = {
        fname: req.body.fname,
        lname: req.body.lname, 
        email: req.body.email,
        contact: req.body.contact,
        ImageData: {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            size: req.file.size,
        }
    }
    User.create(newUser,(err,db_res)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            console.log("added to db");
            res.status(200).send("Add successful");
        }
    })
});

app.get("*",(req,res)=>{
    res.send("Nothing here");
});

//  S E R V E R
app.listen(PORT,()=>{
    console.log("server started");
})