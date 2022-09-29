import express, { NextFunction, Request, Response } from "express"
require('dotenv').config()
import "express-async-errors"
import cors from "cors"

import Routes from "./Routes"

const app = express()

app.use(express.json())

app.use(cors())

app.use(Routes)

app.get("/", (req, res) => {
    return res.json({"hello": "world!"})
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        "status": "error",
        "message": "Internal server error."
    })
})

app.listen(process.env.PORT, () => console.log("Servidor aberto, porta: " + process.env.PORT))