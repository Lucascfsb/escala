import { Router } from 'express'
import militariesRouter from './militaries.rotes'
import sessionsRouter from './sessions.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/militaries', militariesRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes
