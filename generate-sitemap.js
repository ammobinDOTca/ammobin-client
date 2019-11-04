const fs = require('fs')
const ws = fs.createWriteStream('./static/sitemap.txt')

const { generateRoutes } = require('./generate-routes')

const site = `https://ammobin.ca`
ws.write(`${site}\n`)
generateRoutes().map(r => ws.write(`${site}${r}\n`))
