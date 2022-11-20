const db = require('../db_config')

exports.data = (req, res) => {
    const participantSelect = 
    `SELECT participant_id, 
    age_groups.description as age_group_id, 
    name, 
    address 
    FROM participants 
    INNER JOIN age_groups 
    ON participants.age_group_id = age_groups.age_group_id`
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
    const description = req.body.description;

    const ageGroupInsert = "INSERT INTO Age_Groups (description) VALUES (?)"
    db.query(ageGroupInsert, [description], (err, result) => {
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