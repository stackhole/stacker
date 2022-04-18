// This example uses ExpressJS
import express from 'express'
import login from './login.js'

const app = express()
const port = process.env.PORT || 3000;


app.use('/login', login);

app.listen(port, () => {
    console.log(`Login provider listening on port ${port}`)
})
export default router;