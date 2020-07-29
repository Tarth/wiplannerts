import { Job } from "./models";

export const DataHandler = () => {
  // let data = require("./sampledata.json");
  let data = require("./sampledata10ppl.json");
  let jobdata = [];

  for (let i = 0; i < data.jobs.length; i++) {
    const username = data.jobs[i].user;
    const startdate = data.jobs[i].startdate;
    const startmonth = data.jobs[i].startmonth;
    const startyear = data.jobs[i].startyear;
    const enddate = data.jobs[i].enddate;
    const endmonth = data.jobs[i].endmonth;
    const endyear = data.jobs[i].endyear;
    const id = data.jobs[i].id;
    const description = data.jobs[i].description;

    let startdato = new Date(startyear, startmonth, startdate);
    let slutdato = new Date(endyear, endmonth, enddate);

    let job: Job = {
      username: username,
      description: description,
      start: startdato,
      end: slutdato,
      id: id,
    };
    jobdata.push(job);
  }
  return jobdata;
};
