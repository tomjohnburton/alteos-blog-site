// ! Basic test environment set up

const expect = require("chai").expect; //? Testing framework
const uuidv4 = require("uuid/v4");

var app = require("../app");
var request = require("supertest");
// require("../configs/database");

//let's set up the data we need to pass to the login method
const userCredentials = {
  username: "admin_test",
  password: "test"
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
  // it("should return a 200 response confirming that a post has been created", function(done) {
  //   authenticatedUser
  //     .post("/api/post/create-post")
  //     .send({ title: "Test", content: "testpost" })
  //     .expect(200, done);
  // });
});

let username = uuidv4();
let signupCredentials = {
  username: username,
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

// Delete the test user afterwards

after(function(done) {
  authenticatedUser
    .post("/user-delete-test")
    .send({ username })

    .end(function(err, response) {
      expect(response.status).to.equal(200, done);
      done();
    });
});
