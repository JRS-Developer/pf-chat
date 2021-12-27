

const getFiles = async(req, res, next) => {
    try{
            const img = await imagen('logo2.png')
            res.json(img)
        
    } catch(error){
        next(error);
    };  
};

const uploadFile = (req, res, next) => {
    try{
        res.json({ msg: "file uploaded successfully"});
    } catch(error){
        next(error);
    };  
};

const deleteFile = async (req, res, next) => {

    try{
       

    } catch(error){
        next(error);
    };
};

module.exports = {
    getFiles,
    uploadFile,
    deleteFile
}