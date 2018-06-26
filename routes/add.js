var express = require('express');
var router = express.Router();


var databasepath = "Database/digitalwallet.db";

/* GET users listing. */
router.get('/', function(req, res, next) {
    var port = req.connection.localPort;
    res.render('add', { title: 'Digital Wallet', port:port });
});

router.get('/save', function(req, res, next) {
    console.log("Reachere here");

    let dbSuccess = new Boolean(false);

    //Retrieve the user input values
    if(req.query.params !== null)
    {
        var id = JSON.parse(req.query.params);
        var query = [];
        for(var myKey in id) {
            query.push(id[myKey]);
            //console.log(id[myKey]);
        }


        var insertQuery = 'INSERT INTO CardDetails(cardname,cardnumber,expirydate,cvv) VALUES(?,?,?,?)';
        //Create Database Instance
        var sqlite3 = require('sqlite3').verbose();

        //console.log("Created sqlite3 instance");

        var db = new sqlite3.Database(databasepath, (err) => {
            if (err) {
                console.error(err.message);
            }
            else{
                console.log('Connected to the Digital Wallet database.');
            }

        });


        //Run the insert statement
        db.serialize(function(){
            db.run(insertQuery, [query[0],query[1],query[2],query[3]], function(err) {
                if (err) {
                    console.log(err.message);
                    dbSuccess = false;
                    res.send("0");
                }
                else{
                    // get the last insert id
                    console.log(`A row has been inserted with rowid ${this.lastID}`);
                    //dbSuccess = true;
                    //close the database
                    db.close(function(err,data){
                        if(err){
                            console.log(" Error while closing the database "+err);
                            res.send("0");
                        }
                        else{
                            console.log(" Database successfully closed "+ data);
                            res.send("1");
                        }

                    });


                }

            });

        });

        // //close the database
        // db.close(function(err,data){
        //     if(err){
        //         console.log(" Error while closing the database "+err);
        //     }
        //     else{
        //         console.log(" Database successfully closed "+ data);
        //     }
        //
        // });
        //
        // if(dbSuccess){
        //     res.send("1");
        // }
        // else{
        //     res.send("0");
        // }



    }


});

module.exports = router;
