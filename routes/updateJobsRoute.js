const Router = require("express-promise-router");
const format = require("pg-format")
const db = require("../db/db")

const router = new Router()

router.patch("/", async (req, res) => {
  if (req?.body?.data?.length === 1) {
    const { jobId, jobStatus } = req.body.data[0]
    const { rows, rowCount } = await db.query(
      "UPDATE jq SET job_status=$2 WHERE job_id=$1 RETURNING job_id, job_status;",
      [jobId, jobStatus]
    )

    res.json({ total: rowCount, data: rows })
  } else if (req?.body?.data?.length > 1) {
    const { data } = req.body
    const { rows, rowCount } = await db.query(
      format(
        "UPDATE jq SET job_status = c.job_status FROM (VALUES %L) AS c(job_id, job_status) WHERE c.job_id::uuid = jq.job_id RETURNING jq.job_id, jq.job_status;",
        data.map((d) => [d.jobId, d.jobStatus])
      ),
      []
    )

    res.json({ total: rowCount, data: rows })
  }
})

module.exports = router;
