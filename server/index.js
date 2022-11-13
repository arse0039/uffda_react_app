
const express = require('express')
const db = require('./db_config');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 10725;

/////////////////////////////////////
///// VOLUNTEERS TABLE CRUDS
/////////////////////////////////////

/************* GET *************/
// View volunteer data for populating Table
app.get("/volunteerData", (req,res)=>{
    const volunteerSelect = 'SELECT * FROM Volunteers';
    db.query(volunteerSelect, (err, result)=>{
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

app.get("/volunteerCol", (req,res)=>{
    const volunteerDesc = 'Describe Volunteers';
    db.query(volunteerDesc, (err, result)=>{
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

// View Locations data for populating table
app.get("/locationData", (req, res) => {
    const locationSelect = 'SELECT * FROM Locations';
    db.query(locationSelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

app.get("/locationCol", (req, res) => {
    const locationDesc = 'Describe Locations';
    db.query(locationDesc, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

// View Age Group Data for Populating Table
app.get("/ageGroupData", (req, res) => {
    const ageGroupSelect = 'SELECT * FROM Age_Groups';
    db.query(ageGroupSelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

app.get("/ageGroupCol", (req, res) => {
    const ageGroupDesc = 'Describe Age_Groups';
    db.query(ageGroupDesc, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});


/************* POST *************/
// Insert into Volunteer Table
app.post("/volunteersInsert", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;

    const volInsert = "INSERT INTO Volunteers (name, email, role) VALUES (?, ?, ?)"
    db.query(volInsert, [name, email, role], (err, result)=> {
        if(err){return result.json(err)}
        return res.json(result)
    });
})

// Insert into Location Table
app.post("/locationsInsert", (req, res) => {
    const name = req.body.name;
    const address = req.body.address;

    const locInsert = "INSERT INTO Locations (name, address) VALUES (?, ?)"
    db.query(locInsert, [name, address], (err, result)=> {
        if(err){return result.json(err)}
        return res.json(result)
    });
})

// Insert into Age Groups Table
app.post("/ageGroupInsert", (req, res) => {
    const description = req.body.description;

    const ageGroupInsert = "INSERT INTO Age_Groups (description) VALUES (?)"
    db.query(ageGroupInsert, [description], (err, result) => {
        if(err){return result.json(err)}
        return res.json(result)
    });
});


/************* PUT *************/
// Update Volunteer Table record
app.put("/volunteers/:id", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const id = req.params.id;

    const volInsert = "UPDATE Volunteers SET `name`=?, `email`=?, `role`=? WHERE volunteer_id= ?"
    db.query(volInsert, [name, email, role, id], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Volunteer Successfully Updated") 
    });
});

// Update Location Table record
app.put("/locations/:id", (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const id = req.params.id;

    const locInsert = "UPDATE Locations SET `name`=?, `address`=? WHERE location_id= ?"
    db.query(locInsert, [name, address, id], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Location Successfully Updated") 
    });
});

// Update Age Groups Table record
app.put("/ageGroups/:id", (req, res) => {
    const description = req.body.description;

    const ageGroupInsert = "UPDATE Age_Groups SET `description`=? WHERE age_group_id= ?"
    db.query(ageGroupInsert, [description, id], (err, result) => {
        if(err) return result.json(err);
        return res.json("Age Group Successfully Updated")
    });
});


/************* DELETE *************/
// Delete Volunteer Table record
app.delete("/volunteers/:id", (req, res)=> {
    // const volID = req.params.id;
    const volID = req.params.id
    const delQuery = "DELETE FROM Volunteers WHERE volunteer_id = ?"
    db.query(delQuery, [volID], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Volunteer Successfully Deleted") 
    })
});

// Delete Location Table record
app.delete("/locations/:id", (req, res)=> {
    const locID = req.params.id
    const delQuery = "DELETE FROM Locations WHERE location_id = ?"
    db.query(delQuery, [locID], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Location Successfully Deleted") 
    })
});

// Delete Age Group record
app.delete("/ageGroups/:id", (req, res) => {
    const ageGroupID = req.params.id
    const delQuery = "DELETE FROM Age_Groups WHERE age_group_id = ?"
    db.query(delQuery, [ageGroupID], (err, result) => {
        if(err) return result.json(err);
        return res.json("Age Group Successfully Deleted")
    });
});


app.listen(PORT, ()=> {
    console.log("Connected to backend!")
});