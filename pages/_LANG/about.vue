<template>
  <div class="container">
    <img src="~/assets/logo-medium.png" class="pure-img img" alt="ammobin.ca logo">
    <h1>{{$t('default.about')}}</h1>
    <div>
      <a href="/">ammobin.ca</a> {{$t('about.main1')}}
    </div>
    <div>
      {{$t('about.main2')}}
    </div>
    <div>
      {{$t('about.main3')}}
    </div>

    <hr>

    <h2>
      {{$t('about.contactInfo')}}
    </h2>
    <div>
      {{$t('about.contactQuestions1')}}
      <div>{{$t('about.contactQuestion2')}}</div>
      <div> {{$t('about.contactQuestion3')}}</div>
      <div>{{$t('about.contactQuestion4')}}</div>

      <div style="margin-top:10px;"> {{$t('about.submitIssue')}}
        <a href="https://github.com/ammobinDOTca" target="_blank" rel="noopener">https://github.com/ammobindotca</a>
      </div>
      <div>
        {{$t('about.sendEmail')}}
        <a v-bind:href="mail">{{email}}</a>
      </div>

    </div>

    <hr>

    <h2> {{$t('about.disclaimerTitle')}}</h2>
    <p>{{$t('about.disclaimer')}} </p>

    <hr>

    <h2 id="supportedRetailers">{{$t('about.supportedRetailers')}}</h2>
    <supported-retailers></supported-retailers>

    <hr>

    <div style="margin-top: 2rem">
      {{$t('home.gunsaleLink')}}
      <a href="http://gunsale.ca/?utm_source=ammobin.ca" target="_blank" rel="noopener">gunsale.ca</a>
    </div>
    <div style="margin-top: 2rem">
      <!-- TODO: only display this link if user ip is from USA + track clicks-->
      <!-- not in any way connected with wikiarms, chosen b/c they have a mobile friendly website + https + display cost per round -->
      {{$t('about.wikiamrsLink')}}
      <a href="https://www.wikiarms.com/?utm_source=ammobin.ca" target="_blank" rel="noopener">wikiarms.com</a>
    </div>

  </div>
</template>

<script>
import SupportedRetailers from "~/components/supported-retailers.vue";

export default {
  components: {
    SupportedRetailers
  },
  head: {
    title: "About AmmoBin.ca", //TODO: en francais
    meta: [
      {
        hid: "description",
        name: "description",
        content: "All about ammobin.ca" //TODO: en francais
      }
    ]
  },
  data() {
    return {
      email: "contact" + "@" + "ammobin.ca",
      mail: "mailto:" + "contact" + "@" + "ammobin.ca" // this probably will do nothing to stop bots...
    };
  }
};
</script>
<style>
.img {
  display: block;
  margin: auto;
}
</style>
