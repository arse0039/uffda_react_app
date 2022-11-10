import React from 'react';
import { IonIcon } from '@ionic/react';
import {trashOutline, buildOutline, closeCircleOutline} from 'ionicons/icons';

const Locations = () => {
    return ( 
        <div class="main">
        <div id="table-div">
            <div id="search-div">
                <input type="text" class="search-input" placeholder="Name Filter" />
            </div>
        <table id="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Highlakes Baseball Field</td>
              <td> 555 Highlakes Way</td>
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
              <td>Lava Ridge Baseball Field</td>
              <td>555 Lava Ridge Rd</td>
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
              <td>Drake Park</td>
              <td>555 DrakeNJosh Ave</td>
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
        <button class="add-button" onclick="add()">Add New Location</button>
      </div>
  
      <div>
        <div id="insert-form">
          <button class="closebtn" ion-button icon-only onclick="closeForm()">
            <IonIcon icon={closeCircleOutline} />
          </button>
          <form method="POST" id="addLoc">
            <legend>Add Location</legend>
              <fieldset class="fields">
                <div class="form-ele">
                  <label> Location Name </label> 
                  <input type="text" name="location-name" />
                </div>
                <div class="form-ele">
                  <label> Address</label> 
                  <input type="text" name="location-address" />
                </div>
              </fieldset>
              <input class="btn" type="submit" id="addLocation" value="Add Location" />
          </form> 
        </div>
  
        <div id="update-form">
          <button class="closebtn" ion-button icon-only onclick="closeForm()">
            <IonIcon icon={closeCircleOutline} />
          </button>
          <form method="POST" id="UpdateLoc">
              <legend>Update Location</legend>
                <fieldset class="fields">
                <div class="form-ele">
                  <label>ID: </label>
                  <input type="text" name="locationID" id="updateLocation" value="2" />
                </div>
                <div class="form-ele">  
                  <label>Location Name </label> 
                  <input type="text" name="locname" value="Lava Ridge Baseball Field" />
                </div>
                <div class="form-ele">
                  <label>Address</label> 
                  <input type="text" name="local-address" value="555 Lava Ridge Rd" />
                </div>
            </fieldset>
            <input class="btn" type="submit" id="UpdateLoc" value="Update Location" />
          </form> 
        </div>
  
        <div id="delete-form">
          <button class="closebtn" ion-button icon-only onclick="closeForm()">
            <IonIcon icon={closeCircleOutline} />
          </button>
          <form method="POST" id="deleteLocation">
              <legend>Delete Location</legend>
                  <fieldset class="fields">
                  <p>Are you sure you wish to delete this location?</p>
                  <div class="form-ele">
                    <label>ID:</label>
                    <input type="text" name="locationID" id="deletelocationID" value="3" />
                  </div>
                  <div class="form-ele">
                    <label>Name:</label> 
                    <input type="text" name="locationID" id="deletelocationID" value="Drake Park" />
                  </div>
            </fieldset>
            <input class="btn" type="submit" id="DeleteLocation" value="Delete Location" />
          </form> 
      </div>
    </div>
    </div>
    )
};

export default Locations;