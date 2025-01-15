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
        required: true
    },
    goalsFor: {
        type: Number,
        required: true
    },
    goalsAgainst: {
        type: Number,
        required: true
    },
    goalDifference: {
        type: Number
    }
})

module.exports = mongoose.model("Team", teamSchema);