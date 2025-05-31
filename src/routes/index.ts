import { Router } from 'express'
import militariesRouter from './militaries.routes'
import serviceRenderedRouter from './serviceRendered.router'
import serviceTypesRouter from './serviceTypes.router'
import sessionsRouter from './sessions.routes'
import usersRouter from './users.routes'
import passwordRouter from './password.routes';


const routes = Router()

routes.use('/militaries', militariesRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/serviceTypes', serviceTypesRouter)
routes.use('/serviceRendered', serviceRenderedRouter)
routes.use('/password', passwordRouter);


export default routes
