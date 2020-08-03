import { Job } from "./models";
//import axios from "axios";

const url = "localhost:3003/workers";
const github = "https://api.github.com/users/janbodnar";
const axios = require("axios").default;

async function getNumberOfFollowers() {
  let res = await axios.get(github);

  let nOfFollowers = res.data.followers;
  let location = res.data.location;

  console.log(`# of followers: ${nOfFollowers}`);
  console.log(`Location: ${location}`);
}

getNumberOfFollowers();

export const DataHandler = () => {
  let data = require("./sampledata.json");
  let jobdata = [];

  for (let i = 0; i < data.jobs.length; i++) {
    const username = data.jobs[i].user;
    const startdate = data.jobs[i].startdate;
    const startmonth = data.jobs[i].startmonth;
    const startyear = data.jobs[i].startyear;
    const starthour = data.jobs[i].starthour;
    const startminute = data.jobs[i].startminute;
    const enddate = data.jobs[i].enddate;
    const endmonth = data.jobs[i].endmonth;
    const endyear = data.jobs[i].endyear;
    const endhour = data.jobs[i].endhour;
    const endminute = data.jobs[i].endminute;
    const id = data.jobs[i].id;
    const description = data.jobs[i].description;

    let startdato = new Date(
      startyear,
      startmonth,
      startdate,
      starthour,
      startminute
    );
    let slutdato = new Date(endyear, endmonth, enddate, endhour, endminute);

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
