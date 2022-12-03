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

    // forceUpdate used to rerender table component dynamically
    // useReducer implementation taken from https://www.youtube.com/watch?v=Nxe-9PkP8Nw

    useEffect(() => {
        const getActivities = async () => {
            try {
                const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/activityData')
                setActivities(result.data)
                setRealActivities(result.data)
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

    useEffect (() => {
        const populateLocDrop = async () => {
        try {
            const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/locationData')
            setLocationDropdown(result.data)
        } catch (err) {
            console.log(err)
        }
        }
        populateLocDrop()
    }, [renderNew]);    

    // Get data to Generate Volunteers Dropdown
    const [volunteerDropDown, setVolunteerDropdown] = useState([])

    useEffect(() => {
        const populateVolDrop = async () => {
        try {
            const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/volunteerData')
            setVolunteerDropdown(result.data)
        } catch (err) {
            console.log(err)
        }
        }
        populateVolDrop()
    }, [renderNew]);

    // Get data to Generate Age Groups Dropdown
    const [ageDropDown, setAgeDropdown] = useState([])

    useEffect(() => {
        const populateAgeDrop = async () => {
        try {
            const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/ageGroupData')
            setAgeDropdown(result.data)
        } catch (err) {
            console.log(err)
        }
        }
        populateAgeDrop()
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

    /// Data for UPDATE
    const edit = (activityData) => {
        setActivityId(activityData.activity_id)
        setActivityLocation(activityData.real_location)
        setActivityVolunteer(activityData.real_volunteer)
        setActivityAgeGroup(activityData.real_age)
        setActivityName(activityData.name)
        setActivityDescription(activityData.description)
        setActivityMaxPart(activityData.max_participants)
        showform("edit")
    };

    /// Data for DELETE
    const del = (activityData) => {
        setActivityId(activityData.activity_id)
        setActivityName(activityData.name)
        showform("delete")
    };

    /// Data for INSERT
    const add = () => {
        showform("insert")
    };

    const closeForm = () => {
        clearState()
        showform("close")
    };

    const clearState = () => {
        setActivityId("")
        setActivityLocation("")
        setActivityVolunteer("")
        setActivityAgeGroup("")
        setActivityName("")
        setActivityDescription("")
        setActivityMaxPart("")
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
                age_group: ageGroup, 
                name: name, 
                description: description, 
                max_participants: maxPart
            })
        } catch(err){
            console.log(err.data)
        } finally {
            forceUpdate()
            closeForm()
            clearState()
        }
    }; 

    const updateActivity = async (activityID) => {
        try {
            await Axios.put(`http://flip2.engr.oregonstate.edu:10725/activities/${activityID}`,
            {
                location_id: location, 
                volunteer_id: volunteer, 
                age_group: ageGroup, 
                name: name, 
                description: description, 
                max_participants: maxPart
            })
        } catch(err){
            console.log(err)
        } finally {
            forceUpdate()
            closeForm()
            clearState()
        }
    }; 

    const deleteActivity = async (activityID) => {
        try {
            await Axios.delete(`http://flip2.engr.oregonstate.edu:10725/activities/${activityID}`)
        } catch(err){
            console.log(err)
        } finally {
            forceUpdate()
            closeForm()
        }
    };

    // Search Bar Functionality.
    // Created using modified code found from:
    // https://www.youtube.com/watch?v=CO1T4YeYC_Y

    const [realActivities, setRealActivities] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchDropData, setSearchDrop] = useState('');

    const tableSearch = (e) => {
        if(e.length > 0) {
            let searchData=activities.filter((col) => col[searchDropData].toLowerCase().includes(e.toLowerCase()));
            setActivities(searchData)
        } else {
            setActivities(realActivities);
        }
        setSearch(e)
    }

    // Render the Page
    return (
        <div className='main'>
            <h1 id="page-header"> Activities Page </h1>
            <div id="table-div">
                <div id="search-div">
                    <select className='search-drop' onChange={(e) => setSearchDrop(e.target.value)}>
                        <option disabled selected value> Select a Search Filter </option>
                        <option value='location_id'> Location </option>
                        <option value='volunteer_id'> Volunteer </option>
                        <option value='age_group'> Age Group </option>
                        <option value='name'> Name </option>
                    </select>
                    <input type="text" className="search-input" value={search} placeholder='Search' onChange={
                        (e) => tableSearch(e.target.value)
                    }/>
                </div>
                <RenderTable dataSet={activities} headerSet={activityHeaders} edit={edit} del={del} /> 
            </div>

            <div id='insert-button'>
                <button id='add-button' onClick={add}>Add New Activity</button>
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
                            <input type='text' value={maxPart} onChange={(e) => {
                                setActivityMaxPart(e.target.value)
                            }}/>
                        </div>
                        <div className='form-ele'>
                            <label> Location </label> 
                            <select value={location} onChange={(e) => {
                                setActivityLocation(e.target.value)
                            }}>
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
                                {ageDropDown.map((ageCategory) => (
                                    <RenderAgeDropdown data={ageCategory} />
                                ))}
                            </select>
                        </div>
                    <button className='btn' onClick={insertActivity}> Add Activity </button>                        
                </div>                
                </div>

                <div id='update-form'>
                    <button className='closebtn' onClick={closeForm}>
                        <IonIcon icon={closeCircleOutline} />
                    </button>

                <div className='form'>
                    <h1>Update Activity</h1>
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
                            <input type='text' value={maxPart} onChange={(e) => {
                                setActivityMaxPart(e.target.value)
                            }}/>
                        </div>
                        <div className='form-ele'>
                            <label> Location </label> 
                            <select value={location} onChange={(e) => {
                                setActivityLocation(e.target.value)
                                }}>
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
                                <input className='del-box' type='text' readOnly={true} value={id} />
                            </div>
                            <div className='form-ele'>
                                <label> Name: </label>
                                <input className='del-box' type='text' readOnly={true} value={name} />                                
                            </div>
                        <button className='btn' onClick={() => deleteActivity(id)}> Delete Activity </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Activities;