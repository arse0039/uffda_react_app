import React, {useState, useEffect, useReducer} from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline} from 'ionicons/icons';
import Axios from 'axios';
import RenderTable from '../components/tableComponent';
import showform from '../components/ShowForm';
import showError from '../components/errorDisplay';

const Volunteers = () => {

////////////////////////////////////////////////////////////////////////////
//// Use Effect block to populate the Volunteer Table from the database
///////////////////////////////////////////////////////////////////////////

    // Get data for the Volunteers Table
    const [volunteers, setVolunteers] = useState([]); // Receives data from DB via get request
    const [renderNew, forceUpdate] = useReducer(x => x+1,0); 

    // forceUpdate used to rerender table component dynamically
    // useReducer implementation taken from https://www.youtube.com/watch?v=Nxe-9PkP8Nw

    useEffect(() => {
        const getVolunteers = async () => {
            try {
                const result = await Axios.get('http://flip2.engr.oregonstate.edu:10725/volunteerData')
                setVolunteers(result.data)
                setRealVolunteers(result.data)
            } catch(err) {
                console.log(err)
            }
        }
        getVolunteers();
    }, [renderNew]); // renderNew forces the useEffect to run whenever there is a change to the received item. 

    // Pull data from the database to populate the table headers
    const [volunteerColumns, setColHeaders] = useState([]);
    let volunteerHeaders  = []

    useEffect(() => {
        const populateHeaders = async () => {
            try {
                const res = await Axios.get('http://flip2.engr.oregonstate.edu:10725/volunteerCol')
                setColHeaders(res.data)
            } catch (err) {
                console.log(err)
            } 
        }
        populateHeaders()
    });
    
    // Populate array with column header values
    const headerPop = () => {
        volunteerColumns.map((e) => {
            volunteerHeaders.push(e.Field)
        })
    }
    headerPop()

    ///////////////////////////////////////////////////////////////////
    /// Form Block for Getting Data from user for forms/CRUD operations
    ///////////////////////////////////////////////////////////////////
    
    const [id, setVolunteerId] = useState("")
    const [name, setVolunteerName] = useState("")
    const [email, setVolunteerEmail] = useState("")
    const [role, setVolunteerRole] = useState("")

    // Sets data from selected row and opens update form
    const edit = (volData) => {
        setVolunteerId(volData.volunteer_id)
        setVolunteerName(volData.name)
        setVolunteerEmail(volData.email)
        setVolunteerRole(volData.role)
        showform("edit")
    };
    
    // Sets data from selected row and opens delete form
    const del = (volData) => {
        setVolunteerId(volData.volunteer_id)
        setVolunteerName(volData.name)
        showform("delete")
    };

    // Opens blank insert form
    const add = () => {
        showform("insert")
    };

    // function to close the pop-up form
    const closeForm = () => {
        clearState()
        showError("clear-name-add")
        showError("clear-email-add")
        showError("clear-name-update")
        showError("clear-email-update")
        showError("clear-role-add"  )
        showform("close")
    };

    // clears stored data for reset of form input fields
    const clearState = () => {
        setVolunteerId('')
        setVolunteerName('')
        setVolunteerEmail('')
        setVolunteerRole('')
    };

    //////////////////////////////////////////////////////
    // CRUD Request Block
    //////////////////////////////////////////////////////

    const insertVol = async () => {
        try {
            await Axios.post('http://flip2.engr.oregonstate.edu:10725/volunteersInsert', {name: name, email:email, role:role})  
        } catch(err){
            console.log(err)
        } finally {
            forceUpdate()
            closeForm()
            clearState()            
        }
    };

    const updateVol = async (volID) => {
        try {
            await Axios.put(`http://flip2.engr.oregonstate.edu:10725/volunteers/${volID}`, {name: name, email:email, role:role})
        } catch(err){
            console.log(err)
        } finally {
            forceUpdate()
            closeForm()   
            clearState()
        }  
    };

    const delVol = async (volID) => {
        try{
            await Axios.delete(`http://flip2.engr.oregonstate.edu:10725/volunteers/${volID}`)
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

    const [realVolunteers, setRealVolunteers] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchDropData, setSearchDrop] = useState('');

    const tableSearch = (e) => {
        if(e.length > 0) {
            let searchData=volunteers.filter((col) => col[searchDropData].toLowerCase().includes(e.toLowerCase()));
            setVolunteers(searchData)
        } else {
            setVolunteers(realVolunteers);
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

        if (email === '') {
            valid = false
            showError("email-add")
        } else {
            showError("clear-email-add")
        }

        if (role === '') {
            valid = false
            showError("role-add")
        } else {
            showError("clear-role-add")
        }

        if (valid) {
            insertVol()
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

        if (email === '') {
            valid = false
            showError("email-update")
        } else {
            showError("clear-email-update")
        }

        if (valid) {
            updateVol(id)
        }
    }

    // Render the Volunteers page
    return ( 
        <div className="main">
            <h1 id="page-header"> Volunteers Page </h1>
            <div id="table-div">
                <div id="search-div">
                    <select className='search-drop' onChange={(e) => setSearchDrop(e.target.value)}>
                        <option disabled selected value> Select a Search Filter </option>
                        <option value='name'>Name</option>
                        <option value='email'>Email</option> 
                        <option value='role'>Role</option> 
                    </select>
                    <input type="text" className="search-input" value={search} placeholder='Search' onChange={
                        (e) => tableSearch(e.target.value)
                        }/>
                </div>
                <RenderTable dataSet={volunteers} headerSet={volunteerHeaders} edit={edit} del={del}   />
            </div>

            <div id="insert-button">
                <button id="add-button" onClick={add}>Add New Volunteer</button>
            </div>

            <div>
                <div id="insert-form">
                    <button className="closebtn" onClick={closeForm}>
                        <IonIcon icon={closeCircleOutline} />
                    </button>
                    <div className="form">
                        <h1>Add Volunteer</h1>
                        <h5>*Please fill in the required field</h5>
                        <div className="form-ele">
                            <label> Name* </label> 
                            <input type="text" value={name} onChange={(e) =>{
                                setVolunteerName(e.target.value)
                            }}/>
                            <span id="name-error-add">Please enter a volunteer name</span>
                        </div>
                        <div className="form-ele">
                            <label> Email* </label> 
                            <input type="email" value={email}  onChange={(e) => {
                                setVolunteerEmail(e.target.value)
                            }}/>
                            <span id="email-error-add">Please enter a volunteer email</span>
                        </div>
                        <div className="form-ele">
                            <label> Role* </label> 
                            <select value={role} onChange = {(e) => {
                                setVolunteerRole(e.target.value)
                            }}>
                                <option ></option>
                                <option value="Instructor">Instructor</option>
                                <option value="Coach">Coach</option>
                                <option value="Head Coach">Head Coach</option>
                                <option value="Assistant Coach">Assistant Coach</option>
                                <option value="Guide">Guide</option>
                            </select>
                            <span id="role-error-add">Please enter a volunteer role</span>
                        </div>
                    <button className="btn" onClick={(e) => validateDataAdd(e)}> Add Volunteer </button>
                    </div> 
                </div> 

                <div id="update-form">
                    <button className="closebtn" onClick={closeForm}>
                        <IonIcon icon={closeCircleOutline} />
                    </button>

                    <div className='form'>
                        <h1>Update Volunteer</h1>
                        <h5>*Please fill in the required field</h5>
                            <div className="form-ele">
                                <label> Name* </label> 
                                <input type="text" value={name} onChange = {(e) => {
                                    setVolunteerName(e.target.value)
                                }}/>
                                <span id="name-error-update">Please enter a volunteer name</span>
                            </div>
                            <div className="form-ele">
                                <label> Email* </label> 
                                <input type="email" value={email} onChange = {(e) => {
                                    setVolunteerEmail(e.target.value)
                                }}/>
                                <span id="email-error-update">Please enter a volunteer email</span>
                            </div>
                            <div className="form-ele">
                                <label> Role* </label> 
                                <select value={role} onChange={(e) => {
                                    setVolunteerRole(e.target.value)
                                    }}>
                                    <option value="Instructor">Instructor</option>
                                    <option value="Coach">Coach</option>
                                    <option value="Head Coach">Head Coach</option>
                                    <option value="Assistant Coach">Assistant Coach</option>
                                    <option value="Guide">Guide</option>
                                </select>
                                <span id="role-error-update">Invisible! AMAZING!</span>
                            </div>

                        <button className="btn" onClick={(e) => validateDataUpdate(e)}>Update Volunteer</button> 
                    </div>   
                </div>

                <div id="delete-form">
                    <button className="closebtn" onClick={closeForm}>
                        <IonIcon icon={closeCircleOutline} />
                    </button>
                    <div className="form">
                        <h1>Delete Existing Volunteer</h1>
                            <p>Are you sure you wish to delete the following volunteer?</p>
                            <div className="form-ele">
                                <label>ID:</label>
                                <input className="del-box" type="text" readOnly={true} value={id}/>
                            </div>
                            <div className="form-ele">
                                <label>Name:</label> 
                                <input className="del-box" type="text" readOnly={true} value={name} />
                            </div>
                        <button className="btn" onClick={()=> delVol(id)}> Delete Volunteer </button>
                    </div> 
                </div>
            </div>
        </div>
    )
};

export default Volunteers;