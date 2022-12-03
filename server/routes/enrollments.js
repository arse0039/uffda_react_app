const db = require('../db_config')

exports.data = (req, res) => {
    const enrollmentSelect = 
    `SELECT enrollment_id,
    Participants.name as participant_id,
    Activity_Enrollments.participant_id as real_participant,
    Activities.name as activity_id,
    Activity_Enrollments.activity_id as real_activity
    FROM Activity_Enrollments
    LEFT JOIN Participants ON Participants.participant_id = Activity_Enrollments.participant_id
    LEFT JOIN Activities ON Activities.activity_id = Activity_Enrollments.activity_id`
    ;
    db.query(enrollmentSelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
}
 
exports.headers = (req, res) => {
    const enrollmentDesc = 'Describe Activity_Enrollments';
    db.query(enrollmentDesc, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
}

exports.insert = (req, res) => {
    const participant = req.body.participant_id;
    const activity = req.body.activity_id;

    const activityInsert = "INSERT INTO Activity_Enrollments (participant_id, activity_id) VALUES (?, ?)"
    db.query(activityInsert, [participant, activity], (err, result)=> {
        if(err){return result.json(err)}
        return res.json(result)
    });
}

exports.update = (req, res) => {
    const participant = req.body.participant_id;
    const activity = req.body.activity_id;
    const id = req.params.id;

    const participantInsert = "UPDATE Activity_Enrollments SET `participant_id`=?, `activity_id`=? WHERE enrollment_id= ?"
    db.query(participantInsert, [participant, activity, id], (err, result) => {
        if(err) return result.json(err);
        return res.json("Enrollment Successfully Updated")
    });
}

exports.delete = (req, res) => {
    const enrollmentID = req.params.id
    const delQuery = "DELETE FROM Activity_Enrollments WHERE enrollment_id = ?"
    db.query(delQuery, [enrollmentID], (err, result) => {
        if(err) return result.json(err);
        return res.json("Enrollment Successfully Deleted")
    });
}