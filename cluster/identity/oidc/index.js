// This example uses ExpressJS
import express from 'express'
import login from './password.js'
import consent from './consent.js'
import ping from './ping.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/login', login);
app.use('/ping', ping);
app.use('/consent', consent);


app.listen(port, () => {
    console.log(`Login provider listening on port ${port}`)
})
export default app;