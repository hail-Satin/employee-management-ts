import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeForm from '../employeeForm';
import { vi } from 'vitest';
import React from 'react';

test('renders EmployeeForm and handles input changes', () => {
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();
  const mockSetFormData = vi.fn();

  const { container } = render(
    <EmployeeForm
      enabledFields={false}
      selectedEmployee={null}
      onSave={mockOnSave}
      onCancel={mockOnCancel}
      formData={{
        first_name: '',
        last_name: '',
        salutation: 'Mr.',
        gender: 'Male',
        employee_number: '',
        employee_profile_colour: 'Default',
        gross_salary: '',
      }}
      setFormData={mockSetFormData}
    />
  );

  // Test if the component renders correctly
  expect(screen.getByText(/Employee Information/i)).toBeInTheDocument();

  // Test input change handling
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  expect(mockSetFormData).toHaveBeenCalled();

  // Test form submission
  fireEvent.click(screen.getByText(/Save/i));
  expect(mockOnSave).toHaveBeenCalled();
});
