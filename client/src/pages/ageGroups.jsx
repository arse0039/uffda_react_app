import React from 'react';
import { IonIcon } from '@ionic/react';
import {trashOutline, buildOutline, closeCircleOutline} from 'ionicons/icons';

const AgeGroups = () => {
    return ( 
        <div class="main">
        <div id="table-div">
            <div id="search-div">
                <input type="text" class="search-input" placeholder="Age Group Filter"/>
            </div>
  
        <table id="header">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>4 to 5</td>
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
              <td>6 to 9</td>
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
              <td>10 to 13</td>
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
              <td>4</td>
              <td>14 to 18</td>
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
              <td>5</td>
              <td>18+</td>
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
        <button class="add-button" onclick="add()">Add New Age Group</button>
      </div>
  
      <div>
        <div id="insert-form">
          <button class="closebtn" ion-button icon-only onclick="closeForm()">
            <IonIcon title={closeCircleOutline} />
          </button>
          <form method="POST" id="addAge">
              <legend>Add Age Group</legend>
                <fieldset class="fields">
                  <div class="form-ele">
                    <label> Description </label> 
                    <input type="text" name="ageGroupName"/><br/>
                </div>
                </fieldset>
                <input class="btn" type="submit" id="addAgeButton" value="Add Age Group"/>
          </form> 
        </div>
  
        <div id="update-form">
          <button class="closebtn" ion-button icon-only onclick="closeForm()">
            <IonIcon title={closeCircleOutline} />
          </button>
          <form method="POST" id="UpdateAge">
              <legend>Update Age Group</legend>
                <fieldset class="fields">
                  <div class="form-ele">
                    <label> ID: </label>  
                    <input type="text" name="locationID" id="updateAgeinput" value="2"/>
                  </div>
                  <div class="form-ele">  
                    <label> Description </label> 
                    <input type="text" name="age-desc" value="6 to 9"/>
                  </div>
            </fieldset>
              <input class="btn" type="submit" id="UpdateAgeSubmit" value="Update Age Group"/>
        </form> 
        </div>
  
        <div id="delete-form">
          <button class="closebtn" ion-button icon-only onclick="closeForm()">
            <IonIcon title={closeCircleOutline} />
          </button>
          <form method="POST" id="delAge">
              <legend>Delete Age Group</legend>
                  <fieldset class="fields">
                  <p>Are you sure you wish to delete this age group?</p>
                  <div class="form-ele">
                    <label>ID:</label>
                    <input type="text" name="ageID" id="deleteAge" value="2"/>
                  </div>
                  <div class="form-ele">
                    <label>Name:</label>
                    <input type="text" name="ageID" id="deleteAge" value="6 to 9"/>
                  </div>             
                </fieldset>
            <input class="btn" type="submit" id="DeleteAge" value="Delete Age Group"/>
          </form> 
        </div>
      </div>
    </div>
    )
};

export default AgeGroups;