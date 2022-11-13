import React, {useState, useEffect, useReducer} from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline} from 'ionicons/icons';
import Axios from 'axios';
import RenderTable from '../components/tableComponent';
import showform from '../components/ShowForm';

const Participants = () => {
  
////////////////////////////////////////////////////////////////////////////
//// Use Effect block to populate the Participants Table from the database
///////////////////////////////////////////////////////////////////////////

    const [participants, setParticipants] = useState([]);
    const [renderNew, forceUpdate] = useReducer(x => x+1, 0);
    
    useEffect(() => {
        const getParticipants = async () => {
            try{
                const result = Axios.get('http://flip2.engr.oregonstate.edu:10725/participantData')
                setParticipants(result.data)
            } catch(err) {
                console.log(err)
            }
        }
        getParticipants();    
    }, [renderNew]);
    
    return ( 
        <div className="main">
            <div id="table-div">
                <div id="search-div">
                    <input type="text" class="search-input" placeholder="Age Group Filter"/>
                    <input type="text" class="search-input" placeholder="Name Filter"/>
                </div>
        
            <table id="table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Age Group</th>
                <th>Name</th>
                <th>Address</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>18+</td>
                <td> Captain America</td>
                <td>612 Upside Down Lane</td>
                <td>
                    <button class="edit-button" ion-button icon-only>
                    <IonIcon icon={trashOutline} />
                    </button><br/>
                    <button class="del-button" ion-button icon-only>
                    <IonIcon icon={buildOutline} />
                    </button>
                </td>
                </tr>
                <tr>
                <td >2</td>
                <td>14 to 18</td>
                <td> Mike Tyson</td>
                <td>555 Punchers Way</td>
                <td>
                    <button class="edit-button" ion-button icon-only onClick="edit()">
                        <IonIcon icon={trashOutline}/>
                    </button><br/>
                    <button class="del-button" ion-button icon-only onClick="del()">
                        <IonIcon icon={buildOutline} />
                    </button>
                </td>
                </tr>
                <tr>
                <td>3</td>
                <td>18+</td>
                <td> Humpty Dumpty</td>
                <td>1820 High Wall Blvd</td>
                <td>
                    <button class="edit-button" ion-button icon-only onClick="edit()">
                        <IonIcon icon={trashOutline} />
                    </button><br/>
                    <button class="del-button" ion-button icon-only onClick="del()">
                        <IonIcon icon={buildOutline} />
                    </button>
                </td>
                </tr>
            </tbody>
            </table>
            </div>
        
            <div class="insert-button">
            <button class="add-button" onclick="add()">Add New Participant</button>
            </div>
            
            <div>
            <div id="insert-form">
                <button class="closebtn" ion-button icon-only onClick="closeForm()">
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <form method="POST" id="addParticipant">
                    <legend>Add Participant</legend>
                        <fieldset class="fields">
                        <div class="form-ele">
                            <label> First Name </label> 
                            <input type="text" name="fname"/>
                        </div>
                        <div class="form-ele">
                            <label> Last Name </label> <input type="text" name="lname"/>
                        </div>  
                        <div class="form-ele">
                            <label> Age Group </label> 
                            <select name="ageGroup">
                            <option value="0">&nbsp;</option>
                                <option value="1">4 to 5</option>
                                <option value="2">6 to 9</option>
                                <option value="3">10 to 13</option>
                                <option value="4">14 to 18</option>
                                <option value="5">18+</option>
                            </select>
                        </div>
                        <div class="form-ele"> 
                            <label> Address </label> <input type="text" name="address"/>
                        </div>
                    </fieldset>
                    <input class="btn" type="submit" id="addPerson" value="Add Participant"/>
                </form> 
            </div>
        
            <div id="update-form">
            <button class="closebtn" ion-button icon-only onclick="closeForm()">
                <IonIcon icon={closeCircleOutline} />
            </button>
        
            <form method="POST" id="update-particpant">
                <legend>Update Participant</legend>
                <fieldset class="fields">
                    <div class="form-ele">
                    <label> ID: </label>
                    <input type="text" name="personID" id="updatepersonID" value="2"/>
                    </div>
                    <div class="form-ele">      
                    <label> First Name </label> 
                    <input type="text" name="fname" value="Mike"/>
                    </div>
                    <div class="form-ele">
                    <label> Last Name </label> 
                    <input type="text" name="lname" value="Tyson"/>
                    </div>
                    <div class="form-ele">
                    <label> Age Group </label> <select name="ageGroup">
                        <option value="0">&nbsp;</option>
                        <option value="1">4 to 5</option>
                        <option value="2">6 to 9</option>
                        <option value="3">10 to 13</option>
                        <option value="4">14 to 18</option>
                        <option value="5">18+</option>
                        </select>
                    </div>
                    <div class="form-ele">
                    <label> Address </label> 
                    <input type="text" name="age" value="555 Punchers Way"/>
                    </div>
                </fieldset>
                    <input class="btn" type="submit" id="UpdateSavePerson" value="Update Participant"/>
            </form> 
            </div>
        
            <div id="delete-form">
            <button class="closebtn" ion-button icon-only onclick="closeForm()">
                <IonIcon icon={closeCircleOutline} />
            </button>
            <form method="POST" id="deleteParticipant">
                <legend>Delete Participant</legend>
                    <fieldset class="fields">
                    <p>Are you sure you wish to delete the following?</p>
                    <div class="form-ele">
                        <label>ID:</label> 
                        <input type="text" name="personID" id="deletepersonID" value="2"/>
                    </div>
                    <div class="form-ele">
                        <label> Name: </label>
                        <input type="text" name="personID" id="deletepersonID" value="Mike Tyson"/>
                    </div>  
                </fieldset>
                <input class="btn" type="submit" id="DeletePerson" value="Delete Participant"/>
            </form> 
            </div>
        </div>
    </div>
    )
};

export default Participants;