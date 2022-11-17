import React from 'react';

const RenderActivityDropdown = ({data}) => {
    return(
        <option value={data.activity_id}>{data.name}</option>
    )
}

export default RenderActivityDropdown;