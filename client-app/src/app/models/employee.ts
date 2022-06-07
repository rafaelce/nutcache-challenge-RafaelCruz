export interface Employee {
  id: string;
  name: string;
  birthDate: Date | null;
  gender: string;
  email: string;
  cpf: string;
  startDate: Date | null;
  team: string;
}

export class Employee implements Employee {
  constructor(init?: EmployeeFormValues) {
    Object.assign(this, init);
  }
}

export class EmployeeFormValues {
  id?: string = undefined;
  name: string = "";
  birthDate: Date | null = null;
  gender: string = "";
  email: string = "";
  cpf: string = "";
  startDate: Date | null = null;
  team: string = "";

  constructor(employee?: EmployeeFormValues) {
    if (employee) {
      this.id = employee.id;
      this.name = employee.name;
      this.birthDate = employee.birthDate;
      this.gender = employee.gender;
      this.email = employee.email;
      this.cpf = employee.cpf;
      this.startDate = employee.startDate;
      this.team = employee.team;
    }
  }
}
