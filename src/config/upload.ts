import crypto from 'node:crypto'
import path from 'node:path'
import multer from 'multer'
import type { StorageEngine } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
  driver: 's3' | 'disk'
  directory: string
  tmpFolder: string
  storage: StorageEngine
  config: {
    aws?: {
      bucket: string
    }
  }
}

const uploadConfig: IUploadConfig = {
  driver: (process.env.STORAGE_DRIVER as 's3' | 'disk') || 'disk',
  directory: tmpFolder,
  tmpFolder: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
  config: {
    aws: {
      bucket: process.env.AWS_BUCKET_NAME || '',
    },
  },
}

export default uploadConfig
