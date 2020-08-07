import { Job, DbJob } from "./models";

const url = "http://localhost:3003/";
const axios = require("axios").default;

const GetDataFromDB = async () => {
  try {
    let res = await axios.get(url);
    return res;
  } catch (error) {
    console.log(error); 
  }
};

export const DataHandler = async (setState: (jobs: Job[]) => void) => {
  GetDataFromDB().then(res => {
    const dbdata = res.data as DbJob[];
    const data = dbdata.map(x => ({description: x.description, id: x.job_id, username: x.name, start: new Date(x.start_date), end: new Date(x.end_date)} as Job));
    setState(data);
    }).catch(e => {console.log(e)})
};
