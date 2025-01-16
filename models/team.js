const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
        validate: {
			validator: function (newVal) {
				return newVal.length >= 5 && newVal.length <= 20;
			},
			message: "Team name should be between 5 and 20 characters long",
		},
    },
    gamesPlayed: {
        type: Number,
        required: true,
        default: 0
    },
    wins: {
        type: Number,
        required: true,
        default: 0
    },
    losses: {
        type: Number,
        required: true,
        default: 0
    },
    draws: {
        type: Number,
        required: true,
        default: 0
    },
    goalsFor: {
        type: Number,
        required: true,
        default: 0
    },
    goalsAgainst: {
        type: Number,
        required: true,
        default: 0
    },
    goalDifference: {
        type: Number,
        required: true,
        default: 0
    },
    points: {
        type: Number,
        required: true,
        default: 0
    }
});




module.exports = mongoose.model("Team", teamSchema);