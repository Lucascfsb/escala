import { AppDataSource } from '../config/data-source'
import Military from '../entities/Military'

export class UserController {
  getAll() {
    return AppDataSource.manager.find(Military)
  }
}
