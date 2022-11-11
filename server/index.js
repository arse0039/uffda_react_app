
const express = require('express')
const db = require('./db_config');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

// View volunteer data for populating Table
app.get("/volunteers/data", (req,res)=>{
    const volunteerSelect = 'SELECT * FROM volunteers';
    db.query(volunteerSelect, (err, result)=>{
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

// Insert into Volunteer Table
app.post("/volunteers/insert", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;

    const volInsert = "INSERT INTO volunteers (name, email, role) VALUES (?, ?, ?)"
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

    const volInsert = "UPDATE volunteers SET `name`=?, `email`=?, `role`=? WHERE id= ?"
    db.query(volInsert, [name, email, role, id], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Volunteer Successfully Updated") 
    });
});

// Delete Volunteer Table item
app.delete("/volunteers/:id", (req, res)=> {
    // const volID = req.params.id;
    const volID = req.params.id
    const delQuery = "DELETE FROM volunteers WHERE id = ?"
    db.query(delQuery, [volID], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Volunteer Successfully Deleted") 
    })
});


app.listen(PORT, ()=> {
    console.log("Connected to backend!")
});