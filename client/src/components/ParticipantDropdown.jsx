import React from 'react';

const RenderParticipantDropdown = ({data}) => {
    return(
        <option value={data.participant_id}>{data.name}</option>
    )
}

export default RenderParticipantDropdown;