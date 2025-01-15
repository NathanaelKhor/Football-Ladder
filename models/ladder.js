const mongoose = require('mongoose');

const ladderSchema = mongoose.Schema({
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
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        },
    ],
})

module.exports = mongoose.model("Ladder", ladderSchema);