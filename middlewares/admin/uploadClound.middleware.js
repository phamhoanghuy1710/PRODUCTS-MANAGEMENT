const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
// Configuration
cloudinary.config({ 
    cloud_name: 'dgmlgi7p4', 
    api_key: '628256499685731', 
    api_secret: 'uWiZf7yK-HjxcHpghszH8tzI2P0' // Click 'View API Keys' above to copy your API secret
});

module.exports.upload = (req, res, next)=>{
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            req.body[req.file.fieldname] = result.secure_url;
            next();
        }
    
        upload(req);
    }
    else{
        next();
    }
}