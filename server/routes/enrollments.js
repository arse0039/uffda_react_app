const db = require('../db_config')

exports.data = (req, res) => {
    const enrollmentSelect = 'SELECT * FROM Activity_Enrollments';
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