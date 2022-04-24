const getJobs = require("./getJobsRoute")
const insertJobs = require("./insertJobsRoute")
const updateJobs = require("./updateJobsRoute")
const getJobStatusCounts = require("./getJobStatusCountsRoute")

module.exports = (app) => {
  app.use("/getJobs", getJobs)
  app.use("/insertJobs", insertJobs)
  app.use("/updateJobs", updateJobs)
  app.use("/getJobStatusCounts", getJobStatusCounts)
}
