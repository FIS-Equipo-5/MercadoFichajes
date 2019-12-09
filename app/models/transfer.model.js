const mongoose = require('mongoose');

const TransferSchema = mongoose.Schema({
    origin_team_id: {
        type: Number,
        required: true
    },
    destiny_team_id: {
        type: Number,
        required: true
    },
    transfer_date: {
        type: Date,
        required: true
    },
    contract_years: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    player_id: {
        type: Number,
        required: true
    }}
    ,{
        timestamps: true
    });

module.exports = mongoose.model('Transfer', TransferSchema);