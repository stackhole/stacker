// This example uses ExpressJS
import express from 'express'
import login from './password.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/', login);

app.listen(port, () => {
    console.log(`Login provider listening on port ${port}`)
})
export default app;