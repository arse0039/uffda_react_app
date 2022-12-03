import React, {useState, useEffect, useReducer} from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import Axios from 'axios';
import RenderTable from '../components/tableComponent';
import showform from '../components/ShowForm';
import RenderAgeDropdown from '../components/AgeGroupDropdown';
import showError from '../components/errorDisplay';

const Participants = () => {
  
////////////////////////////////////////////////////////////////////////////
//// Use Effect block to populate the Participants Table from the database
///////////////////////////////////////////////////////////////////////////

    // Get data for the Participants Table
    const [participants, setParticipants] = useState([]);
    const [renderNew, forceUpdate] = useReducer(x => x+1, 0);

    // forceUpdate used to rerender table component dynamically
    // useReducer implementation taken from https://www.youtube.com/watch?v=Nxe-9PkP8Nw
    
    useEffect(() => {
        const getParticipants = async () => {
            try{
                const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/participantData')
                setParticipants(result.data)
                setRealParticipants(result.data)
            } catch(err) {
                console.log(err)
            }
        }
        getParticipants();    
    }, [renderNew]);

    // Generate Headers for Table
    const [participantColumns, setColHeaders] = useState([])
    let participantHeaders = []

    useEffect(() => {
        const populateHeaders = async () => {
            try{
                const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/participantCol')
                setColHeaders(result.data)
            } catch(err) {
                console.log(err)
            }
        }
        populateHeaders()
    }, [renderNew]);

    const headerPop = () => {
        participantColumns.map((e) => {
            participantHeaders.push(e.Field)
        })
    }
    headerPop()

    // Get data to Generate Age Groups DropDown
    const [ageDropDown, setAgeDropdown] = useState([])

    useEffect(() => {
        const populateAgeDrop = async () => {
        try{
            const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/ageGroupData')
            setAgeDropdown(result.data)
        } catch(err) {
            console.log(err)
        }
        }
        populateAgeDrop()
    }, [renderNew]);

    ///////////////////////////////////////////////////////////////////
    /// Form Block for Getting Data from user for forms/CRUD operations
    ///////////////////////////////////////////////////////////////////

    const [id, setParticipantId] = useState("")
    const [ageGroupName, setParticipantAgeGroupName] = useState("")
    const [ageGroupID, setParticipantAgeGroupID] = useState("")
    const [name, setParticipantName] = useState("")
    const [address, setParticipantAddress] = useState("")

    const edit = (participantData) => {
        setParticipantId(participantData.participant_id)
        setParticipantAgeGroupName(participantData.age_group_id)
        setParticipantAgeGroupID(participantData.age_ID)
        setParticipantName(participantData.name)
        setParticipantAddress(participantData.address)
        showform("edit")
    };

    const del = (participantData) => {
        setParticipantId(participantData.participant_id)
        setParticipantName(participantData.name)
        showform("delete")
    };

    const add = () => {
        showform("insert")
    };

    const closeForm = () => {
        clearState()
        showError("clear-age-add")
        showError("clear-name-add")
        showError("clear-address-add")
        showError("clear-name-update")
        showError("clear-address-update")
        showform("close");
    };

    const clearState = () => {
        setParticipantId("")
        setParticipantAgeGroupName("")
        setParticipantAgeGroupID("")
        setParticipantName("")
        setParticipantAddress("")
    };
    
    //////////////////////////////////////////////////////
    // CRUD Request Block
    //////////////////////////////////////////////////////

    const insertPart = async () => {
        try {
            await Axios.post('http://flip2.engr.oregonstate.edu:10725/participantsInsert', {age_group_id: ageGroupID, name:name, address:address})
        } catch(err){
            console.log(err)
        } finally {
            forceUpdate()
            closeForm()
            clearState()
        }
    };

    const updatePart = async (partID) => {
        try{
            await Axios.put(`http://flip2.engr.oregonstate.edu:10725/participants/${partID}`, {age_group_id: ageGroupID, name:name, address:address})
        } catch(err) {
            console.log(err)
        } finally{
            forceUpdate()
            closeForm()
            clearState()
        }
    };

    const delPart = async (partID) => {
        try {
            await Axios.delete(`http://flip2.engr.oregonstate.edu:10725/participants/${partID}`)
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

    const [realParticipants, setRealParticipants] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchDropData, setSearchDrop] = useState('');

    const tableSearch = (e) => {
        if(e.length > 0) {
            let searchData=participants.filter((col) => col[searchDropData].toLowerCase().includes(e.toLowerCase()));
            setParticipants(searchData)
        } else {
            setParticipants(realParticipants);
        }
        setSearch(e)
    }

    // Form input validation
    // Created using modified code found from:
    // https://www.youtube.com/watch?v=tIdNeoHniEY
    const validateDataAdd = (e) => {
        e.preventDefault()
        let valid = true
        if (name === '') {
            valid = false
            showError("name-add")
        } else {
            showError("clear-name-add")
        }

        if (address === '') {
            valid = false
            showError("address-add")
        } else {
            showError("clear-address-add")
        }

        if (ageGroupID === '') {
            valid = false
            showError("age-add")
        } else {
            showError("clear-age-add")
        }

        if (valid) {
            insertPart()
        }
    } 

    const validateDataUpdate = (e) => {
        e.preventDefault()
        let valid = true
        if (name === '') {
            valid = false
            showError("name-update")
        } else {
            showError("clear-name-update")
        }

        if (address === '') {
            valid = false
            showError("address-update")
        } else {
            showError("clear-address-update")
        }

        if (valid) {
            updatePart(id)
        }
    } 

    //Render the Participants Page
    return ( 
        <div className="main">
            <h1 id="page-header"> Participants Page </h1>
            <div id="table-div">
            <div id="search-div">
                    <select className='search-drop' onChange={(e) => setSearchDrop(e.target.value)}>
                        <option disabled selected value> Select a Search Filter </option>
                        <option value='age_group_id'>Age Group</option>
                        <option value='name'>Name</option> 
                        <option value='address'>Address</option> 
                    </select>
                    <input type="text" className="search-input" value={search} placeholder='Search' onChange={
                        (e) => tableSearch(e.target.value)
                        }/>
                </div>
                <RenderTable dataSet={participants} headerSet={participantHeaders} edit={edit} del={del}  />
            </div>
        
            <div id="insert-button">
                <button id="add-button" onClick={add}>Add New Participant</button>
            </div>
            
            <div>
            <div id="insert-form">
                <button className="closebtn" ion-button icon-only onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <div className="form">
                    <h1>Add Participant</h1>
                    <h4>*Please fill in the required field</h4><br/>
                        <div className="form-ele">
                            <label> Name* </label> 
                            <input type="text" value={name} onChange={(e) => {
                                setParticipantName(e.target.value)
                            }}/>
                            <span id="name-error-add">Please enter a name</span>
                        </div>
                        <div className="form-ele">
                            <label> Age Group* </label>
                            <select value={ageGroupID} onChange={(e) => {
                                setParticipantAgeGroupID(e.target.value)
                                }
                            }>
                                <option disabled selected value=''>Please select an Age Group</option>
                                {ageDropDown.map((ageCategory) => (
                                    <RenderAgeDropdown data={ageCategory} />
                                ))}
                            </select>
                            <span id="age-error-add">Please select an age group</span>
                        </div>
                        <div className="form-ele"> 
                            <label> Address* </label> 
                            <input type="text" value={address} onChange={(e) => {
                                setParticipantAddress(e.target.value)
                              }
                            }/>
                            <span id="address-error-add">Please enter an address</span>
                        </div>
                    <button className="btn" onClick={(e) => validateDataAdd(e)}> Add Participant </button>
                </div> 
            </div>
        
            <div id="update-form">
                <button className="closebtn" onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>
            
                <div className="form">
                    <h1>Update Participant</h1>
                    <h4>*Please fill in the required field</h4><br/>
                        <div className="form-ele">      
                            <label> Name* </label> 
                            <input type="text" value={name} onChange={(e) => {
                                    setParticipantName(e.target.value)
                                }
                            }/>
                        </div>
                        <div className="form-ele">
                            <label> Age Group* </label> 
                            <select value={ageGroupID} onChange={(e) => {
                                setParticipantAgeGroupID(e.target.value)
                                }}>
                                {ageDropDown.map((ageCategory) => (
                                    <RenderAgeDropdown data={ageCategory} />
                                ))}
                            </select>
                        </div>
                        <div className="form-ele">
                            <label> Address* </label> 
                            <input type="text" value={address} onChange={(e) => {
                                    setParticipantAddress(e.target.value)
                                }   
                            } />
                        </div>
                        <button className="btn" onClick={(e)=> validateDataUpdate(e)}> Update Participant </button>
                </div> 
            </div>
        
            <div id="delete-form">
                <button className="closebtn" onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <div className="form">
                    <h1>Delete Participant</h1>
                        <p>Are you sure you wish to delete the following participant??</p>
                        <div className="form-ele">
                            <label>ID:</label> 
                            <input className='del-box' type="text" readOnly={true} value={id} />
                        </div>
                        <div className="form-ele">
                            <label> Name: </label>
                            <input className='del-box' type="text" readOnly={true} value={name} />
                        </div>  
                    <button className="btn" onClick={() => delPart(id)}> Delete Participant </button>
                </div> 
            </div>
        </div>
    </div>
    )
};

export default Participants;