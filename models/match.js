const mongoose = require('mongoose');

const ladderSchema = mongoose.Schema({
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
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        },
    ],
})

module.exports = mongoose.model("Ladder", ladderSchema);