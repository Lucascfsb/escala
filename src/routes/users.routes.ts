import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  try {
    const { username, email, password, role } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      username,
      email,
      password,
      role,
    })

    const { password: userPassword, ...userWithoutPassword } = user

    return response.json(userWithoutPassword)
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message })
    }
    return response.status(400).json({ error: 'Unknown error' })
  }
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService()

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file?.filename ?? '',
      })

      const { password, ...userWithoutPassword } = user

      return response.json(userWithoutPassword)
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).json({ error: err.message })
      }
      return response.status(400).json({ error: 'Unknown error' })
    }
  }
)

export default usersRouter
