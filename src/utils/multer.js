import multer from "multer";

const storage = multer.diskStorage({
    destination:(__,__,cb) =>cb(null,__dirname + '/public/img'),
    filname:(__,file,cb) => cb (null,file.originalname)
})
export const uploader = multer({storage})