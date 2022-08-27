const express = require('express');
const cors = require('cors');

//api to search images (does not use google api)
const  image_finder  =  require("image-search-engine")


const app  = express();
//cors is used to send data to the backend when we have api calls

app.use(cors());
//send data in json format
app.use(express.json());
app.use(express.urlencoded({extended : false}));

const con = require('./dbconnection');

//read from db
app.get('/:id', (req, res) =>{

    //sql query string for chassisCodes
    let sql = 'SELECT chassisCode FROM cars WHERE series = '+ req.params.id;

    //array for chassis codes
    let resultArray = [];
    //array for image urls
    let imageurls = [];

    //doing a query and pushing the chassis codes into an array with a loop,
    //then using image_finder to automatically search for the cars in question.
    
    //mysql query
    let query = con.query(sql, (err, result) =>{
        if(err) throw err;

        for(let i in result){
            resultArray.push([result[i].chassisCode]);
        }


        //image search function (WIP)
        async function searchin(query){
            let imageurl;
            imageurl = (await image_finder.find(query, {size: "Large"}));
            console.log(imageurl);
            
            //can't manage to return the url
            return imageurl; 
            
        }
        //pushing urls inside imageurls array
        resultArray.forEach(element => {
            const searchquery = "BMW" + element;
            imageurls.push(searchin(searchquery));
        });
        
        console.log(imageurls[1]);
    });


    //second query to fech all cars data
    sql = 'SELECT * FROM cars WHERE series = '+ req.params.id;

    query = con.query(sql, (err, result) =>{
        if(err) throw err;
        res.json(result);
    });

});

app.listen(5000);
