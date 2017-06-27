# AmmoBin.ca [![Build Status](https://travis-ci.org/ammobinDOTca/ammo-bin-client.svg?branch=master)](https://travis-ci.org/ammobinDOTca/ammo-bin-client)

[![Greenkeeper badge](https://badges.greenkeeper.io/nexus-uw/ammo-scrape-client.svg?token=957f4dcb8f49d20fcd7acdc058831b3f677c53fb9487017a6899f188474adf72&ts=1495511154761)](https://greenkeeper.io/)

meta search site for ammo prices across canada. built with [nuxt.js](https://nuxtjs.org).

## how to run
1. ```docker run ammobindotca/ammo-bin-client -p 3000:3000```

## todo
- create the dank zone
- add best prices to main page (also expose as rss feed)
- filter by vendor  province

## how to run locally
- ```npm i```
- ```PROD=true npm run dev```

## vendors to add
- - https://gun-shop.ca/product-category (css rules hinder pulling data. will need to update scraper)
- wholesalesports.com
- https://www.marstar.ca/dynamic/category.jsp?catid=76551
- https://www.tradeexcanada.com/produits/78
- http://frontierfirearms.ca/ammunition-reloading/surplus-ammunition.html
- http://www.grouseriver.com/Hunting-Shooting/Ammunition

- http://www.westcoasthunting.ca/
- https://www.leverarms.com
- https://theshootingedge.com/
- https://store.theshootingcentre.com/
- http://northprosports.com
- https://vancouvergunstore.ca/
- https://shophighfalls.com/collections/rifle-ammo?view=ALL (css rules hinder pulling data. will need to update scraper)
- http://lanzshootingsupplies.com/shop/ammunition/caliber/handgun.html
- http://www.rougeriverarms.com/index.php?route=product/category&path=70
- https://www.westernmetal.ca/shooting-category/new-ammunition
- http://shop.sylvestresportinggoods.com/Rifle-Ammunition/?p=catalog&mode=catalog&parent=506&pg=1&CatalogSetSortBy=price 

## incomplete vendors
- cabelas center fire (only picking 7 calibres out of 14)
- http://www.theammosource.com (fill out the ammo source, currently only picking their deals)


## docker hub
https://hub.docker.com/r/ammobindotca/ammobin-client/
