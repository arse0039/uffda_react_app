import React from 'react';

const RenderAgeDropdown = ({data}) => {
    return(
        <option value={data.age_group_id}>{data.description}</option>  
    )
}

export default RenderAgeDropdown;