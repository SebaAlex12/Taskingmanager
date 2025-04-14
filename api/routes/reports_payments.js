const express = require('express');

const router = express.Router();

const Settings = require('../config/Settings');

const ReportsPayments = require('../models/Reports_payments');

router.get('/',async(req, res) => {
    try{
        const response = await ReportsPayments.find({ year: Settings.reportYear });
        res.json(response);
    }catch(error){
        res.status(500).json({message:error});
    }

});

router.post('/',async(req, res) => {
    try{
        console.log('req body',req.body);
        const data = req.body;

        const date = new Date();

        const fullYear = date.getFullYear();
        const month = parseInt(date.getMonth());
        const day = parseInt(date.getDate());
        
        // const month = parseInt(date.getMonth()) < 10 ? `0${date.getMonth()}` : date.getMonth();
        // const day = parseInt(date.getDay()) < 10 ? `0${date.getDay()}` : date.getDay();

        const presentDateFormat = `${fullYear}-${month}-${day}`;

        const reqData = {
            userId: data.userId,
            month: data.month,
            year: 2025,
            sendedDate: presentDateFormat,
            description: data.description,
            sendedBy: data.sendedBy,
            approvedBy: data.approvedBy,
            MarianPrice: data.MarianPrice,
            PiotrekPrice: data.PiotrekPrice
          }

          const ReportsPaymentsObject = new ReportsPayments(reqData);

          const response = await ReportsPaymentsObject.save();

          res.json(response);

    }catch(error){
        console.log('error',error.toString());
        res.status(500).json({message:error});
    }
});

module.exports = router;