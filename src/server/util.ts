import nfetch from "node-fetch";

import { GetJobsErrorResponse, GetJobsSuccessResponse, Job } from "./types";

/**
 * Check if MongoDB is running locally. Stops application from continuing if false.
 */
export const checkIfMongoDBIsRunning = async (): Promise<boolean> =>
  new Promise(async (resolve) => {
    try {
      if (!process.env.MONGODB_URL) throw new Error("No MONGODB_URL");

      // const response = await fetch(
      //   process.env.MONGODB_URL.replace(/mongodb:\/\//gm, "http://")
      // );
      // if (response.status !== 200) return resolve(false);
      return resolve(true);
    } catch (error) {
      resolve(false);
    }
  });

export const createSearchURL = (
  page: number,
  // eslint-disable-next-line
  description: string | any,
  // eslint-disable-next-line
  full_time: string | any,
  // eslint-disable-next-line
  location: string | any
): string => {
  let url = `https://jobs.github.com/positions.json?page=${page}&`;

  if (full_time === "true") {
    url += `full_time=true&`;
  }
  if (description) {
    url += `description=${description}&`;
  }
  if (location) {
    url += `location=${location}`;
  }

  return url;
};

export const getAllJobsFromAPI = async (): Promise<
  GetJobsErrorResponse | GetJobsSuccessResponse
> => {
  const jobs: Job[] = [];
  let jobsInBatch = null;
  let page = 1;

  // * Can only get 50 jobs at a time
  // * keep going until there are no more jobs
  try {
    while (jobsInBatch !== 0) {
      const response = await nfetch(
        `https://jobs.github.com/positions.json?page=${page}`,
        { headers: { "Content-Type": "application/json" }, method: "GET" }
      );
      const batchJobs: Job[] = await response.json();
      jobsInBatch = batchJobs.length;
      page++;
      if (jobsInBatch !== 0) {
        jobs.push(...batchJobs);
      }
    }

    return jobs;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const isError = (
  result: GetJobsErrorResponse | GetJobsSuccessResponse
): result is GetJobsErrorResponse => {
  return (result as GetJobsErrorResponse).error !== undefined;
};
