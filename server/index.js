const express = require('express')
const db = require('./db_config');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 10725;

const vols = require('./routes/volunteers');
const location = require('./routes/locations');
const participants = require('./routes/participants');
const ageGroup = require('./routes/ageGroups');
const activities = require('./routes/activities');
const enrollments = require('./routes/enrollments');

// Route tree separation code modified from source code found at:
// https://github.com/expressjs/express/tree/master/examples/route-separation

/************* Volunteers  *************/

app.get("/volunteerData", vols.data);
app.get("/volunteerCol", vols.headers);
app.post("/volunteersInsert", vols.insert);
app.put("/volunteers/:id", vols.update);
app.delete("/volunteers/:id", vols.delete);

/************* Locations  *************/

app.get("/locationData", location.data);
app.get("/locationCol", location.headers);
app.post("/locationsInsert", location.insert);
app.put("/locations/:id", location.update);
app.delete("/locations/:id", location.delete);

/************* Age Groups  *************/

app.get("/ageGroupData", ageGroup.data);
app.get("/ageGroupCol", ageGroup.headers);
app.post("/ageGroupInsert", ageGroup.insert);
app.put("/ageGroups/:id", ageGroup.update);
app.delete("/ageGroups/:id", ageGroup.delete);

/************* Participants  *************/

app.get("/participantData", participants.data);
app.get("/participantCol", participants.headers);
app.post("/participantsInsert", participants.insert);
app.put("/participants/:id", participants.update);
app.delete("/participants/:id", participants.delete);

/************* Activities  *************/

app.get("/activityData", activities.data);
app.get("/activityCol", activities.headers);
app.post("/activitiesInsert", activities.insert);
app.put("/activities/:id", activities.update);
app.delete("/activities/:id", activities.delete);

/************* Enrollments  *************/

app.get("/enrollmentData", enrollments.data);
app.get("/enrollmentCol", enrollments.headers);
app.post("/enrollmentsInsert", enrollments.insert);
app.put("/enrollments/:id", enrollments.update);
app.delete("/enrollments/:id", enrollments.delete);

/********************************************/

app.listen(PORT, ()=> {
    console.log("Connected to backend!")
});