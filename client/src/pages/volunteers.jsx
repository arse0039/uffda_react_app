import React, {useState, useEffect} from 'react';
import { IonIcon } from '@ionic/react';
import {trashOutline, buildOutline, closeCircleOutline} from 'ionicons/icons';
import Axios from 'axios';


const Volunteers = () => {
    const showform = (formtype) => {
        if (formtype == "edit") {
            document.getElementById("insert-form").style.visibility="hidden"
            document.getElementById("update-form").style.visibility="visible"
            document.getElementById("delete-form").style.visibility="hidden"
            document.getElementById("table-div").style.filter="blur(3px)"
            document.getElementById("header").style.filter="blur(3px)"    
            document.getElementById("search-div").style.filter="blur(3px)"
        }else if (formtype == "delete") {
            document.getElementById("insert-form").style.visibility="hidden"
            document.getElementById("update-form").style.visibility="hidden"
            document.getElementById("delete-form").style.visibility="visible"
            document.getElementById("table-div").style.filter="blur(3px)"
            document.getElementById("header").style.filter="blur(3px)"
            document.getElementById("search-div").style.filter="blur(3px)"               
        } else if (formtype == "insert") {
            document.getElementById("insert-form").style.visibility="visible"
            document.getElementById("update-form").style.visibility="hidden"
            document.getElementById("delete-form").style.visibility="hidden"
            document.getElementById("table-div").style.filter="blur(3px)"
            document.getElementById("header").style.filter="blur(3px)" 
            document.getElementById("search-div").style.filter="blur(3px)"
        } else {
            document.getElementById("insert-form").style.visibility="hidden"
            document.getElementById("update-form").style.visibility="hidden"
            document.getElementById("delete-form").style.visibility="hidden"
            document.getElementById("table-div").style.filter="blur(0px)"
            document.getElementById("header").style.filter="blur(0px)" 
            document.getElementById("search-div").style.filter="blur(0px)"
        }
    }
    const edit = () => {showform("edit");}
    const del = () => {showform("delete");}
    const add = () => {showform("insert");}
    const closeForm = () => {showform("close");}


    const [name, setVolunteerName] = useState("");
    const [email, setVolunteerEmail] = useState("");
    const [role, setVolunteerRole] = useState("");

    const insertVol = () => {
        Axios.post('http://localhost:3000/volunteers/insert', {name: name, email:email, role:role})
    };

    const updateVol = () => {
        Axios.post('http://localhost:3000/volunteers/update', {name: name, email:email, role:role})
    };

    const delVol = () => {
        Axios.delete('http://localhost:3000/volunteers/delete/:id', {name: name, email:email, role:role})
    };

    return ( 
    <div class="main">
        <div id="table-div">
            <div id="search-div">
                <input type="text" class="search-input" placeholder="Name Filter"/>
                <input type="text" class="search-input" placeholder="Role Filter"/>
            </div> 
        <table id="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Billy</td>
                    <td>billy@email.com</td>
                    <td>Coach</td>
                    <td>
                        <button class="edit-button" ion-button icon-only onClick={edit}>
                            <IonIcon icon={buildOutline} />
                        </button><br/>
                        <button class="del-button" ion-button icon-only onClick={del}>
                            <IonIcon icon={trashOutline} />
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Bob</td>
                    <td>bob@email.com</td>
                    <td>Instructor</td>
                    <td>
                        <button class="edit-button" ion-button icon-only onClick={edit}>
                        <IonIcon icon={buildOutline} />
                        </button><br/>
                        <button class="del-button" ion-button icon-only onClick={del}>
                        <IonIcon icon={trashOutline} />
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Joseph</td>
                    <td>joseph@email.com</td>
                    <td>Head Coach</td>
                    <td>
                        <button class="edit-button" ion-button icon-only onClick={edit}>
                            <IonIcon icon={buildOutline} />
                        </button><br/>
                        <button class="del-button" ion-button icon-only onClick={del}>
                            <IonIcon icon={trashOutline} />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>

        <div class="insert-button">
            <button class="add-button" onClick={add}>Add New Volunteer</button>
        </div>

        <div>
            <div id="insert-form">
                <button class="closebtn" ion-button icon-only onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <form method="POST" id="addVolunteer">
                    <legend>Add Volunteer</legend>
                    <fieldset class="fields">
                        <div class="form-ele">
                            <label> Name </label> 
                            <input type="text" name="volunteerName" onChange={(e) =>{
                                setVolunteerName(e.target.value)
                            }}/>
                        </div>
                        <div class="form-ele">
                            <label> Email </label> 
                            <input type="email" name="volunteerEmail" onChange={(e) => {
                                setVolunteerEmail(e.target.value)
                            }}/>
                        </div>
                        <div class="form-ele">
                            <label> Role </label> 
                            <select name="volunteer_role" onChange = {(e) => {
                                setVolunteerRole(e.target.value)
                            }}><br/>
                                <option ></option>
                                <option value="Instructor">Instructor</option>
                                <option value="Coach">Coach</option>
                                <option value="Head Coach">Head Coach</option>
                                <option value="Assistant Coach">Assistant Coach</option>
                                <option value="Guide">Guide</option>
                            </select>
                        </div>   
                    </fieldset>
                    <input class="btn" id="addVolunteer" value="Add Volunteer" onClick={insertVol}/>
                </form> 
            </div> 

            <div id="update-form">
                <button class="closebtn" ion-button icon-only onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>

                <form method="POST" id="updateVolunteer">
                    <legend>Update Volunteer</legend>
                    <fieldset class="fields">
                        <div class="form-ele">
                            <label> Name </label> 
                            <input type="text" name="volunteer_name"/>
                        </div>
                        <div class="form-ele">
                            <label> email </label> 
                            <input type="email" name="volunteer_email" />
                        </div>
                        <div class="form-ele">
                            <label> role </label> 
                            <select name="volunteer_role">
                                <option value> </option>
                                <option value="Instructor">Instructor</option>
                                <option value="Coach">Coach</option>
                                <option value="Head Coach">Head Coach</option>
                                <option value="Assistant Coach">Assistant Coach</option>
                                <option value="Guide">Guide</option>
                            </select>
                        </div>
                    </fieldset>
                    <button class="btn" id="updateVolunteer" onClick={updateVol}>Update Volunteer</button> 
                </form>
                    
            </div>

            <div id="delete-form">
                <button class="closebtn" ion-button icon-only onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <form method="POST" id="deleteVolunteer">
                    <legend>Delete Existing Volunteer</legend>
                        <fieldset class="fields">
                        <p>Are you sure you wish to delete the following?</p>
                        <div class="form-ele">
                            <label>ID:</label>
                            <input type="text" name="volunteerID" id="deletevolunteerID" value="2"/>
                        </div>
                        <div class="form-ele">
                            <label> <strong>Name</strong> </label> 
                            <input type="text" name="volunteerID" id="deletevolunteerID" value="Bob" />
                        </div>
                    </fieldset>
                    <input class="btn" type="submit" id="deleteVolunteer" value="Delete Volunteer" onClick={delVol}/>
                </form> 
            </div>
        </div>
    </div>
    )
};

export default Volunteers;