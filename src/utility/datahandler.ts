import { Job_Worker, DbJob, Worker } from "../models/models";

const url = `https://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;
const axios = require("axios").default;

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
  workersOnJob: number[],
  state: string | null
) => {
  try {
    let res = await axios.post(
      localurl,
      {
        startdate: start_date,
        enddate: end_date,
        description: description,
        workerId: workersOnJob,
      },
      { headers: { Authorization: `Bearer ${state as string}` } }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const PostJob = async (
  start_date: string,
  end_date: string,
  description: string,
  workersOnJob: number[],
  state: string | null
) => {
  PostJobToDB(
    `${url}/jobs/add`,
    start_date,
    end_date,
    description,
    workersOnJob,
    state
  )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

const GetDataFromDB = async (localurl: string, state: string) => {
  try {
    let res = await axios.get(localurl, {
      headers: { Authorization: `Bearer ${state}` },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const GetWorkers = async (
  setState: (workers: Worker[]) => void,
  state: string
) => {
  GetDataFromDB(`${url}/workers`, state as string)
    .then((res) => {
      const dbdata = res.data as Worker[];
      const data = dbdata.map((x) => ({ id: x.id, name: x.name }));
      setState(data);
    })
    .catch((e) => {
      return e;
    });
};

export const GetJobs = async (
  setState: (jobs: Job_Worker[]) => void,
  state: string | null
) => {
  try {
    const res = await GetDataFromDB(`${url}/calendar`, state as string);
    if (res.hasOwnProperty("response")) {
      throw new Error(res.response.data);
    } else {
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
      return data;
    }
  } catch (error) {
    return error;
  }
};

const DeleteJobFromDB = async (
  localurl: string,
  job_id: number,
  state: string
) => {
  try {
    let res = await axios.delete(localurl, {
      data: {
        jobid: job_id,
      },
      headers: { Authorization: `Bearer ${state}` },
    });
    return res;
  } catch (error) {
    return error;
  }
};
export const DeleteJob = async (job_id: number, state: string | null) => {
  DeleteJobFromDB(`${url}/jobs/delete`, job_id, state as string)
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
  job_id: number,
  state: string
) => {
  try {
    let res = await axios.put(
      localurl,
      {
        startdate: start_date,
        enddate: end_date,
        description: description,
        workerId: workersOnJob,
        jobid: job_id,
      },
      {
        headers: { Authorization: `Bearer ${state}` },
      }
    );
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
  job_id: number,
  state: string | null
) => {
  UpdateJobInDB(
    `${url}/jobs/update`,
    start_date,
    end_date,
    description,
    workersOnJob,
    job_id,
    state as string
  )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

const PostLoginToDB = async (
  localurl: string,
  _username: string,
  _password: string
) => {
  try {
    let res = await axios.post(localurl, {
      username: _username,
      password: _password,
    });
    return res;
  } catch (error) {
    return error;
  }
};

// Post a new worker into the DB
export const PostLogin = async (username: string, password: string) => {
  return await PostLoginToDB(`${url}/login`, username, password);
};

export const AuthenticateUser = async (accessToken: string) => {
  try {
    return await axios.get(`${url}/calendar`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    return error;
  }
};

export const GetAccessTokenFromRefresh = async (refreshToken: string) => {
  try {
    const res = await axios.post(`${url}/token`, { token: refreshToken });
    return res.data.accessToken;
  } catch (error) {
    return error;
  }
};
// export const AuthenticateUser = async (accessToken: string) => {
//   const res = await PostAccessToken(`${url}/calendar`, accessToken);
//   return res;
// };
