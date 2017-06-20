# AmmoBin.ca [![Build Status](https://travis-ci.org/ammobinDOTca/ammo-bin-client.svg?branch=master)](https://travis-ci.org/ammobinDOTca/ammo-bin-client)

[![Greenkeeper badge](https://badges.greenkeeper.io/nexus-uw/ammo-scrape-client.svg?token=957f4dcb8f49d20fcd7acdc058831b3f677c53fb9487017a6899f188474adf72&ts=1495511154761)](https://greenkeeper.io/)

meta search site for ammo prices across canada. built with [nuxt.js](https://nuxtjs.org).

## how to run
1. ```docker run ammobindotca/ammo-bin-client -p 3000:3000```

## todo
- filter out 'UNKNOWN' calibres + brands by default + create the dank zone (contains all unknown stuff).
- apply order to grouped items (ie: order by unit cost)
- add best prices to main page (also expose as rss feed)
- filter by vendor  province
- add progress web app support (nuxt provides some of this already, need to futher investigate)

## vendors to add
- cabelas (have to work through calibre selector for center fire)
- wholesalesports.com
- http://www.westcoasthunting.ca/
- https://www.leverarms.com
- https://theshootingedge.com/
- https://store.theshootingcentre.com/
- https://gun-shop.ca/product-category
- http://northprosports.com
- https://vancouvergunstore.ca/
- https://www.gotenda.com/ (bulk ammo section
- https://shophighfalls.com/collections/rifle-ammo?view=ALL
- http://lanzshootingsupplies.com/shop/ammunition/caliber/handgun.html
- http://www.rougeriverarms.com/index.php?route=product/category&path=70
- https://www.westernmetal.ca/shooting-category/new-ammunition
- http://www.theammosource.com (fill out the ammo source, currently only picking their deals)

## how to run locally
- ```npm i```
- ```PROD=true npm run dev```
