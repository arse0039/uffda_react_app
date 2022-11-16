import React, {useState, useEffect, useReducer} from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import Axios from 'axios';
import RenderTable from '../components/tableComponent';
import showform from '../components/ShowForm';
import RenderAgeDropdown from '../components/AgeGroupDropdown';

const Participants = () => {
  
////////////////////////////////////////////////////////////////////////////
//// Use Effect block to populate the Participants Table from the database
///////////////////////////////////////////////////////////////////////////

    // Get data for the Participants Table
    const [participants, setParticipants] = useState([]);
    const [renderNew, forceUpdate] = useReducer(x => x+1, 0);
    
    useEffect(() => {
        const getParticipants = async () => {
            try{
                const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/participantData')
                setParticipants(result.data)
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
                const res = await Axios.get('http://flip2.engr.oregonstate.edu:10725/participantCol')
                setColHeaders(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        populateHeaders()
    });

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
        try {
            const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/ageGroupData')
            setAgeDropdown(result.data)
        } catch (err) {
            console.log(err)
        }
        }
        populateAgeDrop()
    });


    ///////////////////////////////////////////////////////////////////
    /// Form Block for Getting Data from user for forms/CRUD operations
    ///////////////////////////////////////////////////////////////////

    const [id, setParticipantId] = useState("")
    const [ageGroup, setParticipantAgeGroup] = useState("")
    const [name, setParticipantName] = useState("")
    const [address, setParticipantAddress] = useState("")

    const edit = (participantData) => {
        setParticipantId(participantData.participant_id)
        setParticipantAgeGroup(participantData.age_group_id)
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
        showform("close")
    };

    const clearState = () => {
        setParticipantId('')
        setParticipantAgeGroup('')
        setParticipantName('')
        setParticipantAddress('')
    };
    
    const changeAgeGroup = (e) => {
        setParticipantAgeGroup(e)
    };

    //////////////////////////////////////////////////////
    // CRUD Request Block
    //////////////////////////////////////////////////////

    const insertPart = async () => {
        try {
            await Axios.post('http://flip2.engr.oregonstate.edu:10725/participantsInsert', {age_group_id: ageGroup, name:name, address:address})
        } catch(err){
            console.log(err)
        } finally {
            closeForm()
            clearState()
            forceUpdate()
        }
    };

    const updatePart = async (partID) => {
        try{
            await Axios.put(`http://flip2.engr.oregonstate.edu:10725/participants/${partID}`, {age_group_id: ageGroup, name:name, address:address})
        } catch(err) {
            console.log(err)
        } finally{
            closeForm()
            forceUpdate()
        }
    };

    const delPart = async (partID) => {
        try {
            await Axios.delete(`http://flip2.engr.oregonstate.edu:10725/participants/${partID}`)
        } catch(err){
            console.log(err)
        } finally {
            closeForm()
            forceUpdate()
        }
    };

    //Render the Page
    return ( 
        <div className="main">
            <div id="table-div">
                <div id="search-div">
                    <input type="text" className="search-input" placeholder="Age Group Filter"/>
                    <input type="text" className="search-input" placeholder="Name Filter"/>
                </div>
                <RenderTable dataSet={participants} headerSet={participantHeaders} edit={edit} del={del}  />
            </div>
        
            <div className="insert-button">
            <button className="add-button" onClick={add}>Add New Participant</button>
            </div>
            
            <div>
            <div id="insert-form">
                <button className="closebtn" ion-button icon-only onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <div className="form">
                    <h1>Add Participant</h1>
                        <div className="form-ele">
                            <label> Name </label> 
                            <input type="text" value={name} onChange={(e) => {
                                setParticipantName(e.target.value)
                            }}/>
                        </div>
                        <div className="form-ele">
                            <label> Age Group </label> 
                            <select value={ageGroup} onChange={(e) => {
                                setParticipantAgeGroup(e.target.value)
                                }
                            }>
                                <option value=''></option>
                                {ageDropDown.map((ageCategory) => (
                                    <RenderAgeDropdown data={ageCategory} />
                                ))}
                            </select>
                        </div>
                        <div className="form-ele"> 
                            <label> Address </label> 
                            <input type="text" onChange={(e) => {
                                setParticipantAddress(e.target.value)
                              }
                            }/>
                        </div>
                    <button className="btn" onClick={insertPart}> Add Participant </button>
                </div> 
            </div>
        
            <div id="update-form">
                <button className="closebtn" onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>
            
                <div className="form">
                    <h1>Update Participant</h1>
                        <div className="form-ele">      
                            <label> Name </label> 
                            <input type="text" placeholder={name} onChange={(e) => {
                                    setParticipantName(e.target.value)
                                }
                            }/>
                        </div>
                        <div className="form-ele">
                            <label> Age Group </label> 
                            <select value={ageGroup} onChange={(e) => changeAgeGroup(e.target.value)}>
                                {ageDropDown.map((ageCategory) => (
                                    <RenderAgeDropdown data={ageCategory} />
                                ))}
                            </select>
                        </div>
                        <div className="form-ele">
                            <label> Address </label> 
                            <input type="text" placeholder={address} onChange={(e) => {
                                    setParticipantAddress(e.target.value)
                                }   
                            } />
                        </div>
                        <button className="btn" onClick={()=> updatePart(id)}> Update Participant </button>
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
                            <input type="text" readOnly={true} value={id} />
                        </div>
                        <div className="form-ele">
                            <label> Name: </label>
                            <input type="text" readOnly={true} value={name} />
                        </div>  
                    <button className="btn" onClick={() => delPart(id)}> Delete Participant </button>
                </div> 
            </div>
        </div>
    </div>
    )
};

export default Participants;