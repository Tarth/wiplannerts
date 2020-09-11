export interface Job {
  username: string;
  description: string;
  start: Date;
  end: Date;
  id: number;
}
export interface DbJob {
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

export interface MenuItem {
  label: string;
  icon: string;
  command: () => void;
}
