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
        const data = req.body;

        const reqData = {
            userId: data.userId,
            month: data.month,
            year: 2025,
            sendedDate: data.sendedDate,
            description: data.description,
            sendedBy: data.sendedBy,
            approvedBy: data.approvedBy,
            salary: data.salary
          }

          const ReportsPaymentsObject = new ReportsPayments(reqData);
          const response = await ReportsPaymentsObject.save();

          res.json(response);

    }catch(error){
        console.log('error',error.toString());
        res.status(500).json({message:error});
    }
});

router.post(
  "/update",
  async(req, res) => {

    const filter = { _id: req.body.paymentId };

    const update = {
        description: req.body.description ? req.body.description : '',
        approvedBy: req.body.approvedBy
    };

    try{
        const ReportsPaymentsObject = await ReportsPayments.findOneAndUpdate(filter, update, { includeResultMetadata: true});
        const response = await ReportsPayments.findById(req.body.paymentId);
        return res.json(response);
    }catch(error){
        console.log('error',error.toString());
        res.status(500).json({message:error});
    }

  }
);


module.exports = router;