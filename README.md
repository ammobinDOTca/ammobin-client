# AmmoBin.ca [![Build Status](https://travis-ci.org/ammobinDOTca/ammobin-client.svg?branch=master)](https://travis-ci.org/ammobinDOTca/ammobin-client) [![Greenkeeper badge](https://badges.greenkeeper.io/ammobinDOTca/ammobin-client.svg)](https://greenkeeper.io/)

meta search site for ammo prices across canada. built with [nuxt.js](https://nuxtjs.org).

## how to run
1. ```docker run ammobindotca/ammo-bin-client -p 3000:3000```

## todo
- add best prices to main page (also expose as rss feed)
- filter by vendor  province
- https://github.com/WICG/BackgroundSync/blob/master/explainer.md

## how to run locally
- ```npm i```
- ```PROD=true npm run dev```

## vendors to add
- https://www.tradeexcanada.com/produits/78
- http://frontierfirearms.ca/ammunition-reloading/surplus-ammunition.html
- http://www.grouseriver.com/Hunting-Shooting/Ammunition

- http://www.dantesports.com/en/product-category/shop/ammunition/
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
- https://www.tesro.ca/ammunition-and-pellets/smallbore-ammunition.html?limit=36
- https://durhamoutdoors.ca/collections/ammo-and-reloading
- https://blue-wolf-firearms-canada.myshopify.com/collections/rimfire

## skipped
- wholesalesports.com
- https://www.marstar.ca/dynamic/category.jsp?catid=76551

## incomplete vendors


## docker hub
https://hub.docker.com/r/ammobindotca/ammobin-client/
