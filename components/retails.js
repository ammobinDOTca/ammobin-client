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
    link: 'http://www.cabelas.ca/?utm_source=ammobin.ca',
    img: require('~/assets/cabelas-logo.png'),
    id: 1
  }, {
    name: 'Sail (ON + QC)',
    link: 'https://www.sail.ca/?utm_source=ammobin.ca',
    img: require('~/assets/sail-logo.png'),
    id: 2
  }, {
    name: 'Firearms Outlet Canada (Ajax, ON)',
    link: 'http://www.firearmsoutletcanada.com/?utm_source=ammobin.ca',
    img: require('~/assets/foc-logo.jpg'),
    id: 3
  }, {
    name: 'Al Flaherty\'s (Toronto, ON)',
    link: 'https://www.alflahertys.com/?utm_source=ammobin.ca',
    img: require('~/assets/al-flahertys-logo.png'),
    id: 4
  }, {
    name: 'Bulls Eye London (London. ON)',
    link: 'http://www.bullseyelondon.com/?utm_source=ammobin.ca',
    img: require('~/assets/bulls-logo.png'),
    id: 5
  }, {
    name: 'Canadian Tire (all over Canada)',
    link: 'http://www.canadiantire.ca/en/sports-rec/hunting/ammunition.html?utm_source=ammobin.ca',
    img: require('~/assets/canadian-tire-logo.png'),
    id: 6
  }, {
    name: 'Reliable Gun (Vancouver, BC)',
    link: 'https://www.reliablegun.com/?utm_source=ammobin.ca',
    img: require('~/assets/reliable-gun-logo.jpg'),
    id: 7
  }, {
    name: 'Tenda (Richmond Hill, ON)',
    link: 'https://www.gotenda.com/?utm_source=ammobin.ca',
    img: require('~/assets/tenda-logo.png'),
    id: 8
  }, {
    name: 'Canada Ammo  (BC and ON)',
    link: 'https://www.canadaammo.com/?utm_source=ammobin.ca',
    img: require('~/assets/canada-ammo-logo.jpg'),
    id: 9
  }, {
    name: 'Wolverine Supplies (Virden, MB)',
    link: 'https://www.wolverinesupplies.com/?utm_source=ammobin.ca',
    img: require('~/assets/wolverine-logo.png'),
    id: 10
  }, {
    name: 'Jo Brook Outdoors (Brandon, MB)',
    link: 'https://www.jobrookoutdoors.com/?utm_source=ammobin.ca',
    img: require('~/assets/jo-brook-logo.png'),
    id: 11
  }, {
    name: 'The Ammo Source (Harrowsmith, ON)',
    link: 'http://www.theammosource.com/?utm_source=ammobin.ca',
    img: require('~/assets/the-ammo-source-logo.png'),
    id: 11
  }, {
    name: 'Hirsch Precision (Lake Echo, NS)',
    link: 'http://www.hirschprecision.com/?utm_source=ammobin.ca',
    img: require('~/assets/hirsch-logo.png'),
    id: 12
  }, {
    name: 'Wild West (Edmonton, AB)',
    link: 'https://gun-shop.ca/?utm_source=ammobin.ca',
    img: require('~/assets/wild.png'),
    id: 13
  }, {
    name: 'Tiger Arms (Port Coquitlam, BC)',
    link: 'http://www.tigerarms.ca/?utm_source=ammobin.ca',
    img: require('~/assets/tigerarms.png'),
    id: 14
  }, {
    name: 'Mag Dump (Sherwood Park, AB)',
    link: 'https://magdump.ca/?utm_source=ammobin.ca',
    img: require('~/assets/magdump-logo.png'),
    id: 15
  },
  {
    name: 'Rangeview Sports (Newmarket, ON)',
    link: 'https://www.rangeviewsports.ca/?utm_source=ammobin.ca',
    img: require('~/assets/rangeview-sports.png'),
    id: 15
  },

]);
