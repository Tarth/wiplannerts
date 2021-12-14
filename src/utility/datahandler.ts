import { Job_Worker, DbJob, Worker, JobUserDelete } from "../models/models";

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

const DeleteUserFromDB = async (localurl: string, userId: number, accessToken: string) => {
  try {
    let res = await axios.delete(localurl, {
      data: { id: userId },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const DeleteUser = async (userId: number, accessToken: string) => {
  try {
    await DeleteUserFromDB(`${url}/users`, userId, accessToken);
  } catch (error) {
    throw error;
  }
};

// Update a user in the DB
export const UpdateUser = async (
  username: string,
  usergroup: string,
  password: string,
  accessToken: string,
  id: number,
  workername?: string
) => {
  try {
    const res = await UpdateUserToDB(
      `${url}/users`,
      username,
      usergroup,
      password,
      accessToken,
      id,
      workername
    );
    return res;
  } catch (error) {
    throw error;
  }
};

const UpdateUserToDB = async (
  localurl: string,
  _username: string,
  _usergroup: string,
  _password: string,
  _accessToken: string,
  _id: number,
  _workername?: string
) => {
  try {
    let res = await axios.put(
      localurl,
      {
        username: _username,
        usergroup: _usergroup,
        password: _password,
        workername: _workername,
        id: _id,
      },
      { headers: { Authorization: `Bearer ${_accessToken as string}` } }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

// Post a new worker into the DB
export const PostUser = async (
  username: string,
  usergroup: string,
  password: string,
  accessToken: string,
  workername?: string
) => {
  try {
    const res = await PostUserToDB(
      `${url}/users`,
      username,
      usergroup,
      password,
      accessToken,
      workername
    );
    if (res.data.isSuccess === true) {
      return res;
    }
    if (res.data.data.hasOwnProperty("detail")) {
      let { code } = res.data.data;
      if (code === "23505") {
        throw "Brugernavn findes allerede";
      }
    }
  } catch (error) {
    throw error;
  }
};

const PostUserToDB = async (
  localurl: string,
  _username: string,
  _usergroup: string,
  _password: string,
  _accessToken: string,
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
      { headers: { Authorization: `Bearer ${_accessToken as string}` } }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const PostJob = async (
  start_date: string,
  end_date: string,
  description: string,
  workersOnJob: number[],
  accessToken: string | null
) => {
  PostJobToDB(`${url}/jobs`, start_date, end_date, description, workersOnJob, accessToken)
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
  accessToken: string | null
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
      { headers: { Authorization: `Bearer ${accessToken as string}` } }
    );
    return res;
  } catch (error) {
    return error;
  }
};

const GetUsers = async (accessToken: string, params?: { querySelector?: string; id?: number }) => {
  try {
    const res = await GetDataFromDB(`${url}/users`, accessToken as string, params);
    const dbdata = res.data as Worker[];
    const data = dbdata.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      usergroup_id: user.usergroup_id,
      password: user.password,
    }));
    return data;
  } catch (error) {
    return error;
  }
};

//General purpose Get data from db function. The parameters are optional and is used to call different queries from the frontend.
const GetDataFromDB = async (
  localurl: string,
  accessToken: string,
  parameters?: { querySelector?: string; id?: number }
) => {
  try {
    let requestConfig = { headers: { Authorization: `Bearer ${accessToken}` } };
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

export const GetUsersReturn = async (accessToken: string, params?: { querySelector: string }) => {
  const promise = await GetUsers(accessToken, params);
  return promise;
};

export const GetUsersAsState = async (
  accessToken: string,
  setState: (workers: Worker[]) => void,
  params?: { querySelector: string }
) => {
  const res = await GetUsers(accessToken, params);
  setState(res as Worker[]);
};

export const GetJobsReturn = async (accessToken: string | null, params?: { id: number }) => {
  const res = await GetJobData(accessToken, params);
  return res;
};

export const GetJobsState = async (
  accessToken: string | null,
  setState: (jobs: Job_Worker[]) => void,
  params?: { id: number }
) => {
  const res = await GetJobData(accessToken, params);
  setState(res as Job_Worker[]);
};

const MapJob_Worker = (res: DbJob[]) => {
  const data = res.map(
    (x) =>
      ({
        description: x.description,
        id: x.job_id,
        worker: { id: x.worker_id, name: x.name },
        start: new Date(x.start_date),
        end: new Date(x.end_date),
      } as Job_Worker)
  );
  return data;
};

export const GetJobData = async (accessToken: string | null, params?: { id: number }) => {
  try {
    console.log("");
    const res = await GetDataFromDB(`${url}/calendar`, accessToken as string, params);
    let data: Job_Worker[] | JobUserDelete[] = [];
    if (res.data.length > 0) {
      if (res.data[0].hasOwnProperty("description")) {
        data = MapJob_Worker(res.data);
      } else {
        data = res.data;
      }
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const DeleteJob = async (job_id: number | number[], accessToken: string | null) => {
  DeleteJobFromDB(`${url}/jobs`, job_id, accessToken as string)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

const DeleteJobFromDB = async (
  localurl: string,
  job_id: number | number[],
  accessToken: string
) => {
  try {
    let res = await axios.delete(localurl, {
      data: {
        jobid: job_id,
      },
      headers: { Authorization: `Bearer ${accessToken}` },
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
  job_id: number,
  accessToken: string | null
) => {
  UpdateJobInDB(
    `${url}/jobs`,
    start_date,
    end_date,
    description,
    workersOnJob,
    job_id,
    accessToken as string
  )
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
  accessToken: string
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
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
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

export const IsAccessTokenValid = async (accessToken: string | null) => {
  try {
    await axios.get(`${url}/validate`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return true;
  } catch {
    return false;
  }
};

export const GetAccessTokenFromRefresh = async (refreshToken: string) => {
  try {
    const res = await axios.post(`${url}/token`, { token: refreshToken });
    return res.data.accessToken;
  } catch (error) {
    throw error;
  }
};
