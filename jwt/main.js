const express = require('express')
const AuthRouter = require('./routes/auth')
var cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors({origin: '*'}));

app.use("/auth", AuthRouter)


app.listen(5000)