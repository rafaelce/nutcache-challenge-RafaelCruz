import { createContext, useContext } from "react";
import EmployeeStore from "./employeeStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
  employeeStore: EmployeeStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
}

export const store: Store = {
  employeeStore: new EmployeeStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
