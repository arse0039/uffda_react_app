import React, {useState, useEffect, useReducer} from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import Axios from 'axios';
import RenderTable from '../components/tableComponent';
import showform from '../components/ShowForm';
import RenderParticipantDropdown from '../components/ParticipantDropdown';
import RenderActivityDropdown from '../components/ActivityDropdown';

const Enrollments = () => {

////////////////////////////////////////////////////////////////////////////
//// Use Effect block to populate the Participants Table from the database
///////////////////////////////////////////////////////////////////////////

    // Get data for Enrollments Table
    const [enrollments, setEnrollments] = useState([]);
    const [renderNew, forceUpdate] = useReducer(x => x+1, 0);

    // forceUpdate used to rerender table component dynamically
    // useReducer implementation taken from https://www.youtube.com/watch?v=Nxe-9PkP8Nw

    useEffect(() => {
        const getEnrollments = async () => {
            try{
                const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/enrollmentData')
                setEnrollments(result.data)
                setRealEnrollments(result.data)
            } catch(err) {
                console.log(err)
            }
        }
        getEnrollments();
    }, [renderNew]);

    // Generate Headers for Table
    const [enrollmentColumns, setColHeaders] = useState([])
    let enrollmentHeaders = []

    useEffect(() => {
        const populateHeaders = async () => {
            try{
                const res = await Axios.get('http://flip2.engr.oregonstate.edu:10725/enrollmentCol')
                setColHeaders(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        populateHeaders()
    });

    const headerPop = () => {
        enrollmentColumns.map((e) => {
            enrollmentHeaders.push(e.Field)
        })
    }
    headerPop()

    // Get data to Generate Participants Dropdown
    const [participantDropdown, setParticipantDropdown] = useState([])

    useEffect(() => {
        const populateParticipantDropdown = async () => {
            try{
                const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/participantData')
                setParticipantDropdown(result.data)
            } catch (err) {
                console.log(err)
            }
        }
        populateParticipantDropdown()
    }, [renderNew]);

    // Get data to Generate Participants Dropdown
    const [activityDropdown, setActivityDropdown] = useState([])

    useEffect(() => {
        const populateActivityDropdown = async () => {
            try{
                const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/activityData')
                setActivityDropdown(result.data)
            } catch (err) {
                console.log(err)
            }
        }
        populateActivityDropdown()
    }, [renderNew]);    

    ///////////////////////////////////////////////////////////////////
    /// Form Block for Getting Data from user for forms/CRUD operations
    ///////////////////////////////////////////////////////////////////

    const [id, setEnrollmentId] = useState("")
    const [activity, setEnrollmentActivity] = useState("")
    const [participant, setEnrollmentParticipant] = useState("")

    /// Data for UPDATE
    const edit = (enrollmentData) => {
        setEnrollmentId(enrollmentData.enrollment_id)
        setEnrollmentParticipant(enrollmentData.real_participant)
        setEnrollmentActivity(enrollmentData.real_activity)
        showform("edit")
    };

    /// Data for DELETE
    const del = (enrollmentData) => {
        setEnrollmentId(enrollmentData.enrollment_id)
        setEnrollmentParticipant(enrollmentData.participant_id)
        setEnrollmentActivity(enrollmentData.activity_id)
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
        setEnrollmentId('')
        setEnrollmentParticipant('')
        setEnrollmentActivity('')
    };

    const changeParticipant = (e) => {
        setEnrollmentParticipant(e)
    };

    const changeActivity = (e) => {
        setEnrollmentActivity(e)
    };

    //////////////////////////////////////////////////////
    // CRUD Request Block
    //////////////////////////////////////////////////////

    const insertEnrollment = async () => {
        try {
            await Axios.post('http://flip2.engr.oregonstate.edu:10725/enrollmentsInsert', {activity_id: activity, participant_id: participant})
        } catch(err){
            console.log(err)
        } finally {
            forceUpdate()
            closeForm()
            clearState()
        }
    };

    const updateEnrollment = async (enrollmentID) => {
        try{
            await Axios.put(`http://flip2.engr.oregonstate.edu:10725/enrollments/${enrollmentID}`, {activity_id: activity, participant_id: participant})
        } catch(err) {
            console.log(err)
        } finally{
            forceUpdate()
            closeForm()
            clearState()
        }
    };

    const deleteEnrollment = async (enrollmentID) => {
        try {
            await Axios.delete(`http://flip2.engr.oregonstate.edu:10725/enrollments/${enrollmentID}`)
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

    const [realEnrollments, setRealEnrollments] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchDropData, setSearchDrop] = useState('');

    const tableSearch = (e) => {
        if(e.length > 0) {
            let searchData=enrollments.filter((col) => col[searchDropData].toLowerCase().includes(e.toLowerCase()));
            setEnrollments(searchData)
        } else {
            setEnrollments(realEnrollments);
        }
        setSearch(e)
    }


    // Render the Page
    return ( 
    <div className='main'>
        <h1 id="page-header"> Enrollments Page </h1>
        <div id="table-div">
            <div id="search-div">
                <select className='search-drop' onChange={(e) => setSearchDrop(e.target.value)}>
                    <option disabled selected value> Select a Search Filter </option>
                    <option value='participant_id'> Participant </option> 
                    <option value='activity_id'> Activity </option>
                </select>
                <input type="text" class="search-input" value={search} placeholder='Search' onChange={
                    (e) => tableSearch(e.target.value)
                }/>
            </div>
            <RenderTable dataSet={enrollments} headerSet={enrollmentHeaders} edit={edit} del={del}  />
        </div>

        <div id='insert-button'>
            <button id='add-button' onClick={add}>Add New Enrollment</button>
        </div>

        <div>
            <div id='insert-form'>
                <button className='closebtn' ion-button icon-only onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <div className='form'>
                    <h1>Add Activity Enrollment</h1>
                    <h4>*Please fill in the required field</h4><br/>
                    <div className='form-ele'>
                            <label> Participant* </label>
                            <select value={participant} onChange={(e) => {
                                setEnrollmentParticipant(e.target.value)
                            }}>
                                <option value=''>Please select a Participant</option>
                                {participantDropdown.map((participantCategory) => (
                                    <RenderParticipantDropdown data={participantCategory} />
                                ))}
                            </select>
                        </div>
                        <div className='form-ele'>
                            <label> Activity* </label>
                            <select value={activity} onChange={(e) => {
                                setEnrollmentActivity(e.target.value)
                            }}>
                                <option value=''>Please select an Activity</option>
                                {activityDropdown.map((activityCategory) => (
                                    <RenderActivityDropdown data={activityCategory} />
                                ))}
                            </select>
                        </div>
                    <button className='btn' onClick={insertEnrollment}> Add Activity Enrollment </button>
                </div>
            </div>

            <div id='update-form'>
                <button className='closebtn' onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>

                <div className='form'>
                    <h1>Update Activity Enrollment</h1>
                    <div className='form-ele'>
                            <label> Participant </label>
                            <select value={participant} onChange={(e) => changeParticipant(e.target.value)}>
                                {participantDropdown.map((participantCategory) => (
                                    <RenderParticipantDropdown data={participantCategory} />
                                ))}
                            </select>
                        </div>
                    <div className='form-ele'>
                            <label> Activity </label>
                            <select value={activity} onChange={(e) => changeActivity(e.target.value)}>
                                {activityDropdown.map((activityCategory) => (
                                    <RenderActivityDropdown data={activityCategory} />
                                ))}
                            </select>
                        </div>
                    <button className='btn' onClick={() => updateEnrollment(id)}> Update Activity Enrollment </button>
                </div>
            </div>

            <div id='delete-form'>
                <button className='closebtn' onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <div className='form'>
                    <h1>Delete Activity Enrollment</h1>
                        <p>Are you sure you wish to delete the following?</p>
                        <div className='form-ele'>
                            <label>ID:</label>
                            <input type='text' readOnly={true} value={id} />
                        </div>
                        <div className='form-ele'>
                            <label>Participant</label>
                            <input className="del-box" type='text' readOnly={true} value={participant} />
                        </div>
                        <div className='form-ele'>
                            <label>Activity</label>
                            <input className="del-box" type='text' readOnly={true} value={activity} />
                        </div>
                    <button className='btn' onClick={() => deleteEnrollment(id)}> Delete Activity Enrollment </button>
                </div>
            </div>
        </div>
    </div>
    )
};

export default Enrollments;