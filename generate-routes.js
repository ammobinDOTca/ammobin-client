module.exports.generateRoutes = function generateRoutes(prod, region) {
  const head = l => l[0]

  const langs = region === 'CA' ? ['en', 'fr'] : ['en']

  return langs.reduce((routes, lang) => {
    let lst = ['about', 'rimfire', 'shotgun', 'centerfire', 'reloading', 'powder', 'shot', 'case', 'primer'].map(
      s => `/${lang}/${s}`
    )
    lst = lst.concat([`/${lang}`])

    if (prod) {
      lst = lst.concat(['rimfire', 'shotgun', 'centerfire'].map(t => `/${lang}/${t}/UNKNOWN`))

      lst = lst.concat(
        require('ammobin-classifier/build/rimfire-calibres')
          .rimfireCalibres.map(l => head(l).toUpperCase())
          .map(c => `/${lang}/rimfire/${c}`)
      )

      lst = lst.concat(
        require('ammobin-classifier/build/centerfire-calibres')
          .centerFireCalibres.map(l => head(l).toUpperCase())
          .map(c => `/${lang}/centerfire/${c}`)
      )

      lst = lst.concat(
        require('ammobin-classifier/build/shotgun-gauges')
          .shotgunGauges.map(l => head(l).toUpperCase())
          .map(c => `/${lang}/shotgun/${c}`)
      )
    } else {
      // dont need to generate everything....
      // save on dynamo read + s3 upload costs
      lst.push(`/${lang}/shotgun/28 GA`)
      lst.push(`/${lang}/centerfire/FN 5.7X28MM`)
      lst.push(`/${lang}/rimfire/.22 WMR`)
    }

    return routes.concat(lst)
  }, [])
}
