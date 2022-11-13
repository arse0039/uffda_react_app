import React, {useState, useEffect, useReducer } from 'react';
import Axios from 'axios';
import TableHeader from '../components/tableHeader'
import TableData from '../components/tableData';


const Test = () => {
    const [volHeaders, setColHeaders] = useState([]);
    let headerTest = []

    useEffect(() => {
        const populateHeaders = async () => {
            try {
                const res = await Axios.get('http://localhost:3001/volunteersCol')
                setColHeaders(res.data)
            } catch (err) {
                console.log(err)
            } 
        }
        populateHeaders();
    });
    
    const headerPop = () => {
        volHeaders.map((e) => {
            headerTest.push(e.Field)
        })
    }
    headerPop()

    const [volunteers, setVolunteers] = useState([]); // Receives data from DB via get request
    const [renderNew, forceUpdate] = useReducer(x => x+1,0); //allows for auto-rendering of the component page

    useEffect(() => {
        const getVolunteers = async () => {
            try {
            const result = await Axios.get('http://localhost:3001/volunteersData')
            setVolunteers(result.data)
            console.log(result.data)
            } catch(err) {
                console.log(err)
            }
        };
        getVolunteers();
    }, [renderNew]);


    return(
        <div>
            <table>
                <thead>
                    {headerTest.map((col) => (                
                        <TableHeader data={col}/>
                    ))}
                <th></th>
                </thead>
                <tbody>
                    {volunteers.map((user) => (
                        <TableData data={user} headers={headerTest} />                     
                     ))}
                </tbody>
            </table>
        </div>
    )
}

export default Test;