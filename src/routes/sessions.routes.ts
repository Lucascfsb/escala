import { Router } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password, role } = request.body

    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({
      email,
      password,
      role,
    })

    const { password: userPassword, ...userWithoutPassword } = user

    return response.json({ userWithoutPassword, token })
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message })
    }
    return response.status(400).json({ error: 'Unknown error' })
  }
})

export default sessionsRouter
