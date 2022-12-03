import React, {useState, useEffect, useReducer} from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import Axios from 'axios';
import RenderTable from '../components/tableComponent';
import showform from '../components/ShowForm';
import showError from '../components/errorDisplay';

const AgeGroups = () => {

////////////////////////////////////////////////////////////////////////////
//// Use Effect block to populate the Age_Groups Table from the database
///////////////////////////////////////////////////////////////////////////

    const [ageGroups, setAgeGroups] = useState([]);  // Receives data from DB via GET request
    const [renderNew, forceUpdate] = useReducer(x => x+1, 0);  

    // forceUpdate used to rerender table component dynamically
    // useReducer implementation taken from https://www.youtube.com/watch?v=Nxe-9PkP8Nw

    useEffect(() => {
        const getAgeGroups = async () => {
            try {
                const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/ageGroupData')
                setAgeGroups(result.data)
                setRealAgeGroups(result.data)
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
                const res = await Axios.get('http://flip2.engr.oregonstate.edu:10725/ageGroupCol')
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
        showform("edit")
    }

    const del = (ageGroupData) => {
        setAgeGroupId(ageGroupData.age_group_id)
        setAgeGroupDescription(ageGroupData.description)
        showform("delete")
    }

    const add = () => {
        showform("insert")
    }

    const closeForm = () => {
        clearState()
        showError("clear")
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
            forceUpdate()
            closeForm()
            clearState()
        }
    };

    const updateAgeGroup = async (ageGroupID) => {
        try {
            await Axios.put(`http://flip2.engr.oregonstate.edu:10725/ageGroups/${ageGroupID}`, {description: description})
        } catch(err) {
            console.log(err)
        } finally {
            forceUpdate()
            closeForm()
            clearState()
        }
    };

    const delAgeGroup = async (ageGroupID) => {
        try {
            await Axios.delete(`http://flip2.engr.oregonstate.edu:10725/ageGroups/${ageGroupID}`)
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

    const [realAgeGroups, setRealAgeGroups] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchDropData, setSearchDrop] = useState('');

    const tableSearch = (e) => {
        if(e.length > 0) {
            let searchData = ageGroups.filter((col) => col[searchDropData].toLowerCase().includes(e.toLowerCase()));
            setAgeGroups(searchData)
        } else {
            setAgeGroups(realAgeGroups);
        }
        setSearch(e)
    }

    // Form input validation
    // Created using modified code found from:
    // https://www.youtube.com/watch?v=tIdNeoHniEY

    const validateDataAdd = (e) => {
        e.preventDefault()
        let valid = true
        console.log(description)
        if (description === '') {
            valid = false
            showError("description-add")
        } else {
            showError("clear")
        }

        if (valid) {
            insertAgeGroup()
        }
    } 

    const validateDataUpdate = (e) => {
        e.preventDefault()
        let valid = true
        console.log(description)
        if (description === '') {
            valid = false
             showError("description-update")
        } else {
            showError("clear")
        }

        if (valid) {
            updateAgeGroup(id)
        }
    } 

    // render AgeGroups Page
    return (
      <div className='main'>
        <h1 id="page-header"> Age Groups Page </h1>
          <div id='table-div'>
          <div id="search-div">
                <select className='search-drop' onChange={() => setSearchDrop('description')}>
                    <option default value='description'>Description</option>
                </select>
                <input type="text" className="search-input" value={search} placeholder='Search' onChange={
                    (e) => tableSearch(e.target.value)
                    }/>
            </div>
          <RenderTable dataSet={ageGroups} headerSet={ageGroupHeaders} edit={edit} del={del} />
          </div>

          <div id='insert-button'>
              <button id='add-button' onClick={add}>Add New Age Group</button>
          </div>

          <div>
              <div id='insert-form'>
                  <button className='closebtn' onClick={closeForm}>
                      <IonIcon icon={closeCircleOutline} />
                  </button>
                <div className='form'>
                    <h1>Add Age Group</h1>
                  <div className='form-ele'>
                      <label> Description </label>
                      <input type="text" value={description} onChange={(e) => {
                          setAgeGroupDescription(e.target.value)
                      }} />
                      <span id="description-error-add">Please enter a description</span>
                  </div>
              <button className='btn' onClick={(e) => validateDataAdd(e)}> Add Age Group</button>
                <div/>
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
                        <input type="text" value={description} onChange = {(e) => {
                            setAgeGroupDescription(e.target.value)
                        }} />
                        <span id="description-error-update">Please enter a description</span>
                      </div>
                <button className='btn' onClick={(e) =>validateDataUpdate(e)}> Update Age Group</button>
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
                            <input className="del-box" type="text" readOnly={true} value={id}/>
                        </div>
                        <div className='form-ele'>
                            <label>Description:</label>
                            <input className="del-box" type="text" readOnly={true} value={description}/>
                        </div>
                  <input className='btn' type="submit" id="deleteAgeGroup" value="Delete Age Group" onClick={() => delAgeGroup(id)}/>
              </div>
          </div>
      </div>
    </div> 
    )
};

export default AgeGroups;