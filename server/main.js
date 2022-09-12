const express= require('express')
require('./configs/database');
const MoviesRouter = require('./Routes/MoviesRouter');
const UsersRouter = require('./Routes/UsersRouter')
const MembersRouter = require('./Routes/MembersRouter')
var cors = require('cors')

let app = express();
app.use(express.json())
app.use(cors({origin: '*'}));


app.use('/api/movies',MoviesRouter);
app.use('/api/users',UsersRouter);
app.use('/api/members',MembersRouter);

app.listen(4000);