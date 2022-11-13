import React from 'react';

const RenderLocationDropdown = ({data}) => {
    return(
        <option value={data.location_id}>{data.name}</option>
    )
}

export default RenderLocationDropdown;