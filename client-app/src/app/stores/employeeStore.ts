import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Employee } from "../models/employee";
import { store } from "./store";

export default class EmployeeStore {
  employeeRegistry = new Map<string, Employee>();
  selectedEmployee: Employee | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get employeesByDate() {
    return Array.from(this.employeeRegistry.values()).sort(
      (a, b) => a.startDate!.getTime() - b.startDate!.getTime()
    );
  }

  get groupedEmployees() {
    return Object.entries(
      this.employeesByDate.reduce((employees, employee) => {
        const date = format(employee.startDate!, "dd/MM/yyyy");
        employees[date] = employees[date]
          ? [...employees[date], employee]
          : [employee];
        return employees;
      }, {} as { [key: string]: Employee[] })
    );
  }

  loadEmployees = async () => {
    this.loadingInitial = true;
    try {
      const employees = await agent.Employees.list();
      employees.forEach((employee) => {
        this.setEmployee(employee);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadEmployee = async (id: string) => {
    let employee = this.getEmployee(id);
    if (employee) {
      this.selectedEmployee = employee;
      return employee;
    } else {
      this.loadingInitial = true;

      try {
        employee = await agent.Employees.details(id);
        this.setEmployee(employee);
        runInAction(() => {
          this.selectedEmployee = employee;
        });
        this.setLoadingInitial(false);
        return employee;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setEmployee = (employee: Employee) => {
    employee.startDate = new Date(employee.startDate!);
    employee.birthDate = new Date(employee.birthDate!);
    this.employeeRegistry.set(employee.id, employee);
  };

  private getEmployee = (id: string) => {
    return this.employeeRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createEmployee = async (employee: Employee) => {
    this.loading = true;
    try {
      await agent.Employees.create(employee);
      runInAction(() => {
        this.employeeRegistry.set(employee.id, employee);
        this.selectedEmployee = employee;
        this.editMode = false;
        this.loading = false;
        store.modalStore.closeModal();
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateEmployee = async (employee: Employee) => {
    this.loading = true;
    try {
      await agent.Employees.update(employee);
      runInAction(() => {
        this.employeeRegistry.set(employee.id, employee);
        this.selectedEmployee = employee;
        this.editMode = false;
        this.loading = false;
        store.modalStore.closeModal();
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteEmployee = async (id: string) => {
    this.loading = true;
    try {
      await agent.Employees.delete(id);
      runInAction(() => {
        this.employeeRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
