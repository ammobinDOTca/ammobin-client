<template>
  <h1>ammmobin.ca is dead</h1>
  <h4>why? b/c I am no longer interested in supporting it.
  </h4>
  <h4>If you would like to purchase it, email me at <a href="mailto:contact@ammobin.ca">contact@ammobin.ca</a></h4>
  <div>redirecting to <a href="https://arsenalforce.ca">arsenalforce.ca</a> in 6.9s </div>
  <img src="~/assets/2.jpg" alt="sex god" style="max-height: 250px;" />
</template>
<script setup lang="ts">
const img = Math.random() > .5 ? '1.png' : '2.png'

function getPath(path): string {
  console.log(path)
  const p = 'ammunition/ammo/'
  switch (path) {
    case '9MM':
      return `${p}9mm`
    case '7.62X39MM':
      return `${p}762x39mm`
    case '.22 LR':
      return `${p}22-lr`
    case '12 GA':
      return `${p}gauge-12`
    case '20 GA':
      return `${p}gauge-20`
    case '5.56 NATO':
      return `${p}556x45mm-nato`
    case `.45 ACP`:
      return `${p}45-acp`
    case `7.62 NATO`:
      return `${p}308-winchester`
    // TODO: map other urls
    default:
      return ''
  }
}

const route = useRoute()
function trackPageView() {
  try {
    if (window.navigator.doNotTrack) {
      return
    }
    const pageView = JSON.stringify({
      route: route.path + '?dead=true',
    })
    const endpoint = 'track-pageview'
    navigator.sendBeacon('https://ammobin.ca/api/track-pageview', pageView)

  } catch (e) {
  }
}
trackPageView()

async function gotoArse() {
  let f = route.params.slug
  await navigateTo(`https://arsenalforce.ca/${getPath(getPath(f.length > 0 ? f[f.length - 1] : ''))}?utm_source=${window.location.href}&utm_medium=ammobin.ca`,
    {
      external: true,
      redirectCode: 301 // permanent
    })
}
const now = new Date()
const noMoreWaitDate = new Date("2023-12-01")
if (now > noMoreWaitDate) {
  setTimeout(gotoArse, 6900)
} else {
  gotoArse()
}
</script>
