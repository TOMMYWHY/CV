const http = require('http');
const fs = require('fs');
const url = require('url')
const port = 9999

let server = http.createServer(function (req, res) {
    let parsedUrl = url.parse(req.url,true);
    let pathWithQuery = req.url;
    let queryString = "";
    if(pathWithQuery.indexOf('?')>=0){
        queryString = pathWithQuery
                    .substring((pathWithQuery.indexOf('?')))
    }
    let path = parsedUrl.pathname;
    let query = parsedUrl.query;
    let method = req.method;

    /*=================*/

    console.log('query string is :' + pathWithQuery)
    if(path === '/'){
        res.statusCode = 200
        res.setHeader('Content-Type','text/html;charset=utf-8');
        // res.write('hi')
        let string = fs.readFileSync('./index.html','utf8')
        res.write(string)
        res.end()
    }else if(path === '/main.js'){
        res.statusCode = 200
        res.setHeader('Content-Type','text/javascript;charset=utf-8');
        let string = fs.readFileSync('./main.js','utf8')
        res.write(string)
        res.end()

    }else if(path === '/xxx'){
        res.statusCode = 200
        res.setHeader('Content-Type','text/json;charset=utf-8');
        // let string = fs.readFileSync('./main.js','utf8')
        res.write(`
        {
            "note":{
                "to":"tommy",
                "from":"aws"
            }
        }
        `)
        res.end()
    }
    else{
        res.statusCode = 404
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.write('ops~! 404')
        res.end()
    }


})
server.listen(port)
console.log('listening port :'+port+ "   now...")