const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    away: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    homeGoals: {
        type: Number,
        required: true
    },
    awayGoals: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Match", matchSchema);