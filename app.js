const express =require ( "express");
const bodyParser =require( "body-parser");
const alert = require('alert');
var session=require('express-session')
const app = express();
const bcrypt= require('bcrypt');
const PORT = process.env.PORT || 8080;
const nodemailer = require('nodemailer');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
var username_forgettten_pasword;
flag =false;
var verification_code;
var verificationAttemp=0 ;
const NAME_TO_ROUTE = {
  "leaves of grass": "leaves",
  "the grapes of wrath": "grapes",
  "dune": "dune",
  "lord of the flies": "flies",
  "to kill a mockingbird": "mockingbird",
  "the sun and her flowers": "sun",
}

var { MongoClient } = require('mongodb');

var uri = "mongodb+srv://ahmedyousry:kObQQa3zbeCf81HA@cluster0.xdcsqf0.mongodb.net/?retryWrites=true&w=majority"

var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function main (){
await client.connect();}
const VIEWS_PATH = "./views/books";

main()

///
app.use(session({ secret: "thisismysecrctekeyfhrgfgrfrty84fwir767", saveUninitialized: true, cookie: { maxAge: 1000*60*60*24 }, resave: false }));
//setting view engine to ejs
app.set("view engine", "ejs");

var session;
app.get('/', function (req, res) {

//  req.session.destroy(); session = req.session; res.redirect('login', { errormsg: "" })
res.redirect('/login')
});
app.get('/login', async function (req, res){
res.render('login');
})

app.post('/login', async function (req, res) {
  var x = req.body.username;
  var y = req.body.password;

  if (x&&y) {
    var user= await client.db('firstdb').collection('firstcollection').findOne({username:x});
    if (user)
    {
      const password = await bcrypt.compare(y,user.password);
      if (password)
      {
        session = req.session; session.userid = req.body.username; flag=true; res.redirect('/home'); 
      }
      else
      {
        alert("Wrong username or password");
        res.render('login', { errormsg: "Wrong username or password" }); 
  
      }

    }
    else 
    {

      res.render('login', { errormsg: "Wrong username or password" }); 
      alert("Wrong username or password");
    }
  } 
  else { res.render('login', { errormsg: "Must enter username and password" }); }
});



//route for search page
app.post("/search", function (req, res) {
  const { Search } = req.body;
  const SearchArr = Search.split(" ");
  console.log(req.body);
  const books = [
    { name: "dune", path: "dune" },
    { name: "lord of the flies", path: "flies" },
    { name: "the grapes of wrath", path: "grapes" },
    { name: "leaves of grass", path: "leaves" },
    { name: "to kill a mockingbird", path: "mockingbird" },
    { name: "the sun and her flowers", path: "sun" },
  ];
  
  const booksList = books.filter((book) =>
    SearchArr.some((word) => book.name.toLowerCase().includes(word.toLowerCase()))
  )
  console.log(booksList);
  res.render("searchresults", {
    booksList,
  });
});
  

//rou
app.get("/registration", function (req, res) {
  if (req.session.user == null)
    res.render("registration")
  else
app.redirect('/home')
})

app.post("/register",async function (req, res) {

  var x = req.body.username;
  var y = req.body.password;
  var z = req.body.email;
  const salt = await bcrypt.genSalt();
  y=await bcrypt.hash(y,salt);
  if (y === null || x === null) {
    alert('please enter your full data')
  }
  var user = await client.db('firstdb').collection('firstcollection').findOne({username:x});
  var user2 = await client.db('firstdb').collection('firstcollection').findOne({email:z});
  var insertUser = { username: x, password: y, email:z ,books: [""] };

  if (user2 !=null)
  {
           alert("the email is taken")
  }
  else if (user !=null) {
    alert('the user name is taken');
  }

  else  {

    client.db('firstdb').collection('firstcollection').insertOne(insertUser);
    res.redirect('/login');
  }

});

//route for poetry page
app.get("/poetry", function (req, res) {
  if (req.session.userid == null)
  {
    alert("Please login first");
    res.redirect('/login');
  }
  else
  {
    res.render('poetry');
  }
});

