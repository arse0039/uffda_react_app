import express from 'express';
import cors from 'cors';

const express = require('express')
const db = require('./db_config');
const cors = require('cors');


const app = express();

const PORT = 3000;
app.use(express.json());

app.get("/volunteers/get", (req,res)=>{
    const volunteerSelect = 'SELECT * FROM volunteers';

    db.query(query1, (err, result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

app.post("/volunteers/insert", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;

    const volInsert = "INSERT INTO participants (name, email, role) VALUES (?, ?, ?)"
    db.query(volInsert, [name, email, role], (err, result)=> {
        if(err){
            console.log(err)
        }
        console.log(result)
    });
})

app.post("/volunteers/update", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;

    const volInsert = "INSERT INTO volunteers (name, email, role) VALUES (?, ?, ?)"
    db.query(volInsert, [name, email, role], (err, result)=> {
        if(err){
            console.log(err)
        }
        console.log(result)
    });
});

app.delete("/volunteers/delete/:id", (req, res)=> {
    const volID = req.params.id;
    const delQuery = "DELETE FROM volunteers WHERE id= ?"
    db.query(delQuery, id, (err, result)=> {
        if(err){
            console.log(err)
        }
    })
});


app.listen(3000, ()=> {
    console.log("Connected to backend!")
});