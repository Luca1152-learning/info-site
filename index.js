const express = require("express")
const fs = require("fs")

const app = express()

app.get("/*", (req, res) => {
    const fileToFind = req.url === "/" ? "./index.html" : `./${req.url}.html`

    fs.readFile(fileToFind, "utf-8", (err, data) => {
        if (err) {
            fs.readFile("./404.html", "utf-8", (err404, data404) => {
                if (err404) {
                    throw err404
                }

                res.writeHead(200, { "Content-Type": "text/html" })
                res.write(data404)
                res.end()
            })
            return
        }

        res.send(data)
})})

app.listen(8080)
