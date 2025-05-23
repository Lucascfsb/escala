import crypto from 'node:crypto'
import path from 'node:path'
import multer from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}
