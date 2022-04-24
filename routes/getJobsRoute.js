const Router = require("express-promise-router")
const db = require("../db/db")

const router = new Router()

router.get("/", async (req, res) => {
  const { rows, rowCount } = await db.query("SELECT * FROM jq;")

  res.json({ total: rowCount, data: rows })
})

router.get("/withStatus/:sid", async (req, res) => {
  const { sid } = req.params
  const { rows, rowCount } = await db.query("SELECT * FROM jq WHERE job_status=$1", [sid])

  res.json({ total: rowCount, data: rows })
})

router.get("/updatedAfter/:updatedAfter", async (req, res) => {
  const { updatedAfter } = req.params
  const { rows, rowCount } = await db.query("SELECT * FROM jq WHERE updated_at > $1", [updatedAfter])

  res.json({ total: rowCount, data: rows })
})

module.exports = router
