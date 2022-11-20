const db = require('../db_config')

exports.data = (req, res) => {
    const locationSelect = 'SELECT * FROM Locations';
    db.query(locationSelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
}

exports.headers = (req, res) => {
    const locationDesc = 'Describe Locations';
    db.query(locationDesc, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
}

exports.insert = (req, res) => {
    const name = req.body.name;
    const address = req.body.address;

    const locInsert = "INSERT INTO Locations (name, address) VALUES (?, ?)"
    db.query(locInsert, [name, address], (err, result)=> {
        if(err){return result.json(err)}
        return res.json(result)
    });
}

exports.update = (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const id = req.params.id;

    const locInsert = "UPDATE Locations SET `name`=?, `address`=? WHERE location_id= ?"
    db.query(locInsert, [name, address, id], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Location Successfully Updated") 
    });
}

exports.delete = (req, res)=> {
    const locID = req.params.id
    const delQuery = "DELETE FROM Locations WHERE location_id = ?"
    db.query(delQuery, [locID], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Location Successfully Deleted") 
    });
}