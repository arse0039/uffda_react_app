import React from 'react';

const RenderVolunteerDropdown = ({data}) => {
    return(
        <option value={data.volunteer_id}>{data.name}</option>
    )
}

export default RenderVolunteerDropdown;