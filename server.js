require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const crypto = require("crypto")
const compression = require("compression")

const mountRoutes = require("./routes/mountRoutes")

const app = express()
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan(process.env.MORGAN_LOG_LEVEL || "dev"))

const isProduction = process.env.NODE_ENV !== "development"

app.use((req, res, next) => {
  const apiKey = req.get("API-KEY")
  const hash = crypto.createHash("sha256")
  if (
    apiKey &&
    apiKey.length < 100 &&
    crypto.timingSafeEqual(hash.update(apiKey).digest(), Buffer.from(process.env.API_KEY_HASH, "base64"))
  ) {
    next()
  } else {
    res.status(401).json({ error: "unauthorised" })
  }
})

mountRoutes(app)

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found")
  err.status = 404
  next(err)
})

/// error handlers
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack)

    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  })
})

const port = process.env.PORT || 3004
app.listen(port, () => {
  console.log(`Server Up and Listening on Port: ${port}`)
})
