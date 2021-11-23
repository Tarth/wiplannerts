export const ResetJobInputFields = (
  setDescription: (desc: string) => void,
  setStartDate: (date: string) => void,
  setEndDate: (date: string) => void,
  setSelectedWorkers: (workers: []) => void
) => {
  setDescription("");
  setStartDate("");
  setEndDate("");
  setSelectedWorkers([]);
};

export const ResetUserInputFields = (
  setWorkerName: (workerName: string) => void,
  setPassword: (password: string) => void,
  setUsergroup: (usergroup: string) => void,
  setUsername: (desc: string) => void
) => {
  setWorkerName("");
  setPassword("");
  setUsergroup("worker");
  setUsername("");
};
