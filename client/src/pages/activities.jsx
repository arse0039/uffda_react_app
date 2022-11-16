import React, {useState, useEffect, useReducer} from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import Axios from 'axios';
import RenderTable from '../components/tableComponent';
import showform from '../components/ShowForm';
import RenderAgeDropdown from '../components/AgeGroupDropdown';
import RenderLocationDropdown from '../components/LocationDropdown';
import RenderVolunteerDropdown from '../components/VolunteerDropdown';

const Activities = () => {

////////////////////////////////////////////////////////////////////////////
//// Use Effect block to populate the Activites Table from the database
///////////////////////////////////////////////////////////////////////////

    // Get data for the Activities Table
    const [activities, setActivities] = useState([]);
    const [renderNew, forceUpdate] = useReducer(x => x+1, 0);

    useEffect(() => {
        const getActivities = async () => {
            try {
                const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/activityData')
                setActivities(result.data)
            } catch(err) {
                console.log(err)
            }
        }
        getActivities();
    }, [renderNew]);

    // Generate Headers for Table
    const [activityColumns, setColHeaders] = useState([])
    let activityHeaders = []

    useEffect(() => {
        const populateHeaders = async () => {
            try { 
                const res = await Axios.get('http://flip2.engr.oregonstate.edu:10725/activityCol')
                setColHeaders(res.data) 
            } catch(err) {
                console.log(err)
            }
        }
        populateHeaders()
    });

    const headerPop = () => {
        activityColumns.map((e) => {
            activityHeaders.push(e.Field)
        })
    }
    headerPop()

    // Get data to Generate Location Dropdown
    const [locationDropDown, setLocationDropdown] = useState([])
    useEffect( async () => {
        try {
            const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/locationData')
            setLocationDropdown(result.data)
        } catch (err) {
            console.log(err)
        }
    }, [renderNew]);    

    // Get data to Generate Volunteers Dropdown
    const [volunteerDropDown, setVolunteerDropdown] = useState([])
    useEffect( async () => {
        try {
            const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/volunteerData')
            setVolunteerDropdown(result.data)
        } catch (err) {
            console.log(err)
        }
    }, [renderNew]);

    // Get data to Generate Age Groups Dropdown
    const [ageDropDown, setAgeDropdown] = useState([])
    useEffect( async () => {
        try {
            const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/ageGroupData')
            setAgeDropdown(result.data)
        } catch (err) {
            console.log(err)
        }
    }, [renderNew]);


    ///////////////////////////////////////////////////////////////////
    /// Form Block for Getting Data from user for forms/CRUD operations
    ///////////////////////////////////////////////////////////////////

    const [id, setActivityId] = useState("")
    const [location, setActivityLocation] = useState("")
    const [volunteer, setActivityVolunteer] = useState("")
    const [ageGroup, setActivityAgeGroup] = useState("")
    const [name, setActivityName] = useState("")
    const [description, setActivityDescription] = useState("")
    const [maxPart, setActivityMaxPart] = useState("")

    const edit = (activityData) => {
        setActivityId(activityData.activity_id)
        setActivityLocation(activityData.location_id)
        setActivityVolunteer(activityData.volunteer_id)
        setActivityAgeGroup(activityData.age_group_id)
        setActivityName(activityData.name)
        setActivityDescription(activityData.description)
        setActivityMaxPart(activityData.maxpart)
        showform("edit")
    };

    const del = (activityData) => {
        setActivityId(activityData.activity_id)
        setActivityName(activityData.name)
        showform("delete")
    };

    const add = () => {
        showform("insert")
    };

    const closeForm = () => {
        clearState()
        showform("close")
    };

    const clearState = () => {
        setActivityId('')
        setActivityLocation('')
        setActivityVolunteer('')
        setActivityAgeGroup('')
        setActivityName('')
        setActivityDescription('')
        setActivityMaxPart('')
    };

    const changeLocation = (e) => {
        setActivityLocation(e)
    };

    const changeVolunteer = (e) => {
        setActivityVolunteer(e)
    };

    const changeAgeGroup = (e) => {
        setActivityAgeGroup(e)
    };

    //////////////////////////////////////////////////////
    // CRUD Request Block
    //////////////////////////////////////////////////////

    const insertActivity = async () => {
        try {
            await Axios.post('http://flip2.engr.oregonstate.edu:10725/activitiesInsert', 
            {
                location_id: location, 
                volunteer_id: volunteer, 
                age_group_id: ageGroup, 
                name: name, 
                description: description, 
                max_participants: maxPart
            })
        } catch(err){
            console.log(err)
        } finally {
            closeForm()
            clearState()
            forceUpdate()
        }
    }; 

    const updateActivity = async (activityID) => {
        try {
            await Axios.put(`http://flip2.engr.oregonstate.edu:10725/activities/${activityID}`,
            {
                location_id: location, 
                volunteer_id: volunteer, 
                age_group_id: ageGroup, 
                name: name, 
                description: description, 
                max_participants: maxPart
            })
        } catch(err){
            console.log(err)
        } finally {
            closeForm()
            forceUpdate()
        }
    }; 

    const deleteActivity = async (activityID) => {
        try {
            await Axios.put(`http://flip2.engr.oregonstate.edu:10725/activities/${activityID}`)
        } catch(err){
            console.log(err)
        } finally {
            closeForm()
            forceUpdate()
        }
    };

    // Render the Page
    return (
        <div className='main'>
            <div id="table-div">
                <div id="search-div">
                    <input type="text" className="search-input" placeholder="Location Filter"/>
                    <input type="text" className="search-input" placeholder="Age Group Filter"/>
                    <input type="text" className="search-input" placeholder="Name Filter"/>
                </div>
                <RenderTable dataSet={activities} headerSet={activityHeaders} edit={edit} del={del} /> 
            </div>

            <div className='insert-button'>
                <button className='add-button' onClick={add}>Add New Activity</button>
            </div>

            <div>
                <div id='insert-form'>
                    <button className='closebtn' ion-button icon-only onClick={closeForm}>
                        <IonIcon icon={closeCircleOutline} />
                    </button>
                <div className='form'>
                    <h1>Add Activity</h1>
                        <div className='form-ele'>
                            <label> Name </label>
                            <input type='text' value={name} onChange={(e) => {
                                setActivityName(e.target.value)
                            }}/>
                        </div>
                        <div className='form-ele'>
                            <label> Description </label>
                            <input type='text' value={description} onChange={(e) => {
                                setActivityDescription(e.target.value)
                            }}/>
                        </div>
                        <div className='form-ele'>
                            <label> Max Participants </label>
                            <input type='int' value={maxPart} onChange={(e) => {
                                setActivityMaxPart(e.target.value)
                            }}/>
                        </div>
                        <div className='form-ele'>
                            <label> Location </label> 
                            <select value={location} onChange={(e) => {
                                setActivityLocation(e.target.value)
                            }}>
                                <option value=''></option>
                                {locationDropDown.map((locationCategory) => (
                                    <RenderLocationDropdown data={locationCategory} />
                                ))}
                            </select>
                        </div>
                        <div className='form-ele'>
                            <label> Volunteer </label> 
                            <select value={volunteer} onChange={(e) => {
                                setActivityVolunteer(e.target.value)
                            }}>
                                <option value=''></option>
                                {volunteerDropDown.map((volunteerCategory) => (
                                    <RenderVolunteerDropdown data={volunteerCategory} />
                                ))}
                            </select>
                        </div>
                        <div className='form-ele'>
                            <label> Age Group </label> 
                            <select value={ageGroup} onChange={(e) => {
                                setActivityAgeGroup(e.target.value)
                            }}>
                                <option value=''></option>
                                {ageDropDown.map((ageCategory) => (
                                    <RenderAgeDropdown data={ageCategory} />
                                ))}
                            </select>
                        </div>
                    <button className='btn' onClick={insertActivity}> Add Activity </button>                        
                </div>                
                </div>

                <div id='update-form'>
                    <button className='closebtn' ion-button icon-only onClick={closeForm}>
                        <IonIcon icon={closeCircleOutline} />
                    </button>

                <div className='form'>
                    <h1>Update Activity</h1>
                        <div className='form-ele'>
                            <label> Name </label>
                            <input type='text' placeholder={name} onChange={(e) => {
                                setActivityName(e.target.value)
                            }}/>
                        </div>
                        <div className='form-ele'>
                            <label> Description </label>
                            <input type='text' placeholder={description} onChange={(e) => {
                                setActivityDescription(e.target.value)
                            }}/>
                        </div>
                        <div className='form-ele'>
                            <label> Max Participants </label>
                            <input type='int' placeholder={maxPart} onChange={(e) => {
                                setActivityMaxPart(e.target.value)
                            }}/>
                        </div>
                        <div className='form-ele'>
                            <label> Location </label> 
                            <select value={location} onChange={changeLocation}>
                                {locationDropDown.map((locationCategory) => (
                                    <RenderLocationDropdown data={locationCategory} />
                                ))}
                            </select>
                        </div>
                        <div className='form-ele'>
                            <label> Volunteer </label> 
                            <select value={volunteer} onChange={changeVolunteer}>
                                {volunteerDropDown.map((volunteerCategory) => (
                                    <RenderVolunteerDropdown data={volunteerCategory} />
                                ))}
                            </select>
                        </div>
                        <div className='form-ele'>
                            <label> Age Group </label> 
                            <select value={ageGroup} onChange={changeAgeGroup}>
                                {ageDropDown.map((ageCategory) => (
                                    <RenderAgeDropdown data={ageCategory} />
                                ))}
                            </select>
                        </div>
                    <button className='btn' onClick={ () => updateActivity(id)}> Update Activity </button>                        
                </div>                
                </div>

                <div id='delete-form'>
                    <button className='closebtn' onClick={closeForm}>
                        <IonIcon icon={closeCircleOutline} />
                    </button>
                    <div className='form'>
                        <h1>Delete Activity</h1>
                            <p>Are you sure you wish to delete the following participant?</p>
                            <div className='form-ele'>
                                <label> ID: </label>
                                <input type='text' readOnly={true} value={id} />
                            </div>
                            <div className='form-ele'>
                                <label> Name: </label>
                                <input type='text' readOnly={true} value={name} />                                
                            </div>
                        <button className='btn' onClick={() => deleteActivity(id)}> Delete Activity </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Activities;