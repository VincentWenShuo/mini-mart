const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    }
});

const upload = multer({ storage: storage }).single("myImage");;
export const uploadImage = async (req, res) => {
    upload(req, res, (err) => {
        if( !err ){
            const imageName = req.file.filename;
            return res.status(200).json({imageName});
        }
        else{
            return res.status(400).json(err);
        }
    });
};

export default {
    uploadImage,
};
