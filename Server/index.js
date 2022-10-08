const express = require('express')
const app = express();
const PORT = 5000;
const authenticationRoute = require('./server/routes/authentication');
const mainRoute = require('./server/routes/main');
const sequelize = require('./server/database/connection')
const cors = require('cors')
const helpers = require('./server/helpers/userHelpers');

app.use(express.json());
app.use(cors());

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})

app.use('/', mainRoute);
app.use('/api/', authenticationRoute);

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
})