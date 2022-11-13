import React from 'react';
import TableHeader from '../components/tableHeader'
import TableData from '../components/tableData';


const RenderTable = ({dataSet, headerSet, edit, del}) => {

    return(
        <table>
            <thead>
                {headerSet.map((col) => (                
                    <TableHeader data={col}/>
                ))}
            <th></th>
            </thead>
            <tbody>
                {dataSet.map((attr) => (
                    <TableData data={attr} headers={headerSet} edit={edit} del={del} />                     
                    ))}
            </tbody>
        </table>
    )
}

export default RenderTable;