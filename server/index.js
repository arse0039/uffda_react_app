
const express = require('express')
const db = require('./db_config');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 10725;


/************* GET *************/
// View volunteer data for populating Table
app.get("/volunteerData", (req,res)=>{
    const volunteerSelect = 'SELECT * FROM Volunteers';
    db.query(volunteerSelect, (err, result)=>{
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

app.get("/volunteerCol", (req,res)=>{
    const volunteerDesc = 'Describe Volunteers';
    db.query(volunteerDesc, (err, result)=>{
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

// View Locations data for populating table
app.get("/locationData", (req, res) => {
    const locationSelect = 'SELECT * FROM Locations';
    db.query(locationSelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

app.get("/locationCol", (req, res) => {
    const locationDesc = 'Describe Locations';
    db.query(locationDesc, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

// View Age Group Data for Populating Table
app.get("/ageGroupData", (req, res) => {
    const ageGroupSelect = 'SELECT * FROM Age_Groups';
    db.query(ageGroupSelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

app.get("/ageGroupCol", (req, res) => {
    const ageGroupDesc = 'Describe Age_Groups';
    db.query(ageGroupDesc, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

// View Participant Data for Populating Table
app.get("/participantData", (req, res) => {
    const participantSelect = 
    `SELECT participant_id, age_groups.description as age_group_id, name, address 
    FROM participants 
    INNER JOIN age_groups 
    ON participants.age_group_id = age_groups.age_group_id`
    ;
    db.query(participantSelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

app.get("/participantCol", (req, res) => {
    const participantDesc = 'Describe Participants';
    db.query(participantDesc, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});


/************* POST *************/
// Insert into Volunteer Table
app.post("/volunteersInsert", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;

    const volInsert = "INSERT INTO Volunteers (name, email, role) VALUES (?, ?, ?)"
    db.query(volInsert, [name, email, role], (err, result)=> {
        if(err){return result.json(err)}
        return res.json(result)
    });
});

// Insert into Location Table
app.post("/locationsInsert", (req, res) => {
    const name = req.body.name;
    const address = req.body.address;

    const locInsert = "INSERT INTO Locations (name, address) VALUES (?, ?)"
    db.query(locInsert, [name, address], (err, result)=> {
        if(err){return result.json(err)}
        return res.json(result)
    });
});

// Insert into Age Groups Table
app.post("/ageGroupInsert", (req, res) => {
    const description = req.body.description;

    const ageGroupInsert = "INSERT INTO Age_Groups (description) VALUES (?)"
    db.query(ageGroupInsert, [description], (err, result) => {
        if(err){return result.json(err)}
        return res.json(result)
    });
});

// Insert into Participants Table
app.post("/participantsInsert", (req, res) => {
    const ageGroup = req.body.age_group_id
    const name = req.body.name
    const address = req.body.address
    
    const participantInsert = "INSERT INTO Participants (age_group_id, name, address) VALUES (?, ?, ?)"
    db.query(participantInsert, [ageGroup, name, address], (err, result) => {
        if(err){return result.json(err)}
        return res.json(result)
    });
});


/************* PUT *************/
// Update Volunteer Table record
app.put("/volunteers/:id", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const id = req.params.id;

    const volInsert = "UPDATE Volunteers SET `name`=?, `email`=?, `role`=? WHERE volunteer_id= ?"
    db.query(volInsert, [name, email, role, id], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Volunteer Successfully Updated") 
    });
});

// Update Location Table record
app.put("/locations/:id", (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const id = req.params.id;

    const locInsert = "UPDATE Locations SET `name`=?, `address`=? WHERE location_id= ?"
    db.query(locInsert, [name, address, id], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Location Successfully Updated") 
    });
});

// Update Age Groups Table record
app.put("/ageGroups/:id", (req, res) => {
    const description = req.body.description;
    const id = req.params.id;

    const ageGroupInsert = "UPDATE Age_Groups SET `description`=? WHERE age_group_id= ?"
    db.query(ageGroupInsert, [description, id], (err, result) => {
        if(err) return result.json(err);
        return res.json("Age Group Successfully Updated")
    });
});

//Update Participant Table record
app.put("/participants/:id", (req, res) => {
    const ageGroup = req.body.age_group_id;
    const name = req.body.name;
    const address = req.body.address;
    const id = req.params.id;

    const participantInsert = "UPDATE Participants SET `age_group_id`=?, `name`=?, `address`=? WHERE participant_id= ?"
    db.query(participantInsert, [ageGroup, name, address, id], (err, result) => {
        if(err) return result.json(err);
        return res.json("Participant Successfully Updated")
    });
});



/************* DELETE *************/
// Delete Volunteer Table record
app.delete("/volunteers/:id", (req, res)=> {
    // const volID = req.params.id;
    const volID = req.params.id
    const delQuery = "DELETE FROM Volunteers WHERE volunteer_id = ?"
    db.query(delQuery, [volID], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Volunteer Successfully Deleted") 
    });
});

// Delete Location Table record
app.delete("/locations/:id", (req, res)=> {
    const locID = req.params.id
    const delQuery = "DELETE FROM Locations WHERE location_id = ?"
    db.query(delQuery, [locID], (err, result)=> {
        if(err) return result.json(err);
        return res.json("Location Successfully Deleted") 
    });
});

// Delete Age Group record
app.delete("/ageGroups/:id", (req, res) => {
    const ageGroupID = req.params.id
    const delQuery = "DELETE FROM Age_Groups WHERE age_group_id = ?"
    db.query(delQuery, [ageGroupID], (err, result) => {
        if(err) return result.json(err);
        return res.json("Age Group Successfully Deleted")
    });
});

// Delete Participant record
app.delete("/participants/:id", (req, res) => {
    const participantID = req.params.id
    const delQuery = "DELETE FROM Participants WHERE participant_id = ?"
    db.query(delQuery, [participantID], (err, result) => {
        if(err) return result.json(err);
        return res.json("Participant Successfully Deleted")
    });
});


/***********Activities Queries (to be moved to separate file) **************/

// View Activity Data for Populating Table
app.get("/activityData", (req, res) => {
    const activitytSelect = 'SELECT * FROM Activities';
    db.query(activitytSelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

app.get("/activityCol", (req, res) => {
    const activityDesc = 'Describe Activities';
    db.query(activityDesc, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});


// Insert into Activity Table
app.post("/activitiesInsert", (req, res) => {
    const location = req.body.location_id;
    const volunteer = req.body.volunteer_id;
    const ageGroup = req.body.age_group_id;
    const name = req.body.name;
    const description = req.body.description;
    const maxPart = req.body.max_participants;

    const activityInsert = "INSERT INTO Activities (location_id, volunteer_id, age_group, name, description, max_participants) VALUES (?, ?, ?, ?, ?, ?)"
    db.query(activityInsert, [location, volunteer, ageGroup, name, description, maxPart], (err, result)=> {
        if(err){return result.json(err)}
        return res.json(result)
    });
});


//Update Activity Table record
app.put("/activities/:id", (req, res) => {
    const location = req.body.location_id;
    const volunteer = req.body.volunteer_id;
    const ageGroup = req.body.age_group_id;
    const name = req.body.name;
    const description = req.body.description;
    const maxPart = req.body.max_participants;
    const id = req.params.id;

    const participantInsert = "UPDATE Activities SET `location_id`=?, `volunteer_id`=?, `age_group`=?, `name`=?, `description`=?, `max_participants`=? WHERE activity_id= ?"
    db.query(participantInsert, [location, volunteer, ageGroup, name, description, maxPart, id], (err, result) => {
        if(err) return result.json(err);
        return res.json("Activity Successfully Updated")
    });
});


// Delete Activity record
app.delete("/activities/:id", (req, res) => {
    const activityID = req.params.id
    const delQuery = "DELETE FROM Activities WHERE activity_id = ?"
    db.query(delQuery, [activityID], (err, result) => {
        if(err) return result.json(err);
        return res.json("Activity Successfully Deleted")
    });
});



/********************************************/


/***********Enrollments Queries (to be moved to separate file) **************/

// View Enrollment Data for Populating Table
app.get("/enrollmentData", (req, res) => {
    const enrollmentSelect = 'SELECT * FROM Activity_Enrollments';
    db.query(enrollmentSelect, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});

app.get("/enrollmentCol", (req, res) => {
    const enrollmentDesc = 'Describe Activity_Enrollments';
    db.query(enrollmentDesc, (err, result) => {
        if(err) {return result.json(err)}
        return res.json(result)
    });
});


// Insert into Activity_Enrollments Table
app.post("/enrollmentsInsert", (req, res) => {
    const participant = req.body.participant_id;
    const activity = req.body.activity_id;

    const activityInsert = "INSERT INTO Activity_Enrollments (participant_id, activity_id) VALUES (?, ?)"
    db.query(activityInsert, [participant, activity], (err, result)=> {
        if(err){return result.json(err)}
        return res.json(result)
    });
});


//Update Activity_Enrollments Table record
app.put("/enrollments/:id", (req, res) => {
    const participant = req.body.participant_id;
    const activity = req.body.activity_id;
    const id = req.params.id;

    const participantInsert = "UPDATE Activity_Enrollments SET `participant_id`=?, `activity_id`=? WHERE enrollment_id= ?"
    db.query(participantInsert, [participant, activity, id], (err, result) => {
        if(err) return result.json(err);
        return res.json("Enrollment Successfully Updated")
    });
});


// Delete Activity_Enrollments record
app.delete("/enrollments/:id", (req, res) => {
    const enrollmentID = req.params.id
    const delQuery = "DELETE FROM Activity_Enrollments WHERE enrollment_id = ?"
    db.query(delQuery, [enrollmentID], (err, result) => {
        if(err) return result.json(err);
        return res.json("Enrollment Successfully Deleted")
    });
});



/********************************************/


app.listen(PORT, ()=> {
    console.log("Connected to backend!")
});