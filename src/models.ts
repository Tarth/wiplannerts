export interface Job {
  username: string;
  description: string;
  start: Date;
  end: Date;
  id: Number;
}
export interface DbJob {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  job_id: number;
}
export interface Worker {
  id: Number;
  name: string;
}