//route for sun page
app.get("/sun", function (req, res) {
  if (req.session.userid == null)
  {
    alert('Please Login first'); 
    res.redirect("/login");
   
    
  }
  else
  {
  res.render("sun", {errormsg: ''});
  }
});

//route for leaves page
app.get("/leaves", function (req, res) {
  if (req.session.userid == null)
  {
    
    res.redirect("login");
    alert('Please Login first');
    
  }
  else
  {
  res.render("leaves", {errormsg: ''});
  }
});

//route for novel page
app.get("/novel", function (req, res) {
  if (req.session.userid == null)
  {
    
    res.redirect("login");
    alert('Login first');
    
  }
  else
  {
  res.render("novel", {errormsg: ''});
  }
});

//route for grapes page
app.get("/grapes", function (req, res) {
  if (req.session.userid == null)
  {
    
    res.redirect("login");
    alert('Login first');
    
  }
  else
  res.render("grapes", {errormsg: ''});
});

//route for flies page
app.get("/flies", function (req, res) {
  if (req.session.userid == null)
  {
    
    res.redirect("login");
    alert('Login first');
    
  }
  else
  res.render("flies", {errormsg: ''});
});

//route for fiction page
app.get("/fiction", function (req, res) {
  if (req.session.userid == null)
  {
    
    res.redirect("login");
    alert('Login first');
    
  }
  else
  res.render("fiction", {errormsg: ''});
});

//route for mockingbird page
app.get("/mockingbird", function (req, res) {
  if (req.session.userid == null)
  {
    
    res.redirect("login");
    alert('Login first');
    
  }
  else
  res.render("mockingbird", {errormsg: ''});
});

//route for dune page
app.get("/dune", function (req, res) {
  if (req.session.userid == null)
  {
    
    res.redirect("login");
    alert('Login first');
    
  }
  else
  res.render("dune", {errormsg: ''});
});


app.get('/home',function(req,res){
  if (req.session.userid == null)
  {
    
    res.redirect("login");
    alert('Login first');
    
  }
else 
res.render('home',{username:req.session.userid}

)})
//route to code_verification
app.get('/code_verification',function(req,res)
{

  res.render("code_verification")
});


//route to email
app.get('/enter_mail',function(req,res)
{
res.render("enter_mail")
});
app.get('/readlist', async function(req, res, next) {
  const userInfo = await client.db('firstdb').collection('firstcollection').findOne({username:req.session.userid});
  const { books } = userInfo;
  console.log(books);
  const booksWithRoutes = books.map((element) => {
    return {name: element, route: (NAME_TO_ROUTE[element])}
  });
  res.render('readlist',{books: booksWithRoutes});
});

app.post('/dune', async function(req,res){
  var userwant = await client.db('firstdb').collection('firstcollection').findOne({username: req.session.userid, books: "dune"});
  if(userwant){
    res.render('dune', {errormsg: "Already in readlist"});
  }
  else{
    client.db('firstdb').collection('firstcollection').updateOne( {username: req.session.userid}, {$push: {books: "dune"}});
    res.render('dune', {errormsg: "Added successfully"});
  }
});

app.post('/flies', async function(req,res){
  var userwant = await client.db('firstdb').collection('firstcollection').findOne({username: req.session.userid, books: "lord of the flies"});
  if(userwant){
    res.render('flies', {errormsg: "Already in readlist"});
  }
  else{
    client.db('firstdb').collection('firstcollection').updateOne( {username: req.session.userid}, {$push: {books: "lord of the flies"}});
    res.render('flies', {errormsg: "Added successfully"});
  }
});

app.post('/sun', async function(req,res){
  var userwant = await client.db('firstdb').collection('firstcollection').findOne({username: req.session.userid, books: "the sun and her flowers"});
  if(userwant){
    res.render('sun', {errormsg: "Already in readlist"});
  }
  else{
    client.db('firstdb').collection('firstcollection').updateOne( {username: req.session.userid}, {$push: {books: "the sun and her flowers"}});
    res.render('sun', {errormsg: "Added successfully"});
  }
});

