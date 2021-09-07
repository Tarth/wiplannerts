import { userGroups } from "../utility/usergroups";
export interface ConfirmationDialogProp {
  setDescription: (description: string) => void;
  setStartDate: (date: string | undefined) => void;
  setEndDate: (date: string | undefined) => void;
  setSelectedWorkers: (worker: Worker[]) => void;
  selectedTasks: Job_Worker;
  setUsrAlert: (usralert: AlertProp) => void;
  setTasks: (job: Job_Worker[]) => void;
  startDate: string | undefined;
}

interface Job {
  description: string;
  start: Date;
  end: Date;
  id: number;
}
export interface Job_Worker extends Job {
  worker: Worker;
}
export interface Job_WorkerArray extends Job {
  workers: Worker[];
}
export interface DbJob {
  worker_id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  job_id: number;
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  usergroup_id: number | string;
  password: string;
}

export interface Worker extends User {
  name: string;
}

interface JobProp {
  description: string;
  setDescription: (description: string) => void;
  startDate: string | undefined;
  setStartDate: (date: string | undefined) => void;
  endDate: string | undefined;
  setEndDate: (date: string | undefined) => void;
  workers: Worker[];
  selectedWorkers: Worker[];
  setSelectedWorkers: (worker: Worker[]) => void;
  usrAlert: AlertProp;
  setUsrAlert: (usralert: AlertProp) => void;
  isStartValid: boolean;
  setIsStartValid: (isStartValid: boolean) => void;
  isEndValid: boolean;
  setIsEndValid: (isEndValid: boolean) => void;
}

export interface JobsStateProps extends JobProp {
  tasks: Job_Worker[];
  setTasks: (job: Job_Worker[]) => void;
  selectedTasks: Job_Worker;
  setSelectedTasks: (job: Job_Worker) => void;
}

export interface JobFormProp extends JobProp {
  tasks?: Job_Worker[];
  selectedTasks?: Job_Worker;
  setTasks?: (job: Job_Worker[]) => void;
}

export interface AlertProp {
  type: "success" | "info" | "warning" | "error" | undefined;
  title: string;
  text: string;
}

export interface JobListProps {
  jobs: Job_Worker[];
  setTasks: (job: Job_Worker[]) => void;
  selectedTasks: Job_Worker;
  setSelectedTasks: (job: Job_Worker) => void;
  usrAlert: AlertProp;
  setUsrAlert: (usrAlert: AlertProp) => void;
}

export interface jobsstr {
  description: string;
  start: string;
  end: string;
  name: string;
  id: string;
}

export interface CalendarProps {
  date: string | undefined;
  setDate: (date: string | undefined) => void;
  isDateValid: boolean;
  setIsDateValid: (isDateValid: boolean) => void;
}

export interface InputProps {
  description: string;
  setDescription: (description: string) => void;
}

export interface Props {
  workers: Worker[];
  selectedWorkers: Worker[];
  setSelectedWorkers: (worker: Worker[]) => void;
}

export interface DateProp {
  currentDate: Date;
}

export interface CalendarDataProps {
  tasks: Job_Worker[];
  index?: number;
  currentDate?: Date;
}

export interface LoginProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  status: number;
  statusText: string;
}

export interface IsUserLoggedInProp {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userGroup?: string;
  setUserGroup?: (userGroup: string) => void;
}

export interface UserAlertProp {
  usrAlert: AlertProp;
  setUsrAlert: (usrAlert: AlertProp) => void;
}

export interface EditUserDialogProp {
  username: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  usergroup: string;
  setUsergroup: (usergroup: string) => void;
  name: string;
  setName: (name: string) => void;
  openModal: boolean;
  setOpenModal: (setOpen: boolean) => void;
  userId: number;
  setUsers: (users: Worker[]) => void;
}

export interface UserSelectBoxProp {
  userGroup: string;
  setUserGroup: (userGroup: string) => void;
  setWorkerName: (workerName: string) => void;
}

export interface DeleteUserConfirmationProp {
  userId: number;
  setUsers: (users: Worker[]) => void;
}
