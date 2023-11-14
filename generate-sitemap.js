const fs = require('fs')
const ws = fs.createWriteStream('./static/sitemap.txt')

const { generateRoutes } = require('./generate-routes')
const REGION = process.env.REGION || 'CA'
const site = `https://ammobin.${REGION.toLowerCase()}`
ws.write(`${site}\n`)
generateRoutes(true, REGION).map(r => ws.write(`${site}${r}\n`))

fs.copyFileSync(`./static/favicon-${REGION}.ico`, './static/favicon.ico')
fs.copyFileSync(`./static/icon-${REGION}.png`, './static/icon.png')
