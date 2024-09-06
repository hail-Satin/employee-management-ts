import { EmployeeT } from "../util/types";
import React, {useEffect, useState} from 'react';

const EmployeeTable = ({employees, onSelect, enableFields, selectedEmployeeId}) => {
   
    
    return (
        <div>
            <div className="form-buttons">
            <button className="table-button" onClick={enableFields}>Add Employee</button>
            </div>
           <table className="employee-table">
            <thead>
                <tr>
                    <th>Employee #</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Salutation</th>
                    <th>Profile Colour</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee : EmployeeT) => (
                    <tr key={employee.employee_number} onClick={() => onSelect(employee)}  className={
                        employee._id === selectedEmployeeId ? 'selected-row' : ''
                      }>
                        <td onClick={() => onSelect(employee)}>{employee.employee_number}</td>
                        <td onClick={() => onSelect(employee)}>{employee.first_name}</td>
                        <td onClick={() => onSelect(employee)}>{employee.last_name}</td>
                        <td onClick={() => onSelect(employee)}>{employee.salutation}</td>
                        <td onClick={() => onSelect(employee)}>{employee.employee_profile_colour}</td>
                    </tr>
                ))}
            </tbody>
        </table>  
        </div>
       
    );
};

export default EmployeeTable;