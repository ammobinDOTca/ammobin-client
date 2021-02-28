declare const DOMAIN: string
declare const REGION: string
const REF = page => `utm_source=${DOMAIN}&utm_campaign=${page}`

export function getConfig(page: string, params: { [k: string]: string }): { href: string; img: string } {
  const { LANG: locale, itemType, subType } = params

  const INFO_LINK = `/${locale}/sponsorship`

  // running a 1 month trial for canadafirstammo.ca
  if (new Date() > new Date('04/01/2021') || REGION != 'CA') {
    if (page === 'LANG' || page === 'index')
      return {
        img: require('~/assets/TEST_SIDE.png'),
        href: INFO_LINK,
      }
    else
      return {
        img: require('~/assets/TEST_TOP.png'),
        href: INFO_LINK,
      }
  }

  if (page === 'LANG' || page === 'index') {
    return {
      img: require('~/assets/sponsors/homepage - ammobin.png'),
      href: `https://canadafirstammo.ca/?${REF('homepage')}`,
    }
  }
  switch (subType) {
    case '9MM':
      return {
        img: require('~/assets/sponsors/9mm ad - ammobin.png'),
        href: `https://canadafirstammo.ca/fh-munitions-reloads-9x19mm/?${REF(subType)}`,
      }
    case '12 GA':
      return Math.random() > 0.5
        ? {
            img: require('~/assets/sponsors/12 ga ad -1 - ammobin.png'),
            href: `https://canadafirstammo.ca/score-12-ga-waterfowl-loads-bb-2-4/?${REF(subType)}`,
          }
        : {
            img: require('~/assets/sponsors/12 ga ad - 2 - ammobin.png'),
            href: `https://canadafirstammo.ca/score-12-ga-waterfowl-loads-bb-2-4/?${REF(subType)}`,
          }

    case null:
    case undefined:
      switch (itemType) {
        case 'centerfire':
          return {
            img: require('~/assets/sponsors/Centerfire ad - ammobin.png'),
            href: `https://canadafirstammo.ca/ammunition/?${REF('centerfire')}`,
          }
        case 'shotgun':
          return {
            img: require('~/assets/sponsors/Shotgun ad - ammobin.png'),
            href: `https://canadafirstammo.ca/ammunition/shotgun/?${REF('shotgun')}`,
          }
      }
  }

  // default fallback to info link to sponsor program
  if (page === 'LANG' || page === 'index')
    return {
      img: require('~/assets/TEST_SIDE.png'),
      href: INFO_LINK,
    }
  else
    return {
      img: require('~/assets/TEST_TOP.png'),
      href: INFO_LINK,
    }
}
