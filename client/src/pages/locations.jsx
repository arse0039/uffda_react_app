import React, {useState, useEffect, useReducer} from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline} from 'ionicons/icons';
import Axios from 'axios';
import RenderTable from '../components/tableComponent';
import showform from '../components/ShowForm';
import showError from '../components/errorDisplay';

const Locations = () => {
   
  
////////////////////////////////////////////////////////////////////////////
//// Use Effect block to populate the Locations Table from the database
///////////////////////////////////////////////////////////////////////////  

    const [locations, setLocations] = useState([]);  // Receives data from DB via GET request
    const [renderNew, forceUpdate] = useReducer(x => x+1, 0); 

    // forceUpdate used to rerender table component dynamically
    // useReducer implementation taken from https://www.youtube.com/watch?v=Nxe-9PkP8Nw
  
  useEffect(() => {
    const getLocations = async () => {
        try {
            const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/locationData')
            setLocations(result.data)
            setRealLocations(result.data)
        } catch(err) {
            console.log(err)
        }
    }
    getLocations();
  }, [renderNew]);  

  // Adding renderNew to the dependency array here forces the useEffect function to run
  // whenever there is a change to the received item.

  const [locationColumns, setColHeaders] = useState([]);
  let locationHeaders  = []

  useEffect(() => {
      const populateHeaders = async () => {
          try {
              const res = await Axios.get('http://flip2.engr.oregonstate.edu:10725/locationCol')
              setColHeaders(res.data)
          } catch (err) {
              console.log(err)
          } 
      }
      populateHeaders()
  });
  
  const headerPop = () => {
    locationColumns.map((e) => {
        locationHeaders.push(e.Field)
      })
  }
  headerPop()

///////////////////////////////////////////////////////////////////
/// Form Block for Getting Data from user for forms/CRUD operations
///////////////////////////////////////////////////////////////////

  const [id, setLocationId] = useState("");
  const [name, setLocationName] = useState("");
  const [address, setLocationAddress] = useState("");

  const edit = (locData) => {
      setLocationId(locData.location_id)
      setLocationName(locData.name)
      setLocationAddress(locData.address)
      showform("edit")
  };

    const del = (locData) => {
        setLocationId(locData.location_id)
        setLocationName(locData.name)
        showform("delete")
    };

    const add = () => {
        showform("insert")
    };

    const closeForm = () => {
        showform("close")
        clearState()
    };

    const clearState = () => {
        setLocationId('')
        setLocationName('')
        setLocationAddress('')
    }

    //////////////////////////////////////////////////////
    // CRUD Request Block
    //////////////////////////////////////////////////////

  const insertLoc = async () => {
      try {
          await Axios.post('http://flip2.engr.oregonstate.edu:10725/locationsInsert', {name:name, address:address})
      } catch(err){
          console.log(err)
      } finally {
        forceUpdate()
        closeForm()
        clearState()
      }
  };

  const updateLoc = async (locID) => {
    try {
        await Axios.put(`http://flip2.engr.oregonstate.edu:10725/locations/${locID}`, {name:name, address:address})
    } catch(err) {
        console.log(err)
    } finally {
        forceUpdate()
        closeForm()
        clearState()      
    }
  };

  const delLoc = async (locID) => {
      try {
          await Axios.delete(`http://flip2.engr.oregonstate.edu:10725/locations/${locID}`)
      } catch(err) {
          console.log(err)
      } finally {
        forceUpdate()
        closeForm()
      }
  };

  // Search Bar Functionality.
  // Created using modified code found from:
  // https://www.youtube.com/watch?v=CO1T4YeYC_Y

  const [realLocations, setRealLocations] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchDropData, setSearchDrop] = useState('');

  const tableSearch = (e) => {
      if(e.length > 0) {
          let searchData=locations.filter((col) => col[searchDropData].toLowerCase().includes(e.toLowerCase()));
          setLocations(searchData)
      } else {
          setLocations(realLocations);
      }
      setSearch(e)
  }

  // render the Locations Page
  return ( 
      <div className="main">
      <h1 id="page-header"> Locations Page </h1>
      <div id="table-div">
        <div id="search-div">
                <select className='search-drop' onChange={(e) => setSearchDrop(e.target.value)}>
                    <option disabled selected value> Select a Search Filter </option>
                    <option value='name'>name</option>
                    <option value='address'>address</option> 
                </select>
                <input type="text" className="search-input" value={search} placeholder='Search' onChange={
                    (e) => tableSearch(e.target.value)
                    }/>
            </div>
          <RenderTable dataSet={locations} headerSet={locationHeaders} edit={edit} del={del}   />

      </div>  
            
      <div id="insert-button">
        <button id="add-button" onClick={add}>Add New Location</button>
      </div>
  
      <div>
        <div id="insert-form">
          <button className="closebtn" onClick={closeForm}>
              <IonIcon icon={closeCircleOutline} />
          </button>

          <div className="form">
              <h1>Add Location</h1>
              <h4>*Please fill in the required field</h4><br/>
              <div className="form-ele">
                  <label> Location Name* </label> 
                  <input type="text" value={name} onChange={(e) =>{
                            setLocationName(e.target.value)
                  }}/>
              </div>
              <div className="form-ele">
                  <label> Address* </label> 
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
              <h4>*Please fill in the required field</h4><br/>
              <div className="form-ele">
                   <label> Location Name* </label>
                   <input type="text" value={name} onChange = {(e) => {
                      setLocationName(e.target.value)
                   }}/>
              </div>

              <div className="form-ele">
                   <label> Address* </label>
                   <input type="text" value={address} onChange = {(e) => {
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
                   <input className="del-box" type="text" readOnly={true} value={id} />
                </div>
                <div className='form-ele'>
                   <label>Name:</label>
                   <input className="del-box" type="text" readOnly={true} value={name} />
                </div>
            <button className='btn' onClick={() => delLoc(id)} >Delete Location </button>
        </div>
      </div>
    </div>
  </div>
  )
};

export default Locations;