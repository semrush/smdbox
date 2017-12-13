const fs = require('fs');
const foldersToRemove = ['build'];
const currentDir = process.cwd();

const deleteFolderRecursive = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file){
            const curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

foldersToRemove.forEach((folder) => {
    const path = currentDir+'/'+folder;
    deleteFolderRecursive(path);
});
