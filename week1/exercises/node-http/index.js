const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
    
    if(req.method == 'GET'){
        let fileUrl;
        if(req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        let filePath = path.resolve(`./public${fileUrl}`);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            try{
                checkAccses(filePath);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text.html');
                fs.createReadStream(filePath).pipe(res);
            } catch (err) {
                console.log(err.messege);
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text.html');
                res.end(`<html><body><h1> Error 404: ${fileUrl}
                 not found</h1></body></html>`)
            }
        }else{
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text.html');
                res.end(`<html><body><h1> Error 404: ${fileUrl}
                 not html file </h1></body></html>`)
        }
    }else{
        res.statusCode = 404;
            res.setHeader('Content-Type', 'text.html');
            res.end(`<html><body><h1> Error 404: ${fileUrl}
             not supported</h1></body></html>`)
    }
})

const checkAccses = async (filePath) =>{
    await fs.promises.access(filePath, fs.constants.R_OK | fs.constants.W_OK);
}

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`)
});