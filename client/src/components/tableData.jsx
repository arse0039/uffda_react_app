import React from 'react';
import { IonIcon } from '@ionic/react';
import {trashOutline, buildOutline, pencilOutline } from 'ionicons/icons';


function TableData({ data, headers, edit, del }) {
    return (
        <tr key={data}>
          {headers.map((ele) => (
                <td>{data[ele]}</td>
            ))}
             <td>
                <button className="edit-button" onClick={() => edit(data)}>
                    <IonIcon icon={pencilOutline} />
                </button><br/>
                <button className="del-button" onClick={() => del(data)}>
                    <IonIcon icon={trashOutline} />
                </button>
            </td>
        </tr>
            )        
}

export default TableData;