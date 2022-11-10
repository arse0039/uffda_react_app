import React from 'react';
import { IonIcon } from '@ionic/react';
import {trashOutline, buildOutline, closeCircleOutline} from 'ionicons/icons';

const Enrollments = () => {
    return ( 
    <div class="main">
        <div id="table-div">
            <div id="search-div">
                <input type="text" class="search-input" placeholder="Participant Filter"/>
                <input type="text" class="search-input" placeholder="Activity Filter"/>
            </div>  
            <table id="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Participant</th>
                        <th>Activity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Captain America</td>
                        <td>6_9Baseball_Mariners</td>
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
                        <td>Mike Tyson</td>
                        <td>4_5Baseball_Orioles</td>
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
                        <td>Humpty Dumpty</td>
                        <td>4_5Baseball_Orioles</td>
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
            <button class="add-button" onclick="add()">Add Participant/Activity Pair</button>
        </div>
        <div>
            <div id="insert-form">
                <button class="closebtn" ion-button icon-only onclick="closeForm()">
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <form method="POST" id="addEnrollment">
                    <legend>Create New Activity Enrollment</legend>
                    <fieldset class="fields">
                        <div class="form-ele">
                            <label> Participant </label> 
                                <select name="Participants">
                                    <option ></option>
                                    <option value="Cap">Captain America</option>
                                    <option value="Iron">Mike Tyson</option>
                                    <option value="HD">Humpty Dumpty</option>
                                </select>
                        </div>
                        <div class="form-ele">
                            <label> Activity </label> 
                                <select name="Activities">
                                    <option > </option>
                                    <option value="1">6_9Baseball_Mariners</option>
                                    <option value="2">4_5Baseball_Orioles</option>
                                    <option value="3">4_5Baseball_Cardinals</option>
                                    <option value="4">4_5Baseball1_braves</option>
                                </select>
                        </div>
                    </fieldset>
                    <input class="btn" type="submit" id="addEnrollment" value="Create Activity Enrollment" />
                </form>  
            </div>

        <div id="update-form">
            <button class="closebtn" ion-button icon-only onclick="closeForm()">
                <IonIcon icon={closeCircleOutline} />
            </button>
            <form method="POST" id="updateEnrollment">
                <legend>Update Existing Activity Enrollment</legend>
                <fieldset class="fields">
                    <div class="form-ele">
                        <label> Participant </label> 
                        <select name="Participants">
                            <option> </option>
                            <option value="Cap">Captain America</option>
                            <option value="Iron">Mike Tyson</option>
                            <option value="HD">Humpty Dumpty</option>
                        </select>
                    </div>
                    <div class="form-ele">
                        <label> Activity </label> 
                        <select name="Activities">
                            <option> </option>
                            <option value="1">6_9Baseball_Mariners</option>
                            <option value="2">4_5Baseball_Orioles</option>
                            <option value="3">4_5Baseball_Cardinals</option>
                            <option value="4">4_5Baseball1_braves</option>
                        </select>
                    </div>
                </fieldset>
                <input class="btn" type="submit" id="updateEnrollment" value="Update Existing Activity Enrollment" />
            </form>
        </div>

            <div id="delete-form">
                <button class="closebtn" ion-button icon-only onclick="closeForm()">
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <form method="POST" id="deleteEnrollment">
                    <legend>Delete Existing Activity Enrollment</legend>
                        <fieldset class="fields">
                        <p>Are you sure you wish to delete the following?</p>
                        <div class="form-ele">
                            <label>ID:</label>
                            <input type="text" name="enrollmentID" id="deleteenrollmentID" value="2"/>
                        </div>
                        <div class="form-ele">
                            <label>Participant </label>
                            <input type="text" name="enrollmentID" id="deleteenrollmentID" value="Mike Tyson"/>
                        </div>
                        <div class="form-ele">
                            <label>Activity</label> 
                            <input type="text" name="enrollmentID" id="deleteenrollmentID" value="4_5Baseball_Orioles"/>
                        </div>
                </fieldset>
                <input class="btn" type="submit" id="deleteEnrollment" value="Delete Activity Enrollment" />
                </form> 
            </div>  
        </div>
    </div>
    )
};

export default Enrollments;