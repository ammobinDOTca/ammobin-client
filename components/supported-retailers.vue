<template>
  <div class="pure-g">

    <div class="pure-u-1 pure-u-md-1-3 m-t-2 m-r-2" v-for="row in list" :key="row.id">
      <a v-bind:href="row.link" target="_blank" rel="noopener">
        <img v-bind:src="row.img" class="pure-img img" v-bind:alt="row.name" v-bind:title="row.name">
      </a>
    </div>
    <div class="pure-u-1 pure-u-md-1-3 m-t-2">
      <h4>more to come...</h4>
    </div>
  </div>
</template>

<script>
import { list } from './retails'

export default {
  data() {
    return { list };
  }
}
</script>

<style>
.img {
  max-height: 88px;
  max-width: 90%;
}

.m-t-2 {
  margin-top: 25px;
}
</style>

