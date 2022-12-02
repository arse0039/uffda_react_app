const db = require('../db_config')

exports.data = (req, res) => {
    const activitySelect = 
    `SELECT activity_id, 
    Locations.name as location_id, 
    Volunteers.name as volunteer_id, 
    Age_Groups.description as age_group, 
    Activities.name, Activities.description, max_participants 
    FROM Activities 
    LEFT JOIN Locations ON Activities.location_id = Locations.location_id
    LEFT JOIN Volunteers ON Activities.volunteer_id = Volunteers.volunteer_id
    LEFT JOIN Age_Groups ON Activities.age_group = Age_Groups.age_group_id`
    ;
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
    const ageGroup = req.body.age_group;
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
    const ageGroup = req.body.age_group;
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