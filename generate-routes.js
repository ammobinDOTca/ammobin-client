module.exports.generateRoutes = function generateRoutes() {
  const head = l => l[0]

  return ['en', 'fr'].reduce((routes, lang) => {
    let lst = ['about', 'rimfire', 'shotgun', 'centerfire', 'reloading', 'powder', 'shot', 'case', 'primer'].map(
      s => `/${lang}/${s}`
    )
    lst = lst.concat([`/${lang}`])

    lst = lst.concat(
      require('ammobin-classifier/build/rimfire-calibres')
        .rimfireCalibres.map(l => head(l).toUpperCase())
        .map(c => `/${lang}/rimfire/${encodeURIComponent(c)}`)
    )

    lst = lst.concat(
      require('ammobin-classifier/build/centerfire-calibres')
        .centerFireCalibres.map(l => head(l).toUpperCase())
        .map(c => `/${lang}/centerfire/${encodeURIComponent(c)}`)
    )

    lst = lst.concat(
      require('ammobin-classifier/build/shotgun-gauges')
        .shotgunGauges.map(l => head(l).toUpperCase())
        .map(c => `/${lang}/shotgun/${encodeURIComponent(c)}`)
    )

    return routes.concat(lst)
  }, [])
}
