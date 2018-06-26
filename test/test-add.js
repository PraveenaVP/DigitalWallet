var chai  = require('chai');
var chaiHttp = require('chai-http');
var add = require('../routes/add');
var display = require("../routes/display");
var sqlite3 = require('sqlite3');

var should = chai.should();

chai.use(chaiHttp);

describe('/get display', () => {




    // it('should save insert data to database and return row id', (done) =>
    //     {
    //
    //         chai.request(add)
    //             .get('/save')
    //             .send({cardname:"AutomatedTest",cardnumber:"1234567891123456",expirydate:"06/25/2018",cvv:"1234"})
    //             .end((err,res) => {
    //                 res.should.have.status(200);
    //                 res.should.be.a('number');
    //             });
    //             done();
    //     });


    it('fetch all database records', (done) =>{
        chai.request(display)
            .get('/')
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.status.should.equal("success");
                res.body[0].should.have.property('cardname');

            });
        done();

    });


});

