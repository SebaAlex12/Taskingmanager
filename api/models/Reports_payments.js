const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportsPaymentsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required:true
    },
    sendedDate: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    sendedBy: {
        type: String,
        required: true
    },
    approvedBy: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
});

module.exports = ReportsPayments = mongoose.model("reports_payments", ReportsPaymentsSchema);