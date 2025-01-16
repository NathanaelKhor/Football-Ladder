const mongoose = require("mongoose");
const express = require("express");
const PORT_NUMBER = 8080;
const ejs = require('ejs');
let path = require('path')
const Ladder = require('./models/ladder');
const Team = require('./models/team');
const Match = require('./models/match');
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
    res.render('add-team', {teams, teams});
});

app.post('/add-team', async function(req,res){
    let name = req.body.name;
    let team = new Team({name: name});
    await team.save()
    let teams = await Team.find({});
    res.render('ladder', {teams: teams});
});

app.get('/log-match', async function(req,res){
    let teams = await Team.find({});
    res.render('log-match', {teams, teams});
});

app.post('/log-match', async function(req,res){
    let homeTeam = await Team.findOne({_id: new ObjectId(req.body.homeTeamId)});
    let awayTeam = await Team.findOne({_id: new ObjectId(req.body.awayTeamId)});
    let homeGoals = req.body.homeGoals
    let awayGoals = req.body.awayGoals
    let match = new Match({home: homeTeam, away: awayTeam, homeGoals: homeGoals, awayGoals: awayGoals})
    await match.save()

    if (homeGoals > awayGoals){
        await Team.updateOne({_id: homeTeam._id}, {$inc: {wins: 1, gamesPlayed: 1, goalsFor: homeGoals, goalsAgainst: awayGoals, points: 3}})
        await Team.updateOne({_id: awayTeam._id}, {$inc: {losses: 1, gamesPlayed: 1, goalsFor: awayGoals, goalsAgainst: homeGoals}})
    }
    else if (homeGoals < awayGoals){
        await Team.updateOne({_id: homeTeam._id}, {$inc: {losses: 1, gamesPlayed: 1, goalsFor: homeGoals, goalsAgainst: awayGoals}})
        await Team.updateOne({_id: awayTeam._id}, {$inc: {wins: 1, gamesPlayed: 1, goalsFor: awayGoals, goalsAgainst: homeGoals, points: 3}})
    }
    else if (homeGoals == awayGoals){
        await Team.updateOne({_id: homeTeam._id}, {$inc: {draws: 1, gamesPlayed: 1, goalsFor: homeGoals, goalsAgainst: awayGoals, points: 1}})
        await Team.updateOne({_id: awayTeam._id}, {$inc: {draws: 1, gamesPlayed: 1, goalsFor: awayGoals, goalsAgainst: homeGoals, points: 1}})
    }

    await Team.updateOne({_id: homeTeam._id}, {$inc: {goalDifference: (homeGoals - awayGoals)}})
    await Team.updateOne({_id: awayTeam._id}, {$inc: {goalDifference: (awayGoals - homeGoals)}})

    let teams = await Team.find({})
    res.render('ladder', {teams: teams})
});

