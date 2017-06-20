function shuffle(input) {
  console.log('shuffle')

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
    link: 'http://www.cabelas.ca',
    img: require('~assets/cabelas-logo.png'),
    id: 1
  }, {
    name: 'Sail (ON + QC)',
    link: 'https://www.sail.ca/',
    img: require('~assets/sail-logo.png'),
    id: 2
  }, {
    name: 'Firearms Outlet Canada (Ajax, ON)',
    link: 'http://www.firearmsoutletcanada.com',
    img: require('~assets/foc-logo.jpg'),
    id: 3
  }, {
    name: 'Al Flaherty\'s (Toronto, ON)',
    link: 'https://www.alflahertys.com',
    img: require('~assets/al-flahertys-logo.png'),
    id: 4
  }, {
    name: 'Bulls Eye London (London. ON)',
    link: 'http://www.bullseyelondon.com/',
    img: require('~assets/bulls-logo.png'),
    id: 5
  }, {
    name: 'Canadian Tire (all over Canada)',
    link: 'http://www.canadiantire.ca/en/sports-rec/hunting/ammunition.html',
    img: require('~assets/canadian-tire-logo.png'),
    id: 6
  }, {
    name: 'Reliable Gun (Vancouver, BC)',
    link: 'https://www.reliablegun.com',
    img: require('~assets/reliable-gun-logo.jpg'),
    id: 7
  }, {
    name: 'Tenda',
    link: 'https://www.gotenda.com/',
    img: require('~assets/tenda-logo.png'),
    id: 8
  }, {
    name: 'Canada Ammo',
    link: 'https://www.canadaammo.com',
    img: require('~assets/canada-ammo-logo.jpg'),
    id: 9
  }, {
    name: 'Wolverine Supplies',
    link: 'https://www.wolverinesupplies.com',
    img: require('~assets/wolverine-logo.png'),
    id: 10
  }, {
    name: 'Jo Brook Outdoors',
    link: 'https://www.jobrookoutdoors.com/',
    img: require('~assets/jo-brook-logo.png'),
    id: 11
  }, {
    name: 'The Ammo Source',
    link: 'http://www.theammosource.com',
    img: require('~assets/the-ammo-source-logo.png'),
    id: 11
  }
]);