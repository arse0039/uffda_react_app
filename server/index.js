
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

// Update Volunteer Table item
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

// Delete Volunteer Table item
app.delete("/volunteers/:id", (req, res)=> {
    // const volID = req.params.id;
    const volID = req.params.id
    const delQuery = "DELETE FROM Volunteers WHERE volunteer_id = ?"
    db.query(delQuery, [volID], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Volunteer Successfully Deleted") 
    })
});


app.listen(PORT, ()=> {
    console.log("Connected to backend!")
});