
var chai  = require('chai');
var chaiHttp = require('chai-http');
var chaiparam = require('chai-param');
var param = chaiparam.param;
var should = chai.should();
var expect = require('chai').expect;
var assert = chai.assert;

var api = "http://localhost:3000";

var index = require('../routes/index');

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
//
// const dom = new JSDOM(``, {
//     url: "http://localhost:3000/add",
//     contentType: "text/html",
//     includeNodeLocations: true
// });




chai.use(chaiHttp);
// chai.use(require('chai-dom'));


describe('Digital Wallet test',() =>{

    //Test Home Page

    it('should return 200 status', function(done){
        chai.request(api)
            .get('/')
            .end(function (err,res) {
                expect(res).to.have.status(200);
                done();
            });

    });

    //Test Adding

    it('adding', function(done){
        chai.request(api)
            .get('/add/save?params={%22cardname%22:%22testfromchai2%22,%22cardnumber%22:%222131231231231231%22,%22carddate%22:%2206/27/2018%22,%22cvv%22:%221231%22}')
            .then(function (res) {
                expect(res).to.have.status(200);
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });

    // Test Display

    it('display', function(done){
        chai.request(api)
            .get('/display')
            .then(function (res) {
                expect(res).to.have.status(200);
                done();
            })
            .catch(function (err) {
                throw err;
            });
    });


});

