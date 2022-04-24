const Router = require("express-promise-router")
const db = require("../db/db")

const router = new Router()

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT job_status, count(*)::int as status_count FROM jq GROUP BY job_status;")

  const sortOrder = ["i", "e", "c", "f"]
  res.json({ data: rows.sort((a, b) => sortOrder.indexOf(a.job_status) - sortOrder.indexOf(b.job_status)) })
})

module.exports = router
