export const ResetInputFields = (
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
