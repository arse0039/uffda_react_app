import React from 'react';
import { IonIcon } from '@ionic/react';
import {trashOutline, buildOutline, closeCircleOutline} from 'ionicons/icons';

const Activities = () => {
    return (
        <div class="main">
            <div id="table-div">
                <div id="search-div">
                    <input type="text" class="search-input" placeholder="Location Filter"/>
                    <input type="text" class="search-input" placeholder="Age Group Filter"/>
                    <input type="text" class="search-input" placeholder="Name Filter"/>
                </div>
            <table id="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Volunteer</th>
                        <th>Age Group</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Max Participants</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Highlake's Baseball Field</td>
                        <td>Joseph</td>
                        <td>6 to 9</td>
                        <td>6_9Baseball_Mariners</td>
                        <td>6-9 baseball Team Mariners</td>
                        <td>15</td>
                        <td>
                            <button class="edit-button" ion-button icon-only onclick="edit()">
                                <IonIcon icon={trashOutline} />
                            </button><br/>
                            <button class="del-button" ion-button icon-only onclick="del()">
                                <IonIcon icon={buildOutline} />
                            </button>
                        </td>                
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Lava Ridge Baseball Field</td>
                        <td>Katrina</td>
                        <td>4 to 5</td>
                        <td>4_5Baseball_Orioles</td>
                        <td>4-5 baseball Team Orioles</td>
                        <td>15</td>
                        <td>
                            <button class="edit-button" ion-button icon-only onclick="edit()">
                                <IonIcon icon={trashOutline} />
                            </button><br/>
                            <button class="del-button" ion-button icon-only onclick="del()">
                                <IonIcon icon={buildOutline} />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Ensworth Baseball Field</td>
                        <td>Julie</td>
                        <td>4 to 5</td>
                        <td>4_5Baseball_Cardinals</td>
                        <td>4-5 baseball Team Cardinals</td>
                        <td>15</td>
                        <td>
                            <button class="edit-button" ion-button icon-only onclick="edit()">
                                <IonIcon icon={trashOutline} />
                            </button><br/>
                            <button class="del-button" ion-button icon-only onclick="del()">
                                <IonIcon icon={buildOutline} />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="insert-button">
            <button class="add-button" onclick="add()">Add New Activity</button>
        </div>

        <div>
            <div id="insert-form">
                <button class="closebtn" ion-button icon-only onclick="closeForm()">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
                <form method="POST" id="addActivity">
                    <legend>Add Activity</legend>
                    <fieldset class="fields">
                        <div class="form-ele">
                            <label> Location ID </label> 
                                <select name="location-dd">
                                    <option > </option>
                                    <option value="Highlake's Baseball Field">Highlake's Baseball Field</option>
                                    <option value="Lava Ridge Baseball Field">Lava Ridge Baseball Field</option>
                                    <option value="Drake Park">Drake Park</option>
                                </select>   
                        </div>
                        <div class="form-ele">
                            <label> Volunteer ID </label>
                                <select name="volunteer-dd">
                                    <option > </option>
                                    <option value="Billy">Billy</option>
                                    <option value="Bob">Bob</option>
                                    <option value="Joseph">Joseph</option>
                                </select>
                        </div>
                        <div class="form-ele">
                            <label> Age Group </label> 
                                <select name="age_group">
                                    <option > </option>
                                    <option value="4 to 5">4 to 5</option>
                                    <option value="6 to 9">6 to 9</option>
                                    <option value="10 to 13">10 to 13</option>
                                    <option value="14 to 18">14 to 18</option>
                                    <option value="18+">18+</option>
                                </select>
                        </div>
                        <div class="form-ele">
                            <label> Name </label> 
                                <input type="text" name="activity_name" /><br/>
                        </div>
                        <div class="form-ele">
                            <label> Description </label> 
                                <input type="text" name="activity_description" /><br />
                        </div>
                        <div class="form-ele">
                            <label> Max Participants </label> 
                                <input type="int" name="max_participants" />
                        </div>
                    </fieldset>
                    <input class="btn" type="submit" id="addActivity" value="Add Activity" />
                </form>
            </div>  

            <div id="update-form">
                <button class="closebtn" ion-button icon-only onclick="closeForm()">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
                <form method="POST" id="updateActivity" >              
                    <legend>Update Activity</legend>
                    <fieldset class="fields">
                        <div class="form-ele">
                            <label> Location </label>
                                <select name="location-dd">
                                    <option value> </option>
                                    <option value="Highlakes Baseball Field">Highlakes Baseball Field</option>
                                    <option value="Lava Ridge Baseball Field">Lava Ridge Baseball Field</option>
                                    <option value="Drake Park">Drake Park</option>
                                </select>   
                        </div>
                        <div class="form-ele">
                            <label> Volunteer </label>
                                <select name="volunteer-dd">
                                    <option value> </option>
                                    <option value="Billy">Billy</option>
                                    <option value="Bob">Bob</option>
                                    <option value="Joseph">Joseph</option>
                                </select>
                        </div>
                        <div class="form-ele">
                            <label> Age Group </label>
                                <select name="age_group"><br/>
                                    <option value>&nbsp;</option>
                                    <option value="4 to 5">4 to 5</option>
                                    <option value="6 to 9">6 to 9</option>
                                    <option value="10 to 13">10 to 13</option>
                                    <option value="14 to 18">14 to 18</option>
                                    <option value="18+">18+</option>
                                </select>
                        </div>        
                        <div class="form-ele">
                            <label> Name </label>
                            <input type="text" name="activity_name" />
                        </div>
                        <div class="form-ele">
                            <label> Description </label>
                            <input type="text" name="activity_description" />
                        </div>
                        <div class="form-ele">
                            <label> Max Participants </label>
                            <input type="int" name="max_participants" />
                        </div>
                    </fieldset>
                    <input class="btn" type="submit" id="updateActivity" value="Update Existing Activity" />
                </form>
            </div>

            <div id="delete-form">
                <button class="closebtn" ion-button icon-only onclick="closeForm()">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
                <form method="POST" id="deleteActivity">
                    <legend>Delete Activity</legend>
                        <fieldset class="fields">
                        <p>Are you sure you wish to delete the following?</p>
                        <div class="form-ele">
                            <label>ID:</label> <br />
                            <input type="text" name="activityID" id="deleteActivityID" value="2" />   
                        </div>
                        <div class="form-ele">
                            <label>Name </label> 
                            <input type="text" name="activityID" id="deleteActivityID" value="4_5Baseball_Orioles" /> 
                        </div> 
                    </fieldset>
                    <input class="btn" type="submit" id="deleteActivity" value="Delete Activity" />
                </form> 
            </div>   
        </div>
    </div>
    )
}

export default Activities;