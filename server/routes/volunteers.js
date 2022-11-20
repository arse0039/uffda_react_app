const db = require('../db_config')

exports.data = (req,res)=>{
    const volunteerSelect = 'SELECT * FROM Volunteers';
    db.query(volunteerSelect, (err, result)=>{
        if(err) {return result.json(err)}
        return res.json(result)
    });
}

exports.headers = (req,res)=>{
    const volunteerDesc = 'Describe Volunteers';
    db.query(volunteerDesc, (err, result)=>{
        if(err) {return result.json(err)}
        return res.json(result)
    });
}

exports.insert = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;

    const volInsert = "INSERT INTO Volunteers (name, email, role) VALUES (?, ?, ?)"
    db.query(volInsert, [name, email, role], (err, result)=> {
        if(err){return result.json(err)}
        return res.json(result)
    });
}

exports.update = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const id = req.params.id;

    const volInsert = "UPDATE Volunteers SET `name`=?, `email`=?, `role`=? WHERE volunteer_id= ?"
    db.query(volInsert, [name, email, role, id], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Volunteer Successfully Updated") 
    });
}

exports.delete = (req, res)=> {
    // const volID = req.params.id;
    const volID = req.params.id
    const delQuery = "DELETE FROM Volunteers WHERE volunteer_id = ?"
    db.query(delQuery, [volID], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Volunteer Successfully Deleted") 
    });
}