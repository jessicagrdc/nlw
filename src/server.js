const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título" })
})


server.get("/create-point", (req, res) => {
    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);

    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
        db.run(query, values, afterInsertData)    
})

server.get("/search", (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
    //pegar os dados do banco de dados
    db.all(`SELECT name FROM places`, function (err, rows) {
        if (err) {
           return console.log(err)
            }
            return res.render("search-results.html", { places: rows})
        })       
=======
    // pegar os dados do banco de dados
=======
>>>>>>> 17afe44af7471452cf89f16db49e2436e123350b

    const search = req.query.search

    if(search == "") {
        return res.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        return res.render("search-results.html", { places: rows, total: total })
    })

>>>>>>> ec6ecee605bd93ab23a82fefabf31f75a7029fba
})

server.listen(3000)