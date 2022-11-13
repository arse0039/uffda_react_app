
const express = require('express')
const db = require('./db_config');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 10725;

/************* GET *************/

// View Volunteers data for populating table
app.get("/volunteerData", (req,res)=>{
    const volunteerSelect = 'SELECT * FROM Volunteers';
    db.query(volunteerSelect, (err, result)=>{
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


app.listen(PORT, ()=> {
    console.log("Connected to backend!")
});