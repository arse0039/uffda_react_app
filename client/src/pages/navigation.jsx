import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <header id='header'>
            <h1 className="mainTitle">Uffda Recreations</h1>
            <div className="nav-div">
                <ul className="navbar">
                    <li>
                        <Link to='.\activities' className='links'>
                            <span>Activities</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='.\participants' className='links'>
                            <span>Participants</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='.\volunteers' className='links'>
                            <span>Volunteers</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='.\ageGroups' className='links'>
                            <span>Age Groups</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='.\locations' className='links'>
                            <span>Locations</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='.\enrollments' className='links'>
                            <span>Enrollments</span>
                        </Link>
                    </li>
                </ul>  
            </div>
        </header>
    )
}

export default Navigation;