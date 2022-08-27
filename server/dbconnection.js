const mysql = require('mysql');

const connection = mysql.createConnection({
    host            : 'localhost',
    port            : '3306',
    user            : 'root',
    password        : '',
    database        : 'bmw_wiki'
})

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
connection.connect((err) =>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log('db ' + connection.state);
    }
})

module.exports = connection