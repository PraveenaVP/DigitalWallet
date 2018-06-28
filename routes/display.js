var express = require('express');
var router = express.Router();

var databasepath = "Database/digitalwallet.db";


/* GET home page. */
router.get('/', function(req, res, next) {

    try {

        var values = getData();

        var arrdata = [];
        values.then(function (result) {
                console.log("result " + result.length);
                for (var i = 0; i < result.length; i++) {
                    var value = {
                        "Cardname": result[i]["cardname"],
                        "Cardnumber": result[i]["cardnumber"],
                        "Expirydate": result[i]["expirydate"],
                        "CVV": result[i]["cvv"]
                    };
                    arrdata.push(value);

                }
                res.render('display', {title: 'Digital Wallet', data: arrdata});

            }
        )
            .catch(err => {
                console.log("Error accessing data from database " + err);
                res.send(err);
            });
    }
    catch (err) {
        next(err);
    }

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


    var dict = [];
    return new Promise(function(resolve,reject)
    {
        //Run the insert statement
        db.serialize(function(){
            db.all("Select * from CardDetails", function(err,rows) {
                if (err) {
                    console.log(err.message);
                    //dbSuccess = false;
                }
                else{
                    // get the last insert id
                    rows.forEach(function (row) {

                       var value = {
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
