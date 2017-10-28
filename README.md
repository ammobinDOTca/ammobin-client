# AmmoBin.ca [![Build Status](https://travis-ci.org/ammobinDOTca/ammobin-client.svg?branch=master)](https://travis-ci.org/ammobinDOTca/ammobin-client) [![Greenkeeper badge](https://badges.greenkeeper.io/ammobinDOTca/ammobin-client.svg)](https://greenkeeper.io/)

meta search site for ammo prices across canada. built with [nuxt.js](https://nuxtjs.org) (and thus vue.js).

![Screenshot-2017-9-27 The place to view the best online ammo prices across Canada.png](https://raw.githubusercontent.com/ammobinDOTca/ammobin-client/master/Screenshot-2017-9-27%20The%20place%20to%20view%20the%20best%20online%20ammo%20prices%20across%20Canada%20.png)

## how to run
1. ```docker run ammobindotca/ammo-bin-client -p 3000:3000```

## how to run locally
- ```npm i```
- ```PROD=true npm run dev``` (will target prod api)

## todo
- filter by vendor  province
- https://github.com/WICG/BackgroundSync/blob/master/explainer.md

## contributing
- do some work
- submit pr

## vendors to add
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
- http://www.grouseriver.com/Hunting-Shooting/Ammunition
- https://blue-wolf-firearms-canada.myshopify.com/collections/rimfire

## blocked
- wanstalls
- http://www.westcoasthunting.ca/ (prices + counts hidden on item page. would need to scrape everypage)

## skipped
- wholesalesports.com
- marstar.ca

## incomplete vendors
- none

## docker hub
https://hub.docker.com/r/ammobindotca/ammobin-client/
