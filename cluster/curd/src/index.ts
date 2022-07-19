import express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (app as any)[route.method](route.route, (req: Request, res: Response, next: () => void) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : res.sendStatus(404))
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
            else{
                res.sendStatus(500);
            }
        })
    })

    // start express server
    await app.listen(3000)

    // insert new users for test
    /*
    await AppDataSource.manager.save(
        AppDataSource.manager.create(Curd, {})
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(Curd, {})
    )*/

    console.log("Express server has started on port 3000. Open http://localhost:3000/curd to see results")

}).catch(error => console.log(error))
