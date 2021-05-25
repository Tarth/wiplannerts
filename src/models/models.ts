export interface ConfirmationDialogProp {
  open: boolean;
  setOpen: (open: boolean) => void;
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
export interface Worker {
  id: number;
  name: string;
}

export interface JobsStateProps {
  description: string;
  setDescription: (description: string) => void;
  startDate: string | undefined;
  setStartDate: (date: string | undefined) => void;
  endDate: string | undefined;
  setEndDate: (date: string | undefined) => void;
  workers: Worker[];
  selectedWorkers: Worker[];
  setSelectedWorkers: (worker: Worker[]) => void;
  tasks: Job_Worker[];
  setTasks: (job: Job_Worker[]) => void;
  selectedTasks: Job_Worker;
  setSelectedTasks: (job: Job_Worker) => void;
  usrAlert: AlertProp;
  setUsrAlert: (usralert: AlertProp) => void;
  isStartValid: boolean;
  setIsStartValid: (isStartValid: boolean) => void;
  isEndValid: boolean;
  setIsEndValid: (isEndValid: boolean) => void;
}

export interface JobFormProp {
  description: string;
  setDescription: (description: string) => void;
  startDate: string | undefined;
  setStartDate: (date: string | undefined) => void;
  endDate: string | undefined;
  setEndDate: (date: string | undefined) => void;
  workers: Worker[];
  selectedWorkers: Worker[];
  setSelectedWorkers: (worker: Worker[]) => void;
  selectedTasks?: Job_Worker;
  tasks?: Job_Worker[];
  setTasks?: (job: Job_Worker[]) => void;
  usrAlert: AlertProp;
  setUsrAlert: (usralert: AlertProp) => void;
  isStartValid: boolean;
  setIsStartValid: (isStartValid: boolean) => void;
  isEndValid: boolean;
  setIsEndValid: (isEndValid: boolean) => void;
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
