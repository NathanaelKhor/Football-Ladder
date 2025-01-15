const mongoose = require("mongoose");
const express = require("express");
const PORT_NUMBER = 8080;
const ejs = require('ejs');
let path = require('path')
const Ladder = require('./models/ladder');
const Team = require('./models/team');
const { ObjectId } = require('mongodb');
const app = express();

const url = "mongodb://localhost:27017/Football-Ladder";

app.use(express.static('public/images'));

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * Configures the port number and lets console know the server is up
 * @function
 * @param {int} port - Express Port number
 * @param {function} callback - Express callback
 */
app.listen(PORT_NUMBER, function () {
    console.log(`listening on port ${PORT_NUMBER}`);
  });
  
  async function connect() {
      await mongoose.connect(url);
  }
  connect()
      .catch((err) => console.log(err))


app.get("/", function(req,res){
    res.render('index');
});

app.get("/ladder", async function(req,res){
    let ladders = await Ladder.find({});
    let teams = await Team.find({});
    res.render('ladder', {teams: teams});
});

app.get("/matches", function(req,res){
    res.render('matches');
});

app.get("/results", function(req,res){
    res.render('results');
});

app.get('/add-team', async function(req,res){
    let teams = await Team.find({});
    res.render('add_team', {teams, teams});
});

app.post('/add-team', async function(req,res){
    let name = req.body.name;
    let team = new Team({name: name});
    await team.save()
    res.render('ladder')
});