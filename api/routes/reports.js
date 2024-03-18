const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

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
      .sort({ date: -1 })
      .then(reports => res.json(reports))
      .catch(err => res.status(404).json({ message: `No reports found` }));
  }
);

// @route GET api/reports/:id
// @desc get report id
// @access Public
// router.get(
//   "/current/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Report.findById(req.params.id)
//       .then(report => res.json(report))
//       .catch(err =>
//         res.status(404).json({ noreportfound: `No report found with id` })
//       );
//   }
// );

// @route DELETE api/reports/:id
// @desc delete report id
// @access Private
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Report.deleteOne({ _id: req.params.id })
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
    // const { errors, isValid } = validateTeamInput(req.body);

    // if (!isValid) {
      // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }
    console.log('req.body',req.body);

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
      .catch(err => res.status(400).json({ reportnotadd: "reportnotadd" }));
  }
);

// @route POST api/reports/update/:id
// @desc update report id
// @access Public
router.post(
  "/update/:id",
  (req, res) => {
    // const { errors, isValid } = validateTeamInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    // Get fields
    // const teamFields = {};

    // if (req.body.country) teamFields.country = req.body.country;
    // if (req.body.info) teamFields.info = req.body.info;

    // Team.findOne({ _id: req.params.id }).then(team => {
    //   if (team) {
    //     // Update
    //     Team.findOneAndUpdate(
    //       { _id: req.params.id },
    //       { $set: teamFields },
    //       { new: true }
    //     ).then(team => res.json(team));
    //   } else {
    //     res.status(400).json(errors);
    //   }
    // });
  }
);

module.exports = router;