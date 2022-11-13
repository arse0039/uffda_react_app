import React, {useState, useEffect, useReducer} from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import Axios from 'axios';
import RenderTable from '../components/tableComponent';
import showform from '../components/ShowForm';

const AgeGroups = () => {

////////////////////////////////////////////////////////////////////////////
//// Use Effect block to populate the Age_Groups Table from the database
///////////////////////////////////////////////////////////////////////////

    const [ageGroups, setAgeGroups] = useState([]);  // Receives data from DB via GET request
    const [renderNew, forceUpdate] = useReducer(x => x+1, 0);  // allows for auto-rendering of the component page

    useEffect(() => {
        const getAgeGroups = async () => {
            try {
                const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/ageGroupData')
                setAgeGroups(result.data)
            } catch(err) {
                console.log(err)
            }
        }
        getAgeGroups();
    }, [renderNew]);

    // adding renderNew (above) to the dependency array forces the useEffect function to run whenever 
    // there is a change to the received item
 
    const [ageGroupColumns, setColHeaders] = useState([]);
    let ageGroupHeaders = []

    useEffect(() => {
        const populateHeaders = async () => {
            try {
                const res = await Axois.get('http://flip2.engr.oregonstate.edu:10725/ageGroupCol')
                setColHeaders(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        populateHeaders();
    });

    const headerPop = () => {
        ageGroupColumns.map((e) => {
            ageGroupHeaders.push(e.Field)
        })
    }
    headerPop()

    ///////////////////////////////////////////////////////////////////
    /// Form Block for Getting Data from user for forms/CRUD operations
    ///////////////////////////////////////////////////////////////////
    const [id, setAgeGroupId] = useState("")
    const [description, setAgeGroupDescription] = useState("")

    const edit = (ageGroupData) => {
        setAgeGroupId(ageGroupData.age_group_id)
        setAgeGroupDescription(ageGroupData.description)
        showform("edit");
    }

    const del = (ageGroupData) => {
        setAgeGroupId(ageGroupData.age_group_id)
        setAgeGroupDescription(ageGroupData.description)
        showform("delete");
    }

    const add = () => {showform("insert");}

    const closeForm = () => {
        clearState()
        showform("close");
    }

    const clearState = () => {
        setAgeGroupId('')
        setAgeGroupDescription('')
    };

    const insertAgeGroup = async () => {
        try {
            await Axios.post('http://flip.engr.oregonstate.edu:10725/ageGroupInsert', {description:description})
        } catch(err) {
            console.log(err)
        } finally {
            closeForm()
            clearState()
            forceUpdate();  // forces rerender of table component
        }
    };

    const updateAgeGroup = async (ageGroupID) => {
        try {
            await Axios.put(`http://flip2.engr.oregonstate.edu:10725/ageGroups/${ageGroupID}`, {description:description})
        } catch(err) {
            console.log(err)
        } finally {
            closeForm();
            forceUpdate();  // forces rerender of table component
        }
    };

    const delAgeGroup = async (ageGroupID) => {
        try {
            await Axios.delete(`http://flip2.engr.oregonstate.edu:10725/ageGroups/${ageGroupID}`)
        } catch(err) {
            console.log(err)
        } finally {
            closeForm();
            forceUpdate();  // forces rerender of table component
        }
    }; 

    return (
      <div className='main'>
          <div id='table-div'>
              <div id='search-div'>
                  <input type="text" className="search-input" placeholder="Age Group Filter" />
              </div>
          <RenderTable dataSet={ageGroups} headerSet={ageGroupHeaders} edit={edit} del={del} />
          </div>

          <div className='insert-button'>
              <button className='add-button' onClick={add}>Add New Age Group</button>
          </div>

          <div>
              <div id='insert-form'>
                  <button className='closebtn' onClick={closeForm}>
                      <IonIcon icon={closeCircleOutline} />
                  </button>
                  <div className='form-ele'>
                      <label> Description </label>
                      <input type="text" value={description} onChange={(e) => {
                          setAgeGroupDescription(e.target.value)
                      }} />
                  </div>
              <button className='btn' onClick={insertAgeGroup}> Add Age Group</button>
              </div>
          </div>

          <div id='update-form'>
            <button className='closebtn' onClick={closeForm}>
                      <IonIcon icon={closeCircleOutline} />
            </button>

            <div className='form'>
                <h1>Update Age Group</h1>
                      <div className='form-ele'>
                        <label> Description </label>
                        <input type="text" placeholder={description} onChange = {(e) => {
                            setAgeGroupDescription(e.target.value)
                        }} />
                      </div>
              <button className='btn' onClick={() => updateAgeGroup(id)}> Update Age Group</button>
            </div>
          </div>

          <div id='delete-form'>
              <button className='closebtn' onClick={closeForm}>
                        <IonIcon icon={closeCircleOutline} />
              </button>
              <div className='form'>
                  <h1> Delete Existing Age Group </h1>
                        <p> Are you sure you wish to delete the following?</p>
                        <div className='form-ele'>
                            <label>ID:</label>
                            <input type="text" readOnly={true} value={id}/>
                        </div>
                        <div className='form-ele'>
                            <label>Description:</label>
                            <input type="text" readOnly={true} value={description}/>
                        </div>
                  <input className='btn' type="submit" id="deleteAgeGroup" value="Delete Age Group" onClick={() => delAgeGroup(id)}/>
              </div>
          </div>
      </div> 
    )
};

export default AgeGroups;