app.post('/mockingbird', async function(req,res){
  var userwant = await client.db('firstdb').collection('firstcollection').findOne({username: req.session.userid, books: "to kill a mockingbird"});
  if(userwant){
    res.render('mockingbird', {errormsg: "Already in readlist"});
  }
  else{
    client.db('firstdb').collection('firstcollection').updateOne( {username: req.session.userid}, {$push: {books: "to kill a mockingbird"}});
    res.render('mockingbird', {errormsg: "Added successfully"});
  }
});

app.post('/grapes', async function(req,res){
  var userwant = await client.db('firstdb').collection('firstcollection').findOne({username: req.session.userid, books: "the grapes of wrath"});
  if(userwant){
    res.render('grapes', {errormsg: "Already in readlist"});
  }
  else{
    client.db('firstdb').collection('firstcollection').updateOne( {username: req.session.userid}, {$push: {books: "the grapes of wrath"}});
    res.render('grapes', {errormsg: "Added successfully"});
  }
});

app.post('/leaves', async function(req,res){
  let userwant = await client.db('firstdb').collection('firstcollection').findOne({username: req.session.userid, books: "leaves of grass"});
  console.log(userwant)
  if(userwant){
    res.render('leaves', {errormsg: "Already in readlist"});
  }
  else{
    client.db('firstdb').collection('firstcollection').updateOne( {username: req.session.userid}, {$push: {books: "leaves of grass"}});
    res.render('leaves', {errormsg: "Added successfully"});
  }
});
app.get('/forget_password',function(req,res)
{
res.render('forget_password');
});

app.post('/enter_mail', async function(req,res){
  var Client_email= req.body.email;
  var check =await client.db('firstdb').collection('firstcollection').findOne({email:Client_email});
  console.log(check);
  username_forgettten_pasword=check.username;
  var code = Math.floor(Math.random()*90000) + 10000;
  verification_code=code;
  if (check)
  {
    
const mailTransporter = nodemailer.createTransport({
 // host: "smtp.mailtrap.io",
 // port: 2525,

  service: 'gmail',

  auth: {

      user: 'ahmedyousry2002@gmail.com',

      pass: 'iyvdmcrfejnbkyji'

  }
});

const mailDetails = {

  from: 'ahmedyousry2002@gmail.com',

  to: Client_email,

  subject: 'Change password',

 
  html:' <p> Hey '+check.username+',<br>'+'<p> Change Password requires further verification <br> your Verification code:'+code+'<p> <br> <br> Thanks, <br> Ahmed_yousryBookStore'

};


mailTransporter.sendMail(mailDetails, function(err, data) {
  
  if(err) {

     res.send('Error Occurs');

  } else {
    alert("Check your mail an email sent to you with a verification ");
      res.redirect('/code_verification');
      res.send('Email sent successfully');


  }
}


);
  }
  else
  {
    res.render('/enter_mail')
    alert('The email does not exist')
  }
});
app.post('/forget_password', async function(req,res)
{
  var new_password = req.body.newPassword;
  var confirm_password = req.body.confirmPassword;
  var user =await client.db('firstdb').collection('firstcollection').findOne({username:username_forgettten_pasword});
  const passwordd = await bcrypt.compare(new_password,user.password);
  
  if (new_password==confirm_password)
  {
        if (passwordd)
        {
          alert("please enter a new password");
          res.render('forget_password');
        }
        else 
        {
          const salt = await bcrypt.genSalt();
          const newEncryptedPassword=await bcrypt.hash(new_password,salt);
          client.db('firstdb').collection('firstcollection').updateOne( {username:username_forgettten_pasword}, {$set:{password: newEncryptedPassword}});
          res.redirect('/login');
        }
  }
  else 
  {
    alert('The new password is not identical to the confirmed password');
    res.render('forget_password');

  }


  
});

app.listen(PORT, () => {
  console.log("Server is running on port 8080 ");
});


app.post('/code_verification', async function (req, res) {
console.log(verification_code);
  var x = req.body.verficationCode;
  
  if (x==verification_code)
  {
    verificationAttemp=0;
    res.redirect('/forget_password');
  }
  else
  {
    verificationAttemp=verificationAttemp+1; 
    if (verificationAttemp==3)
    {
      verificationAttemp=0;
      res.redirect('/login');
    }
    else
    {
    
      console.log(verificationAttemp);
    alert('Wrong verification number');
    res.render('code_verification');
    }
  }
});
