import { Router } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password, role } = request.body

  const authenticateUser = new AuthenticateUserService()

  const { user, token } = await authenticateUser.execute({
    email,
    password,
    role,
  })

  const { password: userPassword, ...userWithoutPassword } = user

  return response.json({ userWithoutPassword, token })
})

export default sessionsRouter
