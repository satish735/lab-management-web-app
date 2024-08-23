import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';


// Initialize GridFS storage
const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    file: (req, file) => {
        console.log(file);

        return {
            filename: file.originalname,
            bucketName: 'fs'
        }
    }
});

const upload = multer({ storage });



export const POST = async (request, { params }) => {
    const form = new FormData();
    form.append('file', request.body);
    return new Promise((resolve, reject) => {
        upload.single('file')(request, {}, (err) => {
            if (err) {
                return reject(new Response('Error uploading file', { status: 500 }));
            }
            resolve(new Response('File uploaded successfully', { status: 201 }));
        });
    });
}

