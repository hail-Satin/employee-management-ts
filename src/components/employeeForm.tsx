import React, { useEffect, useState } from 'react'

const EmployeeForm = ({
  enabledFields,
  selectedEmployee,
  onSave,
  onCancel,
  formData,
  setFormData,
}) => {
  const [saveButtonColor, setSaveButtonColor] = useState('default');
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSalaryChange = (e) => {
    const {name, value} = e.target;
    // remove non numeric values
    const numericValue = value.replace(/\D/g, '');
    // format with spaces
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    setFormData({
        ...formData,
        [name]: formattedValue,
      });
  }

  const handleSave = () => {
    onSave(formData)
  }

 
  

  useEffect(() => {
      switch(formData.employee_profile_colour){
          case 'Red':
              setSaveButtonColor('red');
              break;
          case 'Green':
            setSaveButtonColor('green');
              break;
          case 'Blue':
            setSaveButtonColor('blue');
              break;
          default:
            setSaveButtonColor('gray');
              break;
      }
      
  }, [formData.employee_profile_colour])


  return (
    <div className='employee-form'>
        <div className='employee-form-header'>
      <div className='employee-form-title'>
        <h2>Employee Information</h2>
      </div>

        </div>
      <div className='employee-form-container'>
        <div className='form-left'>
          <div className='form-group'>
            <label aria-label='First Name(s)'>First Name(s) *</label>
            <input
              disabled={enabledFields}
              type='text'
              name='first_name'
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label>Last Name *</label>
            <input
              disabled={enabledFields}
              type='text'
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label>Salutation *</label>
            <select
              disabled={enabledFields}
              name='salutation'
              value={formData.salutation}
              onChange={handleChange}
              required
            >
              <option value='Mr.'>Mr.</option>
              <option value='Ms.'>Ms.</option>
              <option value='Mrs.'>Mrs.</option>
              <option value='Mx.'>Mx.</option>
              <option value='Dr.'>Dr.</option>
            </select>
          </div>

          <div className='form-group'>
            <label>Gender *</label>
            <div>
              <input
                disabled={enabledFields}
                type='radio'
                name='gender'
                value='Male'
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />{' '}
              Male
              <input
                disabled={enabledFields}
                type='radio'
                name='gender'
                value='Female'
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />{' '}
              Female
              <input
                disabled={enabledFields}
                type='radio'
                name='gender'
                value='Unspecified'
                checked={formData.gender === 'Unspecified'}
                onChange={handleChange}
              />{' '}
              Unspecified
            </div>
          </div>

          <div className='form-group'>
            <label>Employee # *</label>
            <input
              disabled={enabledFields}
              type='number'
              name='employee_number'
              value={formData.employee_number}
              onChange={handleChange}
              required
              pattern='\d*'
              inputMode='numeric'
            />
          </div>
        </div>

        <div className='form-right'>
          <div className='form-group'>
            <label>Full Name</label>
            <input
              disabled={enabledFields}
              type='text'
              value={`${formData.first_name} ${formData.last_name}`}
              readOnly
            />
          </div>

          <div className='form-group'>
            <label>Gross Salary $PY</label>
            <input
              disabled={enabledFields}
              type='text'
              name='gross_salary'
              value={formData.gross_salary || ''}
              onChange={handleSalaryChange}
              required
              pattern='\d*'
              inputMode='numeric'
            />
          </div>

          <div className='form-group'>
            <label>Employee Profile Colour</label>
            <div>
              <input
                disabled={enabledFields}
                type='checkbox'
                name='employee_profile_colour'
                value='Green'
                checked={formData.employee_profile_colour === 'Green'}
                onChange={handleChange}
              />{' '}
              Green
              <input
                disabled={enabledFields}
                type='checkbox'
                name='employee_profile_colour'
                value='Blue'
                checked={formData.employee_profile_colour === 'Blue'}
                onChange={handleChange}
              />{' '}
              Blue
              <input
                disabled={enabledFields}
                type='checkbox'
                name='employee_profile_colour'
                value='Red'
                checked={formData.employee_profile_colour === 'Red'}
                onChange={handleChange}
              />{' '}
              Red
              <input
                disabled={enabledFields}
                type='checkbox'
                name='employee_profile_colour'
                value='Default'
                checked={formData.employee_profile_colour === 'Default'}
                onChange={handleChange}
              />{' '}
              Default
            </div>
          </div>

          <div className='form-buttons'>
            <button type='button' onClick={onCancel}>
              Cancel
            </button>
            <button className={`save-button-${saveButtonColor}`} disabled={enabledFields} type='button' onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeForm
