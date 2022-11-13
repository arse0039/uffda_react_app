import React, {useState, useEffect, useReducer} from 'react';
import { IonIcon } from '@ionic/react';
import {trashOutline, buildOutline, closeCircleOutline} from 'ionicons/icons';
import Axios from 'axios';

const Locations = () => {
    // This block sets the form divs to appear as pop-ups on the same page.
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
  
////////////////////////////////////////////////////////////////////////////
//// Use Effect block to populate the Volunteer Table from the database
///////////////////////////////////////////////////////////////////////////  

  const [locations, setLocations] = useState([]);  // Recieves data from DB via GET request
  const [renderNew, forceUpdate] = useReducer(x => x+1, 0);  // allows for auto-rendering of the component page
  
  useEffect(() => {
    const getLocations = () => {
    Axios.get('http://flip2.engr.oregonstate.edu:10725/locationData').then(result => {
        setLocations(result.data)
        console.log(result.data)
    })};
    getLocations();
  }, [renderNew]);  
  // Adding renderNew to the dependency array here forces the useEffect function to run
  // whenever there is a change to the recieved item.

  const [id, setLocationId] = useState("");
  const [name, setLocationName] = useState("");
  const [address, setLocationAddress] = useState("");

  const edit = (locData) => {
      setLocationId(locData.location_id)
      setLocationName(locData.name)
      setLocationAddress(locData.address)
      showform("edit");
  }

  const del = (locData) => {
      setLocationId(locData.location_id)
      setLocationName(locData.name)
      showform("delete");
  }

  const add = () => {showform("insert");}

  const closeForm = () => {
      clearState()
      showform("close");
  }

  const clearState = () => {
      setLocationId('')
      setLocationName('')
      setLocationAddress('')
  };

  const insertLoc = async () => {
      try {
          await Axios.post('http://flip2.engr.oregonstate.edu:10725/locationsInsert', {name:name, address:address})
      } catch(err){
          console.log(err)
      }
      closeForm()
      clearState()
      forceUpdate();  // forces rerender of table
  };

  const updateLoc = async (locID) => {
    try {
        await Axios.put(`http://flip2.engr.oregonstate.edu:10725/locations/${locID}`, {name:name, address:address})
    } catch(err) {
        console.log(err)
    }
    closeForm();
    forceUpdate();  // forces rerender of table
  };

  const delLoc = async (locID) => {
      try {
          await Axios.delete(`http://flip2.engr.oregonstate.edu:10725/locations/${locID}`)
      } catch(err) {
          console.log(err)
      }
      closeForm();
      forceUpdate();  // forces rerender of table
  };

  return ( 
      <div className="main">
      <div id="table-div">
          <div id="search-div">
              <input type="text" className="search-input" placeholder="Name Filter" />
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
            {locations.map( (user) => (
            <tr key={user.location_id}>
            <td>{user.location_id}</td>
            <td>{user.name}</td>
            <td>{user.address}</td>
            <td>
                <button className="edit-button" onClick={() => edit(user)}>
                  <IonIcon icon={buildOutline} />
                </button><br/>
                <button className="del-button" onClick={() => del(user)}>
                  <IonIcon icon={trashOutline} />
                </button>
            </td>
            </tr> 
            ))}
          </tbody>
        </table>
      </div>  
            
      <div className="insert-button">
        <button className="add-button" onClick={add}>Add New Location</button>
      </div>
  
      <div>
        <div id="insert-form">
          <button className="closebtn" onClick={closeForm}>
              <IonIcon icon={closeCircleOutline} />
          </button>

          <div className="form">
              <h1>Add Location</h1>
              <div className="form-ele">
                  <label> Location Name </label> 
                  <input type="text" value={name} onChange={(e) =>{
                            setLocationName(e.target.value)
                  }}/>
              </div>
              <div className="form-ele">
                  <label> Address </label> 
                  <input type="email" value={address}  onChange={(e) => {
                            setLocationAddress(e.target.value)
                   }}/>
            </div>
            <button  className="btn" onClick={insertLoc}> Add Location </button>
        </div>
      </div>

      <div id="update-form">
          <button className="closebtn" onClick={closeForm}>
              <IonIcon icon={closeCircleOutline} />
          </button>

          <div className='form'>
              <h1>Update Location</h1>
              <div className="form-ele">
                   <label> Location Name </label>
                   <input type="text" placeholder={name} onChange = {(e) => {
                      setLocationName(e.target.value)
                   }}/>
              </div>

              <div className="form-ele">
                   <label> Address </label>
                   <input type="text" placeholder={address} onChange = {(e) => {
                      setLocationAddress(e.target.value)
                   }}/>
              </div>

              <button className="btn" onClick={() => updateLoc(id)}> Update Location</button>
          </div>
      </div>


      <div id="delete-form">
        <button className="closebtn" onClick={closeForm}>
            <IonIcon icon={closeCircleOutline} />
        </button>
        <div className="form">
            <h1>Delete Existing Location</h1>
                <p>Are you sure you wish to delete the following?</p>
                <div className='form-ele'>
                   <label>ID:</label>
                   <input type="text" readOnly={true} value={id} />
                </div>
                <div className='form-ele'>
                   <label>Name:</label>
                   <input type="text" readOnly={true} value={name} />
                </div>
            <input className='btn' type="submit" id="deleteLocation" value="Delete Location" onClick={() => delLoc(id)} />
        </div>
      </div>
    </div>
  </div>
  )
};

export default Locations;