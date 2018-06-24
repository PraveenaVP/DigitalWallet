var express = require('express');
var router = express.Router();

var databasepath = "Database/digitalwallet.db";


/* GET home page. */
router.get('/', function(req, res, next) {


    var values = getData();

    arrdata = [];
    values.then(function(result)
        {
            console.log("result " + result.length);
            for(i = 0;i < result.length;i++)
            {
                value = {"cardname" : result[i]["cardname"],
                         "cardnumber" : result[i]["cardnumber"],
                         "expirydate" : result[i]["expirydate"],
                          "cvv" : result[i]["cvv"]
            };
                arrdata.push(value);

            }

            res.render('display', { title: 'Digital Wallet', data:arrdata});

        }
    );

});

function getData()
{
    //Create Database Instance
    var sqlite3 = require('sqlite3').verbose();

    var db = new sqlite3.Database(databasepath, (err) => {
        if (err) {
            console.error(err.message);
        }
        else{
            console.log('Connected to the Digital Wallet database.');
        }

    });


    dict = [];
    return new Promise(function(resolve,reject)
    {
        //Run the insert statement
        db.serialize(function(){
            db.all("Select * from CardDetails", function(err,rows) {
                if (err) {
                    console.log(err.message);
                    dbSuccess = false;
                }
                else{
                    // get the last insert id
                    rows.forEach(function (row) {

                        value = {
                        "cardname" : row.cardname,
                        "cardnumber" : row.cardnumber,
                        "expirydate" : row.expirydate,
                        "cvv" : row.cvv};
                        dict.push(value);
                    });
                }

            });

        });

        //close the database
        db.close(function(err,data){
            if(err){
                console.log(" Error while closing the database "+err);
            }
            else{
                console.log(" Database successfully closed "+ data);
                resolve(dict);
            }

        });
    });


}




module.exports = router;