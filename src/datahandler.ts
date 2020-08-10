import { Job, DbJob } from "./models";

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

export const GetWorkers = async (setState: (workers: string[]) => void) => {
  GetDataFromDB(`${url}/workers`)
    .then((res) => {
      const dbdata = res.data;
      const namearray = dbdata.map((x: any) => x.name);
      setState(namearray);
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
