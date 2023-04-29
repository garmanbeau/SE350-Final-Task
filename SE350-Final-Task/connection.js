//this file handles the connection between the app and the server
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json({type:'application/json', limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));
app.use(express.json());

const conn = mysql.createConnection({

  host:'localhost',
  user:'wpuser',
  password:'password',
  database:'wpdb',

});

const server = app.listen(3000, function(){
  const host = server.address().address
  const port = server.address().port
});

conn.connect(function(error){
 if(error){
    console.log(error);
 } else{
    console.log("connected");
 }
});
//gets all accounts in the DB
app.get('/accounts', function(req, res){
  conn.query('select * from users', function(error, rows, fields){
    if(error){
      console.log(error);
    }else{
      console.log(rows);
      res.send(rows);
    }
  });
});

//adds user into db
app.post('/acc', (req, res) => {

  const email = req.body.email;
  const fName = req.body.first_name;
  const lName = req.body.last_name;
  const pass = req.body.passwd;
  conn.query('INSERT INTO users  (email, first_name, last_name, passwd) values (?, ?, ?, ?)', 
  [email, fName, lName, pass], (err, result) => {
      if(err) {
        console.log(err)
      } else {
        res.send("Values Inserted");
      }
    }
  )
});