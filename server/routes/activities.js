const db = require('../db_config')

exports.data = (req, res) => {
    const activitySelect = 'SELECT * FROM Activities';
    db.query(activitySelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
}

exports.headers = (req, res) => {
    const activityDesc = 'Describe Activities';
    db.query(activityDesc, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
}

exports.insert = (req, res) => {
    const location = req.body.location_id;
    const volunteer = req.body.volunteer_id;
    const ageGroup = req.body.age_group_id;
    const name = req.body.name;
    const description = req.body.description;
    const maxPart = req.body.max_participants;

    const activityInsert = 
    `INSERT INTO Activities (
        location_id, 
        volunteer_id, 
        age_group, 
        name, 
        description, 
        max_participants
        ) 
    VALUES (?, ?, ?, ?, ?, ?)`
    db.query(activityInsert, [location, volunteer, ageGroup, name, description, maxPart], (err, result)=> {
        if(err){return result.json(err)}
        return res.json(result)
    });
}

exports.update = (req, res) => {
    const location = req.body.location_id;
    const volunteer = req.body.volunteer_id;
    const ageGroup = req.body.age_group_id;
    const name = req.body.name;
    const description = req.body.description;
    const maxPart = req.body.max_participants;
    const id = req.params.id;

    const participantInsert = 
        `UPDATE Activities 
        SET location_id=?, 
        volunteer_id=?, 
        age_group=?, 
        name=?, 
        description=?, 
        max_participants=? 
        WHERE activity_id= ?`

    db.query(participantInsert, [location, volunteer, ageGroup, name, description, maxPart, id], (err, result) => {
        if(err) return result.json(err);
        return res.json("Activity Successfully Updated")
    });
}

exports.delete = (req, res) => {
    const activityID = req.params.id
    const delQuery = "DELETE FROM Activities WHERE activity_id = ?"
    db.query(delQuery, [activityID], (err, result) => {
        if(err) return result.json(err);
        return res.json("Activity Successfully Deleted")
    });
}