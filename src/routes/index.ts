import { Router } from 'express'
import militariesRouter from './militaries.rotes'
import serviceTypesRouter from './serviceTypes.router'
import sessionsRouter from './sessions.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/militaries', militariesRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/serviceTypes', serviceTypesRouter)

export default routes
