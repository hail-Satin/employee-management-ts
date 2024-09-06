import React, { useEffect, useState } from 'react';
import EmployeeTable from '../../components/employeeTable';
import EmployeeForm from '../../components/employeeForm';
import { fetchEmployeesData } from '../../services/employeeService';
import axios from 'axios';
import { Toast, ToastContainerComponent } from '../../components/toast';


const EmployeeManagement = () => {
    const formInitialState = {
        _id : '',
        first_name: '',
        last_name: '',
        salutation: 'Mr.',
        gender: 'Male',
        employee_number: '',
        employee_profile_colour: 'Default',
        gross_salary: '',
    };
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [disabledFields, setDisabledFields] = useState(true);
    const [formData, setFormData] = useState(selectedEmployee || formInitialState);

    const handleSelectEmployee = (employee) => {
        setDisabledFields(false);
        setSelectedEmployeeId(employee._id);
        setSelectedEmployee(employee);
    };

    const handleSaveEmployee = async () => {
        // Save or update employee logic here
        if(selectedEmployee === null){
            await axios.post(`api/` , formData)
        }else{
            const response = await axios.put(`api/${selectedEmployeeId}`, formData);
            console.log("response", response)
            if(response.data.success){
                Toast.show("Employee updated successfully", "success")
            }
        }
        handleStateReset();
    };

    
    const handleCancel = () => {
        setSelectedEmployeeId(null);
        setSelectedEmployee(null);
        setFormData(formInitialState);
        setDisabledFields(true);
    };

    const enableFields = () => {
        setDisabledFields(!disabledFields);
    }

    useEffect(() => {
      
        const fetchEmployees = async () => {
            // Fetch employees from API or local storage
            const data = await fetchEmployeesData();
            console.log("data", data)
            setEmployees(data.data);
        };
        fetchEmployees();
    }, [])
    
    useEffect(() => {
        let newGender = 'Mr.';
        let formattedValue = '';
        if(formData && formData.salutation){
            switch(formData.salutation){
            case "Mr." : 
                newGender = 'Male';
                break;
            case "Mrs." : 
                newGender = 'Female';
                break;
            case "Ms." : 
                newGender = 'Female';
                break;
            case "Dr." :
                newGender = 'Unspecified';
                break;
            default : 
                newGender = 'Unspecified';
        } 
        }

        if(formData && formData.gross_salary){
            let salary = formData.gross_salary || '';
            // remove non numeric values
            const numericValue = salary.toString().replace(/\D/g, '');
            // format with spaces
            formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }
        

        setFormData({
            ...formData,
            gender: newGender,
            gross_salary: formattedValue,
          })
    }, [formData.salutation])

    useEffect(() => {
        if(selectedEmployee !== null){
            setFormData(selectedEmployee);
        }
    }, [selectedEmployee])

    const handleStateReset = async () => {
        const updatedUsers = await fetchEmployeesData();
        setEmployees(updatedUsers);
        setSelectedEmployee(null);
        setSelectedEmployeeId(null);
        setFormData(formInitialState);
        setDisabledFields(false);
    }

    return (
        <div className="employee-management">
            
            <EmployeeTable selectedEmployeeId={selectedEmployeeId} enableFields={enableFields} employees={employees} onSelect={handleSelectEmployee} />
            <EmployeeForm
                enabledFields={disabledFields}
                formData={formData} 
                setFormData={setFormData}
                selectedEmployee={selectedEmployee}
                onSave={handleSaveEmployee}
                onCancel={handleCancel}
            />
            <ToastContainerComponent /> 
        </div>
    );
};

export default EmployeeManagement;
