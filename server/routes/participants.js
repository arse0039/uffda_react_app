const db = require('../db_config')

exports.data = (req, res) => {
    const participantSelect = 
    `SELECT participant_id, 
    Participants.age_group_id as age_ID,
    Age_Groups.description as age_group_id, 
    name, 
    address 
    FROM Participants 
    LEFT JOIN Age_Groups 
    ON Participants.age_group_id = Age_Groups.age_group_id`
    ;
    db.query(participantSelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
}

exports.headers = (req, res) => {
    const participantDesc = 'Describe Participants';
    db.query(participantDesc, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
}

exports.insert = (req, res) => {
    const ageGroup = req.body.age_group_id;
    const name = req.body.name;
    const address = req.body.address;
    const id = req.params.id;

    const participantInsert = "INSERT INTO Participants (age_group_id, name, address) VALUES (?, ?, ?)"
    db.query(participantInsert, [ageGroup, name, address], (err, result) => {
        if(err){return result.json(err)}
        return res.json(result)
    });
}

exports.update = (req, res) => {
    const ageGroup = req.body.age_group_id;
    const name = req.body.name;
    const address = req.body.address;
    const id = req.params.id;

    const participantInsert = "UPDATE Participants SET `age_group_id`=?, `name`=?, `address`=? WHERE participant_id= ?"
    db.query(participantInsert, [ageGroup, name, address, id], (err, result) => {
        if(err) return result.json(err);
        return res.json("Participant Successfully Updated")
    });
}

exports.delete = (req, res) => {
    const participantID = req.params.id
    const delQuery = "DELETE FROM Participants WHERE participant_id = ?"
    db.query(delQuery, [participantID], (err, result) => {
        if(err) return result.json(err);
        return res.json("Participant Successfully Deleted")
    });
}