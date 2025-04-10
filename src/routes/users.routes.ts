import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import UsersRepository from '../repositories/UsersRepository'
import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

import ensureAdmin from '../middlewares/ensureAdmin'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
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
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService()

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename ?? '',
    })

    const { password, ...userWithoutPassword } = user

    return response.json(userWithoutPassword)
  }
)

usersRouter.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  async (request, response) => {
    const usersRepository = new UsersRepository()
    const servicesTypes = await usersRepository.findAll()

    return response.json(servicesTypes)
  }
)

export default usersRouter
