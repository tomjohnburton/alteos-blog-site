// ! Basic test environment set up

const User = require("../models/User");
const Post = require("../models/Post");
const expect = require("chai").expect; //? Testing framework
const nock = require("nock"); //? HTTP server mocking and expectations library for Node.js
const response = require("./response"); //? response folder
const auth = require("../routes/auth");
const uuidv4 = require("uuid/v4");

var app = require("../app");
var request = require("supertest");
// require("../configs/database");

//let's set up the data we need to pass to the login method
const userCredentials = {
  username: "tom@tom.tom",
  password: "tom"
};
//now let's login the user
var authenticatedUser = request.agent(app);
before(function(done) {
  authenticatedUser
    .post("/login")
    .send(userCredentials)
    .end(function(err, response) {
      console.log(response.status);
      expect(response.status).to.equal(200);
      expect("Location", "/");
      done();
    });
});
//this test says: make a POST to the /login route with the username provided in userCredentials
//after the POST has completed, make sure the status code is 200
//also make sure that the user has been directed to the /home page

describe("GET /", function(done) {
  //addresses 1st bullet point: if the user is logged in we should get a 200 status code
  it("should return a 200 response if the user is logged in", function(done) {
    authenticatedUser.get("/").expect(200, done);
  });
});

let signupCredentials = {
  username: uuidv4() + "@example.com",
  password: "example"
};

before(function(done) {
  authenticatedUser
    .post("/signup")
    .send(signupCredentials)
    .end(function(err, response) {
      console.log(response.status);
      expect(response.status).to.equal(200);
      expect("Location", "/");
      done();
    });
});
//this test says: make a POST to the /login route with the username provided in userCredentials
//after the POST has completed, make sure the status code is 200
//also make sure that the user has been directed to the /home page

describe("GET /", function(done) {
  //addresses 1st bullet point: if the user is logged in we should get a 200 status code
  it("should return a 200 response if the user successfully signed up", function(done) {
    authenticatedUser.get("/").expect(200, done);
  });
});
