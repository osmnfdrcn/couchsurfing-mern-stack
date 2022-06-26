import multer from 'multer'

export const uploadAvatar = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        console.log(file.originalname);
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('File must be an IMAGE'))
        }
        callback(undefined, true)
    }
})