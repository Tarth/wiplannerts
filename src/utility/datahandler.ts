import { Job_Worker, DbJob, Worker } from "../models/models";

const apiUrl = process.env.REACT_APP_API_URL;
const apiPort = process.env.REACT_APP_API_PORT;
const nodeEnv = process.env.NODE_ENV;
let protocol = "";

if (nodeEnv === "development") {
  protocol = "http";
} else {
  protocol = "https";
}

const url = `${protocol}://${apiUrl}:${apiPort}`;
const axios = require("axios").default;

const PostWorkerToDB = async (
  localurl: string,
  _username: string,
  _usergroup: string,
  _password: string,
  _state: string,
  _workername?: string
) => {
  try {
    let res = await axios.post(
      localurl,
      {
        username: _username,
        usergroup: _usergroup,
        password: _password,
        workername: _workername,
      },
      { headers: { Authorization: `Bearer ${_state as string}` } }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

// Post a new worker into the DB
export const PostWorker = async (
  username: string,
  usergroup: string,
  password: string,
  state: string,
  workername?: string
) => {
  try {
    const response = await PostWorkerToDB(
      `${url}/users`,
      username,
      usergroup,
      password,
      state,
      workername
    );
    return response;
  } catch (err) {
    throw err;
  }
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
        workerid: workersOnJob,
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
  PostJobToDB(`${url}/jobs`, start_date, end_date, description, workersOnJob, state)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

//General purpose Get data from db function. The parameters are optional and is used to call different queries from the frontend.
const GetDataFromDB = async (
  localurl: string,
  state: string,
  parameters?: { querySelector: string }
) => {
  try {
    let requestConfig = { headers: { Authorization: `Bearer ${state}` } };
    if (parameters !== undefined) {
      let queryConfig = { params: parameters };
      Object.assign(requestConfig, queryConfig);
    }
    let res = await axios.get(localurl, requestConfig);
    return res;
  } catch (error) {
    return error;
  }
};

export const GetWorkers = async (
  setState: (workers: Worker[]) => void,
  state: string,
  params?: { querySelector: string }
) => {
  GetDataFromDB(`${url}/users`, state as string, params)
    .then((res) => {
      const dbdata = res.data as Worker[];
      const data = dbdata.map((x) => ({ id: x.id, name: x.name }));
      setState(data);
    })
    .catch((e) => {
      return e;
    });
};

export const GetJobs = async (setState: (jobs: Job_Worker[]) => void, state: string | null) => {
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

const DeleteJobFromDB = async (localurl: string, job_id: number, state: string) => {
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
  DeleteJobFromDB(`${url}/jobs`, job_id, state as string)
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
        workerid: workersOnJob,
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
    `${url}/jobs`,
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

const PostLoginToDB = async (localurl: string, _username: string, _password: string) => {
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
