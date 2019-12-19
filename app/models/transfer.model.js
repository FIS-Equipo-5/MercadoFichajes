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

    TransferSchema.methods.cleanup = function() {
        return {_id: this._id, origin_team_id: this.origin_team_id, destiny_team_id: this.destiny_team_id, transfer_date: this.transfer_date,
            contract_years: this.contract_years, cost: this.cost , player_id: this.player_id};
    }

module.exports = mongoose.model('Transfer', TransferSchema);