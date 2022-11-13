import React, {useState, useEffect, useReducer} from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline} from 'ionicons/icons';
import Axios from 'axios';
import RenderTable from '../components/tableComponent';

const Volunteers = () => {
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

    const [volunteers, setVolunteers] = useState([]); // Receives data from DB via get request
    const [renderNew, forceUpdate] = useReducer(x => x+1,0); //allows for auto-rendering of the component page

    useEffect(() => {
        const getVolunteers = () => {
        Axios.get('http://flip2.engr.oregonstate.edu:10725/volunteerData').then(result =>{
            setVolunteers(result.data)
            console.log(result.data)
        })};
        getVolunteers();
    }, [renderNew]); // adding renderNew to the dependency array here forces the useEffect function to
    // run whenever there is a change to the received item. 

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
        populateHeaders();
    });
    
    const headerPop = () => {
        volunteerColumns.map((e) => {
            volunteerHeaders.push(e.Field)
        })
    }
    headerPop()

    ///////////////////////////////////////////////////////////////////
    /// Form Block for Getting Data from user for forms/CRUD operations
    ///////////////////////////////////////////////////////////////////
    const [id, setVolunteerId] = useState("");
    const [name, setVolunteerName] = useState("");
    const [email, setVolunteerEmail] = useState("");
    const [role, setVolunteerRole] = useState("");

    const edit = (volData) => {
        setVolunteerId(volData.volunteer_id)
        setVolunteerName(volData.name)
        setVolunteerEmail(volData.email)
        setVolunteerRole(volData.role)
        showform("edit");}
    
    const del = (volData) => {
        setVolunteerId(volData.volunteer_id)
        setVolunteerName(volData.name)
        showform("delete");}

    const add = () => {showform("insert");}

    const closeForm = () => {
        clearState()
        showform("close")
    ;}

    const clearState = () => {
        setVolunteerId('')
        setVolunteerName('')
        setVolunteerEmail('')
        setVolunteerRole('')
    };

    const changeRole = (e) => {
        setVolunteerRole(e.target.value)
    }

    const insertVol = async () => {
        try {
            await Axios.post('http://flip2.engr.oregonstate.edu:10725/volunteersInsert', {name: name, email:email, role:role})  
        } catch(err){
            console.log(err)
        }
        closeForm()
        clearState()  
        forceUpdate(); // forces rerender of table component
    };

    const updateVol = async (volID) => {
        try {
            await Axios.put(`http://flip2.engr.oregonstate.edu:10725/volunteers/${volID}`, {name: name, email:email, role:role})
        } catch(err){
            console.log(err)
        }   
        closeForm();   
        forceUpdate(); // forces rerender of table component
    };

    const delVol = async (volID) => {
        try{
            await Axios.delete(`http://flip2.engr.oregonstate.edu:10725/volunteers/${volID}`)
        } catch(err) {
            console.log(err)
        }  
        closeForm();
        forceUpdate(); // forces rerender of table component
    };

    return ( 
    <div className="main">
        <div id="table-div">
            <div id="search-div">
                <input type="text" className="search-input" placeholder="Name Filter"/>
                <input type="text" className="search-input" placeholder="Role Filter"/>
            </div> 
        <RenderTable dataSet={volunteers} headerSet={volunteerHeaders} edit={edit} del={del}   />
        </div>

        <div className="insert-button">
            <button className="add-button" onClick={add}>Add New Volunteer</button>
        </div>

        <div>
            <div id="insert-form">
                <button className="closebtn" onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <div className="form">
                    <h1>Add Volunteer</h1>
                    <div className="form-ele">
                        <label> Name </label> 
                        <input type="text" value={name} onChange={(e) =>{
                            setVolunteerName(e.target.value)
                        }}/>
                    </div>
                    <div className="form-ele">
                        <label> Email </label> 
                        <input type="email" value={email}  onChange={(e) => {
                            setVolunteerEmail(e.target.value)
                        }}/>
                    </div>
                    <div className="form-ele">
                        <label> Role </label> 
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
                    </div>
                <button className="btn" onClick={insertVol}> Add Volunteer </button>
                </div> 
            </div> 

            <div id="update-form">
                <button className="closebtn" onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>

                <div className='form'>
                    <h1>Update Volunteer</h1>
                        <div className="form-ele">
                            <label> Name </label> 
                            <input type="text" placeholder={name} onChange = {(e) => {
                                setVolunteerName(e.target.value)
                        }}/>
                        </div>
                        <div className="form-ele">
                            <label> email </label> 
                            <input type="email" placeholder={email} onChange = {(e) => {
                                setVolunteerEmail(e.target.value)
                        }}/>
                        </div>
                        <div className="form-ele">
                            <label> role </label> 
                            <select value={role} onChange={changeRole}>
                                <option value=''> </option>
                                <option value="Instructor">Instructor</option>
                                <option value="Coach">Coach</option>
                                <option value="Head Coach">Head Coach</option>
                                <option value="Assistant Coach">Assistant Coach</option>
                                <option value="Guide">Guide</option>
                            </select>
                        </div>

                    <button className="btn" onClick={() => updateVol(id)}>Update Volunteer</button> 
                </div>   
            </div>

            <div id="delete-form">
                <button className="closebtn" onClick={closeForm}>
                    <IonIcon icon={closeCircleOutline} />
                </button>
                <div className="form">
                    <h1>Delete Existing Volunteer</h1>
                        <p>Are you sure you wish to delete the following?</p>
                        <div className="form-ele">
                            <label>ID:</label>
                            <input type="text" readOnly={true} value={id}/>
                        </div>
                        <div className="form-ele">
                            <label>Name:</label> 
                            <input type="text" readOnly={true} value={name} />
                        </div>
                    <input className="btn" type="submit" id="deleteVolunteer" value="Delete Volunteer" onClick={()=> delVol(id)}/>
                </div> 
            </div>
        </div>
    </div>
    )
};

export default Volunteers;