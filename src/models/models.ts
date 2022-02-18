import { userGroups } from "../utility/usergroups";
export interface ConfirmationDialogProp {
  setDescription: (description: string) => void;
  setStartDate: (date: string | undefined) => void;
  setEndDate: (date: string | undefined) => void;
  setSelectedWorkers: (worker: Worker[]) => void;
  selectedTasks: Job_Worker;
  setUserAlert: (userAlert: AlertProp) => void;
  setTasks: (job: Job_Worker[]) => void;
  startDate: string | undefined;
  setOpenModal: (setOpenModal: boolean) => void;
}

interface Job {
  description: string;
  start: Date;
  end: Date;
  id: number;
}
export interface Job_Worker extends Job {
  worker: Worker;
  deltaDays?: number;
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

export interface JobUserDelete {
  job_id: number;
  worker_id: number;
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
  userAlert: AlertProp;
  setUserAlert: (userAlert: AlertProp) => void;
  isStartValid: boolean;
  setIsStartValid: (isStartValid: boolean) => void;
  isEndValid: boolean;
  setIsEndValid: (isEndValid: boolean) => void;
}

export interface JobsStateProps extends JobProp, ModalAlertProp {
  tasks: Job_Worker[];
  setTasks: (job: Job_Worker[]) => void;
  selectedTasks: Job_Worker;
  setSelectedTasks: (job: Job_Worker) => void;
}

export interface JobFormProp extends JobProp {
  selectedTasks?: Job_Worker;
  tasks: Job_Worker[];
  setTasks: (job: Job_Worker[]) => void;
}

export interface JobFormPropWithModal extends JobFormProp, ModalAlertProp {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

export interface JobFormAddProp {
  description: string;
  setDescription: (description: string) => void;
  startDate: string | undefined;
  setStartDate: (date: string | undefined) => void;
  endDate: string | undefined;
  setEndDate: (date: string | undefined) => void;
  workers: Worker[];
  selectedWorkers: Worker[];
  setSelectedWorkers: (worker: Worker[]) => void;
  isStartValid: boolean;
  setIsStartValid: (isStartValid: boolean) => void;
  isEndValid: boolean;
  setIsEndValid: (isEndValid: boolean) => void;
  userAlert?: AlertProp;
  setUserAlert?: (userAlert: AlertProp) => void;
}

export interface AlertProp {
  type: "success" | "info" | "warning" | "error" | "";
  title: string;
  text: string;
}

export interface SnackbarProp {
  openSnackbar: boolean;
  setOpenSnackbar: (openSnackbar: boolean) => void;
  severity: "success" | "info" | "warning" | "error" | undefined;
  message: string;
}

export interface JobListProps {
  jobs: Job_Worker[];
  setTasks: (job: Job_Worker[]) => void;
  selectedTasks: Job_Worker;
  setSelectedTasks: (job: Job_Worker) => void;
  userAlert: AlertProp;
  setUserAlert: (userAlert: AlertProp) => void;
}

export interface Jobsstr {
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
  weekDataIndex?: number;
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

export interface IsUserLoggedInProp extends RememberMeProp {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userGroup?: string;
  setUserGroup?: (userGroup: string) => void;
}

export interface UserAlertProp {
  userAlert: AlertProp;
  setUserAlert: (userAlert: AlertProp) => void;
}

export interface ModalAlertProp {
  modalAlert: AlertProp;
  setModalAlert: (modalAlert: AlertProp) => void;
}

export interface AddUserProp
  extends ModalAlertProp,
    UserAlertProp,
    UserName,
    Password,
    WorkerName,
    UserGroup {
  openAddModal: boolean;
  setOpenAddModal: (openAddModal: boolean) => void;
  setUsers: (users: Worker[]) => void;
}

export interface EditUserDialogProp extends ModalAlertProp {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  usergroup: string;
  setUsergroup: (usergroup: string) => void;
  workerName: string;
  setWorkerName: (workerName: string) => void;
  openEditModal: boolean;
  setOpenEditModal: (setOpen: boolean) => void;
  userId: number;
  setUsers: (users: Worker[]) => void;
  userAlert: AlertProp;
  setUserAlert: (setUserAlert: AlertProp) => void;
  setLoading: (loading: boolean) => void;
}

export interface UserSelectBoxProp {
  userGroup: string;
  setUserGroup: (userGroup: string) => void;
  workerName: string;
  setWorkerName: (workerName: string) => void;
}

export interface DeleteUserConfirmationProp {
  userId: number;
  setUsers: (users: Worker[]) => void;
  HandleClose: () => void;
  setUserAlert: (userAlert: AlertProp) => void;
}

export interface ViewProp extends ModalAlertProp {
  setViews: (views: string) => void;
  userAlert: AlertProp;
  setUserAlert: (userAlert: AlertProp) => void;
}

export interface FormUserProp extends UserName, UserGroup, WorkerName, TempPassword {
  setPassword: (password: string) => void;
}

interface UserName {
  userName: string;
  setUserName: (userName: string) => void;
}

interface UserGroup {
  userGroup: string;
  setUserGroup: (userGroup: string) => void;
}

interface WorkerName {
  workerName: string;
  setWorkerName: (workerName: string) => void;
}

interface Password {
  password: string;
  setPassword: (password: string) => void;
}

interface TempPassword {
  setTempPassword?: (tempPassword: string) => void;
  setRepeatedTempPassWord?: (repeatedTempPassword: string) => void;
}

export interface SetIsLoggedInProp {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export interface GetDataWithValidToken extends SetIsLoggedInProp {
  setTasks: (tasks: Job_Worker[]) => void;
  setWorkers?: (workers: Worker[]) => void;
}

export interface RememberMeProp {
  rememberMe?: boolean;
  setRememberMe?: (rememberMe: boolean) => void;
}
