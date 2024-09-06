// tests/EmployeeTable.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeTable from './../employeeTable';
import { EmployeeT } from '../../util/types'; 
import { vi } from 'vitest';
import React from 'react';

const mockEmployees: EmployeeT[] = [
  {
    _id: '1',
    first_name: 'John',
    last_name: 'Doe',
    salutation: 'Mr.',
    employee_number: '123',
    employee_profile_colour: 'Green',
    gender: 'Male',
    gross_salary: 50000,
    soft_deleted: false,
  },
];

test('renders EmployeeTable and handles row selection', () => {
  const mockOnSelect = vi.fn();
  const { container } = render(
    <EmployeeTable
      employees={mockEmployees}
      onSelect={mockOnSelect}
      enableFields={() => {}}
      selectedEmployeeId="1"
    />
  );

  // Test if the table renders correctly
  expect(screen.getByText(/Employee #/i)).toBeInTheDocument();

  // Test row selection
  fireEvent.click(screen.getByText(/John/i));
  expect(mockOnSelect).toHaveBeenCalled();
});
