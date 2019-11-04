const fs = require('fs')
const head = l => l[0]
const ws = fs.createWriteStream('./static/sitemap.txt')
;['en', 'fr'].forEach(lang => {
  const site = `https://ammobin.ca/${lang}/`

  ;['', 'about', 'rimfire', 'shotgun', 'centerfire', 'reloading', 'powder', 'shot', 'case', 'primer'].forEach(s =>
    ws.write(`${site}${s}\n`)
  )

  require('ammobin-classifier/build/rimfire-calibres')
    .rimfireCalibres.map(l => head(l).toUpperCase())
    .forEach(c => ws.write(`${site}rimfire/${encodeURIComponent(c)}\n`))

  require('ammobin-classifier/build/centerfire-calibres')
    .centerFireCalibres.map(l => head(l).toUpperCase())
    .forEach(c => ws.write(`${site}centerfire/${encodeURIComponent(c)}\n`))

  require('ammobin-classifier/build/shotgun-gauges')
    .shotgunGauges.map(l => head(l).toUpperCase())
    .forEach(c => ws.write(`${site}shotgun/${encodeURIComponent(c)}\n`))
})
