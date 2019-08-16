const http = require('http');
const fs = require('fs');
const url = require('url')
// const request = require('request')
const port = 9999

let server = http.createServer(function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    let pathWithQuery = req.url;
    let queryString = "";
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery
            .substring((pathWithQuery.indexOf('?')))
    }
    let path = parsedUrl.pathname;
    let query = parsedUrl.query;
    let method = req.method;

    /*=================*/

    console.log('query string is :' + pathWithQuery)
    if (path === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        // res.write('hi')
        let string = fs.readFileSync('./index.html', 'utf8')
        res.write(string)
        res.end()
    } else if (path === '/main.js') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/javascript;charset=utf-8');
        let string = fs.readFileSync('./main.js', 'utf8')
        res.write(string)
        res.end()

    } else if (path === '/signup' && method === 'GET') {
        let string = fs.readFileSync('./signup.html', 'utf8')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.write(string)
        res.end()
    } else if (path === '/signup' && method === 'POST') {
        readBody(req).then((body) => {
            // console.log(body);
            let strings =  body.split('&')
            let hash = {}
            strings.forEach((string,index)=>{
                let parts = string.split('=')
                let key =  parts[0]
                let value = parts[1]
                hash[key]= value
            })
            console.log(hash);
            let {email, password, password_confirmation} = hash
            if(email.indexOf('@')=== -1){
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json;charset=utf-8');

                res.write(`
                {
                    "errors":{
                        "email":"invalid"
                    }
                }
                `)
            }else if(password !== password_confirmation){
                res.statusCode = 400
                res.write('passowrd not match~!')
            }else{
                res.statusCode = 200
            }
            res.end()
        })


    } else if (path === '/xxx') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/json;charset=utf-8');
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
    else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.write('ops~! 404')
        res.end()
    }


})

function readBody(request) {
    return new Promise((resolve, reject) => {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            resolve(body)
        });
    });
}

server.listen(port)
console.log('listening port :' + port + "   now...")

