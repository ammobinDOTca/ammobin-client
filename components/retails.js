function shuffle(input) {
  const array = [].concat(input);
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;
  // // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const list = shuffle([
  {
    name: 'Cabela\'s (all over Canada)',
    link: 'http://www.cabelas.ca/',
    img: require('~/assets/cabelas-logo.png'),

  }, {
    name: 'Sail (ON + QC)',
    link: 'https://www.sail.ca/',
    img: require('~/assets/sail-logo.png'),

  }, {
    name: 'Firearms Outlet Canada (Ajax, ON)',
    link: 'http://www.firearmsoutletcanada.com/',
    img: require('~/assets/foc-logo.jpg'),

  }, {
    name: 'Al Flaherty\'s (Toronto, ON)',
    link: 'https://www.alflahertys.com/',
    img: require('~/assets/al-flahertys-logo.png'),

  }, {
    name: 'Bulls Eye London (London. ON)',
    link: 'http://www.bullseyelondon.com/',
    img: require('~/assets/bulls-logo.png'),

  }, {
    name: 'Canadian Tire (all over Canada)',
    link: 'http://www.canadiantire.ca/en/sports-rec/hunting/ammunition.html',
    img: require('~/assets/canadian-tire-logo.png'),

  }, {
    name: 'Reliable Gun (Vancouver, BC)',
    link: 'https://www.reliablegun.com/',
    img: require('~/assets/reliable-gun-logo.jpg'),

  }, {
    name: 'Tenda (Richmond Hill, ON)',
    link: 'https://www.gotenda.com/',
    img: require('~/assets/tenda-logo.png'),

  }, {
    name: 'Canada Ammo  (BC and ON)',
    link: 'https://www.canadaammo.com/',
    img: require('~/assets/canada-ammo-logo.jpg'),

  }, {
    name: 'Wolverine Supplies (Virden, MB)',
    link: 'https://www.wolverinesupplies.com/',
    img: require('~/assets/wolverine-logo.png'),

  }, {
    name: 'Jo Brook Outdoors (Brandon, MB)',
    link: 'https://www.jobrookoutdoors.com/',
    img: require('~/assets/jo-brook-logo.png'),

  }, {
    name: 'The Ammo Source (Harrowsmith, ON)',
    link: 'http://www.theammosource.com/',
    img: require('~/assets/the-ammo-source-logo.png'),

  }, {
    name: 'Hirsch Precision (Lake Echo, NS)',
    link: 'http://www.hirschprecision.com/',
    img: require('~/assets/hirsch-logo.png'),

  }, {
    name: 'Wild West (Edmonton, AB)',
    link: 'https://gun-shop.ca/',
    img: require('~/assets/wild.png'),

  }, {
    name: 'Tiger Arms (Port Coquitlam, BC)',
    link: 'http://www.tigerarms.ca/',
    img: require('~/assets/tigerarms.png'),

    background: true,
  }, {
    name: 'Mag Dump (Sherwood Park, AB)',
    link: 'https://magdump.ca/',
    img: require('~/assets/magdump-logo.png'),

  },
  {
    name: 'Rangeview Sports (Newmarket, ON)',
    link: 'https://www.rangeviewsports.ca/',
    img: require('~/assets/rangeview-sports.png'),
  },
  {
    name: 'Trade Ex Canada (Hawkesbury, ON)',
    link: 'https://www.tradeexcanada.com/',
    img: require('~/assets/tradex-logo.png'),
  }, {
    name: 'Frontier Firearms (Prince Albert, SK)',
    link: 'http://frontierfirearms.ca/',
    img: require('~/assets/frontierfirearms-logo.png'),

  }, {
    name: 'BV Outdoor Essentials (Smithers, BC)',
    link: 'https://www.bvoutdoors.com/',
    img: require('~/assets/bvoutdoors-logo.png'),

  }, {
    name: 'NAS Guns & Ammo (Niagara and Sault Ste. Marie, ON)',
    link: 'https://www.nasgunsandammo.com/',
    img: require('~/assets/nas-logo.jpg'),

  }, {
    name: 'Dante Sports (Montréal QC)',
    link: 'https://www.dantesports.com/en/',
    img: require('~/assets/dante-logo.png'),

  },
  {
    name: 'Lever Arms (Vancouver, BC)',
    link: 'https://www.leverarms.com/',
    img: require('~/assets/leverarms-logo.png'),

  },
  {
    name: 'Calgary Shooting Center (Calgary, AB)',
    link: 'https://store.theshootingcentre.com/',
    img: require('~/assets/shooting-center-logo.jpg'),

  },
  {
    name: 'Western Metal (AB)',
    link: 'https://www.westernmetal.ca/shooting',
    img: require('~/assets/westernmetal-logo.png'),

  },
  {
    name: 'Al Simmons (Hamilton, ON)',
    link: 'https://alsimmonsgunshop.com/',
    img: require('~/assets/al-simmons-logo.jpg'),

  },
  {
    name: 'Vancouver Gun Store (Vancouver, BC)',
    link: 'https://vancouvergunstore.ca/',
    img: require('~/assets/vancouvergunstore-logo.png'),

  },
  {
    name: 'Bartons Big Country (Grande Prairie, AB)',
    link: 'https://www.bartonsbigcountry.ca/',
    img: require('~/assets/logo-bartons.png'),

  },
  {
    name: 'The Shooting Edge (Calgary, AB)',
    link: 'https://theshootingedge.com/',
    img: require('~/assets/shootingedge-logo.png'),

  },
  {
    name: 'Lanz Shooting Supplies (St Ann, ON)',
    link: 'http://www.lanzshootingsupplies.com/',
    img: require('~/assets/lanz-logo.png'),

  },
  {
    name: 'Duram Outdoors (Orono, ON)',
    link: 'https://durhamoutdoors.ca/',
    img: require('~/assets/duram-logo.png'),

  },
  {
    name: 'Soley Outdoors (Markham, ON)',
    link: 'https://www.solelyoutdoors.com/',
    img: require('~/assets/soley-logo.png'),
  },
  {
    name: 'North Pro Sports (Saskatoon, SK)',
    link: 'http://northprosports.com/',
    img: require('~/assets/northpro-logo.png'),
    background: true
  },
  {
    name: 'Wanstalls (Maple Ridge, BC)',
    link: 'https://www.wanstallsonline.com',
    img: require('~/assets/wanstalls.png')
  }
].map((i, index) => {
  i.link += '?utm_source=ammobin.ca'
  i.id = index;
  return i;
}));
