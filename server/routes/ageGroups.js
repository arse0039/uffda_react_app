const db = require('../db_config')

exports.data = (req, res) => {
    const ageGroupSelect = 'SELECT * FROM Age_Groups';
    db.query(ageGroupSelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
}

exports.headers = (req, res) => {
    const ageGroupDesc = 'Describe Age_Groups';
    db.query(ageGroupDesc, (err, result) => {
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
    const description = req.body.description;
    const id = req.params.id;

    const ageGroupInsert = "UPDATE Age_Groups SET `description`=? WHERE age_group_id= ?"
    db.query(ageGroupInsert, [description, id], (err, result) => {
        if(err) return result.json(err);
        return res.json("Age Group Successfully Updated")
    });
}

exports.delete = (req, res) => {
    const ageGroupID = req.params.id
    const delQuery = "DELETE FROM Age_Groups WHERE age_group_id = ?"
    db.query(delQuery, [ageGroupID], (err, result) => {
        if(err) return result.json(err);
        return res.json("Age Group Successfully Deleted")
    });
}