import { worker } from "cluster";
import { Job, DbJob, Worker } from "./models";
// import { stringify } from "querystring";

const url = "http://localhost:3003";
const axios = require("axios").default;

const GetDataFromDB = async (localurl: string) => {
  try {
    let res = await axios.get(localurl);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const PostDataToDB = async (localurl: string, workername: string) => {
  try {
    let res = await axios.post(localurl, { name: workername });
    return res;
  } catch (error) {
    console.log(error);
  }
};
// Post a new worker into the DB
export const PostWorker = async (workername: string) => {
  PostDataToDB(`${url}/workers/add`, workername)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// PostWorker("Test");

export const GetWorkers = async (setState: (workers: Worker[]) => void) => {
  GetDataFromDB(`${url}/workers`)
    .then((res) => {
      const dbdata = res.data as Worker[];
      const data = dbdata.map((x) => ({ id: x.id, name: x.name }));
      setState(data);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const GetJobs = async (setState: (jobs: Job[]) => void) => {
  GetDataFromDB(url)
    .then((res) => {
      const dbdata = res.data as DbJob[];
      const data = dbdata.map(
        (x) =>
          ({
            description: x.description,
            id: x.job_id,
            username: x.name,
            start: new Date(x.start_date),
            end: new Date(x.end_date),
          } as Job)
      );
      setState(data);
    })
    .catch((e) => {
      console.log(e);
    });
};
