import { z } from "zod";

export const salutationEnum = z.enum(["Dr.", "Mr.", "Ms.", "Mrs.", "Mx."])
export const genderEnum = z.enum(["Male", "Female", "Unspecified"])
export const employeeProfileColourEnum = z.enum(["Green", "Blue", "Red", "Default"])
export const employeeValidation = z.object({
    _id : z.string(),
    first_name : z.string(),
    last_name : z.string(),
    salutation : salutationEnum,
    gender : genderEnum,
    employee_number : z.string(),
    employee_profile_colour : employeeProfileColourEnum,
    gross_salary : z.number(),
    soft_deleted : z.boolean()
  });

  export type EmployeeT = z.infer<typeof employeeValidation>;