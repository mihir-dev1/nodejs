const express = require("express");
const router = express.Router();

const Employee = require("../models/employee");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports = router;

// api list

router.get("/list", (req, res) => {
  Employee.find((error, doc) => {
    if (error) {
      console.log("Error in data Get " + error);
    } else {
      res.send(doc);
    }
  });
});

// employee details

router.get("/details/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Employee.findById(req.params.id, (error, doc) => {
      if (error) {
        console.log("Error in data Get Id" + error);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send("Id Not Found " + req.params.id);
  }
});

// post api

router.post("/add", (req, res) => {
  let empData = new Employee({
    name: req.body.name,
    position: req.body.position,
    dept: req.body.dept,
  });
  empData.save((error, doc) => {
    if (error) {
      console.log("Error in data add " + error);
    } else {
      let data = {};
      data["Employee"] = doc;
      data["Message"] = "Employee Add Successfully.";
      res.send(data);
    }
  });
});

// Update employee details

router.put("/update/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    let data = {};
    data["name"] = req.body.name;
    data["position"] = req.body.position;
    data["dept"] = req.body.dept;
    Employee.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true },
      (error, doc) => {
        if (error) {
          console.log("Error in data Update Id" + error);
        } else {
          res.send("Update Employee Successfully");
        }
      }
    );
  } else {
    return res.status(400).send("Id Not Found " + req.params.id);
  }
});

// delete employee details

router.delete("/delete/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Employee.findByIdAndRemove(req.params.id, (error, doc) => {
      if (error) {
        console.log("Error in data Delete Id" + error);
      } else {
        res.send("Delete Employee Successfully");
      }
    });
  } else {
    return res.status(400).send("Id Not Found " + req.params.id);
  }
});
