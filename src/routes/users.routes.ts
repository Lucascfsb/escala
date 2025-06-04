import { instanceToPlain } from 'class-transformer'
import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import UsersRepository from '../repositories/UsersRepository'
import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
import UpdateUserInfoService from '../services/UpdateUserInfoService'

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

  const userResponse = instanceToPlain(user)
  const { password: userPassword, ...userWithoutPassword } = userResponse

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

    const userResponse = instanceToPlain(user)

    const { password, ...userResponseWithoutPassword } = userResponse

    return response.json(userResponseWithoutPassword)
  }
)

usersRouter.put('/:id', ensureAuthenticated, ensureAdmin, async (request, response) => {
  const { id } = request.params
  const { username, email, role, oldPassword, password, passwordConfirmation } = request.body

  const updateUser = new UpdateUserInfoService()
  const user = await updateUser.execute({
    id,
    username,
    email,
    role,
    oldPassword,
    password,
    passwordConfirmation,
  })

  const userResponse = instanceToPlain(user)

  const { password: userPassword, ...userResponseWithoutPassword } = userResponse

  return response.json(userResponseWithoutPassword)
})

usersRouter.get('/', ensureAuthenticated, ensureAdmin, async (request, response) => {
  const usersRepository = new UsersRepository()
  const users = await usersRepository.findAll()

  const usersResponse = users.map(user => {
    const plainUser = instanceToPlain(user)
    return plainUser
  })

  return response.json(usersResponse)
})

export default usersRouter
