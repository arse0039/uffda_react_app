import React from 'react';
import { IonIcon } from '@ionic/react';
import {trashOutline, buildOutline, closeCircleOutline} from 'ionicons/icons';

const Volunteers = () => {
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
                    <th>email</th>
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
                        <button class="edit-button" ion-button icon-only onclick="edit()">
                            <IonIcon icon={buildOutline} />
                        </button><br/>
                        <button class="del-button" ion-button icon-only onclick="del()">
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
                        <button class="edit-button" ion-button icon-only onclick="edit()">
                        <IonIcon icon={buildOutline} />
                        </button><br/>
                        <button class="del-button" ion-button icon-only onclick="del()">
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
                        <button class="edit-button" ion-button icon-only onclick="edit()">
                            <IonIcon icon={buildOutline} />
                        </button><br/>
                        <button class="del-button" ion-button icon-only onclick="del()">
                            <IonIcon icon={trashOutline} />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>

        <div class="insert-button">
            <button class="add-button" onclick="add()">Add New Volunteer</button>
        </div>

        <div>
            <div id="insert-form">
                <button class="closebtn" ion-button icon-only onclick="closeForm()">
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <form method="POST" id="addVolunteer">
                    <legend>Add Volunteer</legend>
                    <fieldset class="fields">
                        <div class="form-ele">
                            <label> Name </label> 
                            <input type="text" name="volunteer_name"/>
                        </div>
                        <div class="form-ele">
                            <label> Email </label> 
                            <input type="email" name="volunteer_email"/>
                        </div>
                        <div class="form-ele">
                            <label> Role </label> 
                            <select name="volunteer_role"><br/>
                                <option >;</option>
                                <option value="instructor">instructor</option>
                                <option value="coach">coach</option>
                                <option value="head coach">head coach</option>
                                <option value="assistant coach">assistant coach</option>
                                <option value="guide">guide</option>
                            </select>
                        </div>   
                    </fieldset>
                    <input class="btn" type="submit" id="addVolunteer" value="Add Volunteer"/>
                </form> 
            </div> 

            <div id="update-form">
                <button class="closebtn" ion-button icon-only onclick="closeForm()">
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
                                <option value="instructor">instructor</option>
                                <option value="coach">coach</option>
                                <option value="head coach">head coach</option>
                                <option value="assistant coach">assistant coach</option>
                                <option value="guide">guide</option>
                            </select>
                        </div>
                    </fieldset>
                    <input class="btn" type="submit" id="updateVolunteer" value="Update Volunteer" />
                </form>
            </div>

            <div id="delete-form">
                <button class="closebtn" ion-button icon-only onclick="closeForm()">
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
                    <input class="btn" type="submit" id="deleteVolunteer" value="Delete Volunteer" />
                </form> 
            </div>
        </div>
    </div>
    )
};

export default Volunteers;