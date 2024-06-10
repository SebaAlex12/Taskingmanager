const express = require("express");
const router = express.Router();

// Report Model

const Report = require("../models/Reports");

// Validator

// const validateTeamInput = require("../validation/team");

// @route GET api/reports
// @desc get reports
// @access Public
router.get(
  "/",
  (req, res) => {
    Report.find()
      .sort({ date: 1 })
      .then(reports => res.json(reports))
      .catch(err => res.status(404).json({ message: `No reports found` }));
  }
);

// @route GET api/reports/:id
// @desc get report id
// @access Public
// router.get(
//   "/current/:id",
//   (req, res) => {
//     Report.findById(req.params.id)
//       .then(report => res.json(report))
//       .catch(err =>
//         res.status(404).json({ noreportfound: `No report found with id` })
//       );
//   }
// );

// @route POST api/reports
// @desc create report
// @access Private

router.post(
  "/",
  (req, res) => {
    const newReport = new Report({
        userId: req.body.userId,
        date: req.body.date,
        description: req.body.description,
        Marian: req.body.Marian,
        Piotrek: req.body.Piotrek
    });
    newReport
      .save()
      .then(report => res.json(report))
      .catch(error => console.log('error',error))
  }
);

// @route POST api/reports/update
// @desc update report
// @access Private

router.post(
  "/update",
  async(req, res) => {

    const filter = { _id: req.body._id };

    const update = {
        date: req.body.date,
        description: req.body.description,
        Marian: req.body.Marian,
        Piotrek: req.body.Piotrek
    };

    try{
        const report = await Report.findOneAndUpdate(filter, update, { includeResultMetadata: true});
        const newReportFromBase = await Report.findById(req.body._id);
        return res.json(newReportFromBase);
    }catch(error){
        console.log('error',error);
    }

  }
);

// @route DELETE api/reports/delete
// @desc delete report id
// @access Private
router.post(
  "/delete",
  (req, res) => {
    const id = req.body.reportId;
    
    Report.deleteOne({ _id: id })
      .then(report => {
            // const response = res.json(report);
            const response = res.json({id:id})
            return response;
      })
      .catch(error => console.log('error',error));
  }
);

module.exports = router;