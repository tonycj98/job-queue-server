const Router = require("express-promise-router")
const format = require("pg-format")
const db = require("../db/db")
const { v4: uuidv4 } = require("uuid")

const router = new Router()

router.post("/", async (req, res) => {
  if (req?.body?.data?.length === 1) {
    const { jobId, jobName, jobStatus = "i" } = req.body.data[0]
    const { rows, rowCount } = await db.query(
      "INSERT INTO jq (job_id, job_name, job_status) VALUES ($1, $2, $3) RETURNING job_id;",
      [jobId || uuidv4(), jobName, jobStatus]
    )
    res.json({ total: rowCount, data: rows })
  } else if (req?.body?.data?.length > 1) {
    const { data } = req.body
    const { rows, rowCount } = await db.query(
      format(
        "INSERT INTO jq (job_id, job_name, job_status) VALUES %L RETURNING job_id;",
        data.map((d) => [d.jobId || uuidv4(), d.jobName, d.jobStatus || "i"])
      ),
      []
    )
    res.json({ total: rowCount, data: rows })
  }
})

module.exports = router
