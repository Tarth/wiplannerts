import { Job_Worker, DbJob, Worker } from "../models/models";

const url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;
const axios = require("axios").default;

const GetDataFromDB = async (localurl: string) => {
  try {
    let res = await axios.get(localurl);
    return res;
  } catch (error) {
    return error;
  }
};

const PostWorkerToDB = async (localurl: string, workername: string) => {
  try {
    let res = await axios.post(localurl, { name: workername });
    return res;
  } catch (error) {
    return error;
  }
};

// Post a new worker into the DB
export const PostWorker = async (workername: string) => {
  PostWorkerToDB(`${url}/workers/add`, workername)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

// Post a new job into the DB
const PostJobToDB = async (
  localurl: string,
  start_date: string,
  end_date: string,
  description: string,
  workersOnJob: number[]
) => {
  try {
    let res = await axios.post(localurl, {
      startdate: start_date,
      enddate: end_date,
      description: description,
      workerId: workersOnJob,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const PostJob = async (
  start_date: string,
  end_date: string,
  description: string,
  workersOnJob: number[]
) => {
  PostJobToDB(
    `${url}/jobs/add`,
    start_date,
    end_date,
    description,
    workersOnJob
  )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

export const GetWorkers = async (setState: (workers: Worker[]) => void) => {
  GetDataFromDB(`${url}/workers`)
    .then((res) => {
      const dbdata = res.data as Worker[];
      const data = dbdata.map((x) => ({ id: x.id, name: x.name }));
      setState(data);
    })
    .catch((e) => {
      return e;
    });
};

export const GetJobs = async (setState: (jobs: Job_Worker[]) => void) => {
  GetDataFromDB(url)
    .then((res) => {
      const dbdata = res.data as DbJob[];
      const data = dbdata.map(
        (x) =>
          ({
            description: x.description,
            id: x.job_id,
            worker: { id: x.worker_id, name: x.name },
            start: new Date(x.start_date),
            end: new Date(x.end_date),
          } as Job_Worker)
      );
      setState(data);
    })
    .catch((e) => {
      return e;
    });
};

const DeleteJobFromDB = async (localurl: string, job_id: number) => {
  try {
    let res = await axios.delete(localurl, {
      data: {
        jobid: job_id,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
export const DeleteJob = async (job_id: number) => {
  DeleteJobFromDB(`${url}/jobs/delete`, job_id)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

const UpdateJobInDB = async (
  localurl: string,
  start_date: string,
  end_date: string,
  description: string,
  workersOnJob: number[],
  job_id: number
) => {
  try {
    let res = await axios.put(localurl, {
      startdate: start_date,
      enddate: end_date,
      description: description,
      workerId: workersOnJob,
      jobid: job_id,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const UpdateJob = async (
  start_date: string,
  end_date: string,
  description: string,
  workersOnJob: number[],
  job_id: number
) => {
  UpdateJobInDB(
    `${url}/jobs/update`,
    start_date,
    end_date,
    description,
    workersOnJob,
    job_id
  )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};
