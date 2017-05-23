<template>
  <div class="pure-g">
  
    <div class="pure-u-1 pure-u-md-1-3 m-t-2" v-for="row in list">
      <img v-bind:src="row.img" class="pure-img img">
      <a v-bind:href="row.link" target="_blank">{{row.name}}</a>
    </div>
    <div class="pure-u-1 pure-u-md-1-3 m-t-2">
      <h4>more to come...</h4>
    </div>
  </div>
</template>

<script>
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
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


export default {
  data() {
    return {
      // shuffle the order of vendors so as to not favor one over the other
      list: shuffle([
        {
          name: 'Cabela\'s (all over Canada)',
          link: 'http://www.cabelas.ca',
          img: require('~assets/cabelas-logo.png')
        }, {
          name: 'Sail (ON + QC)',
          link: 'https://www.sail.ca/',
          img: require('~assets/sail-logo.png')
        }, {
          name: 'Firearms Outlet Canada (Ajax, ON)',
          link: 'http://www.firearmsoutletcanada.com',
          img: require('~assets/foc-logo.jpg')
        }, {
          name: 'Al Flaherty\'s (Toronto, ON)',
          link: 'https://www.alflahertys.com',
          img: require('~assets/al-flahertys-logo.png')
        }, {
          name: 'Bulls Eye London (London. ON)',
          link: 'http://www.bullseyelondon.com/',
          img: require('~assets/bulls-logo.png')
        }
      ])
    };
  }
}
</script>

<style >
.img {
  height: 88px;
  display: block;
  margin: auto;
}

.m-t-2 {
  margin-top: 25px;
}
</style>

