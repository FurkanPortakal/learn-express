const http = require('http')

const server = http.createServer((req,res) => {
    console.log(req.url, req.method, req.headers)
    // process.exit()
    if(req.url === '/' ){
    res.write("<h1>Home</h1>")
    res.end()
    }
    if(req.url === '/hakkimizda' ){
    res.write("<h1>Hakkimizda</h1>")
    res.end()
    }
})

server.listen(3000)
