export type JobsTableRow = {
  jobId: string;
  company: string;
  position: string;
  appliedDate: string;
  lastEvent: string;
  lastEventDate: string;
};

export type EventTableRow = {
  id: string;
  name: string;
  date: string;
};

export type LinkTableRow = {
  id: string;
  url: string;
};
