import 'reflect-metadata'
import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import uploadConfig from './config/upload'
import AppError from './errors/AppError'
import routes from './routes'

import './database'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.error(err)

  return response.status(500).json({
    status: 'erros',
    message: 'Internal server error',
  })
})

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
