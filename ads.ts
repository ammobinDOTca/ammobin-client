declare const DOMAIN: string
declare const REGION: string
const REF = page => `utm_source=${DOMAIN}&utm_campaign=${page}`

export function getConfig(
  page: string,
  params: { [k: string]: string },
  mobile: boolean
): { href: string; img: string } {
  const { LANG: locale, itemType, subType } = params

  const INFO_LINK = `/${locale}/sponsorship`

  if (REGION != 'CA') {
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
    return mobile
      ? {
          img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/home-mobile.png',
          href: `https://canadafirstammo.ca/canadian-made/?${REF('mobile_homepage')}`,
        }
      : {
          img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/home-desktop.png',
          href: `https://canadafirstammo.ca/canadian-made/?${REF('homepage')}`,
        }
  }
  switch (subType) {
    case '17 HMR':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/17.png',
        href: `https://canadafirstammo.ca/ammunition/rimfire/?${REF(subType)}`,
      }
    case '22 LR':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/22.png',
        href: `https://canadafirstammo.ca/ammunition/rimfire/?${REF(subType)}`,
      }

    case '12 GA':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/12.png',
        href: `https://canadafirstammo.ca/ammunition/shotgun/?${REF(subType)}`,
      }
    case '20 GA':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/20.png',
        href: `https://canadafirstammo.ca/ammunition/shotgun/?${REF(subType)}`,
      }
    case '.357 MAG':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/357.png',
        href: `https://canadafirstammo.ca/search-results-page?q=357&page=1&rb_categories=Ammunition&${REF(subType)}`,
      }
    case '.38 SPECIAL':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/38.png',
        href: `https://canadafirstammo.ca/search-results-page?q=38+spl&page=1&rb_categories=Ammunition&${REF(subType)}`,
      }
    case '.40 S&W':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/40.png',
        href: `https://canadafirstammo.ca/search-results-page?q=40+s%26w&${REF(subType)}`,
      }
    case '.45 ACP':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/45.png',
        href: `https://canadafirstammo.ca/search-results-page?q=45&page=1&rb_categories=Ammunition%7CReloading&${REF(
          subType
        )}`,
      }
    case '5.56 NATO':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/556.png',
        href: `https://canadafirstammo.ca/search-results-page?q=556+223&page=1&rb_categories=Ammunition%7CFirearms%7CMags+%26+Speed+Loaders&${REF(
          subType
        )}`,
      }
    case '7.62 NATO':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/308.png',
        href: `https://canadafirstammo.ca/search-results-page?q=308&${REF(subType)}`,
      }
    case '7.62X39MM':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/762.png',
        href: `https://canadafirstammo.ca/search-results-page?q=7.62&${REF(subType)}`,
      }
    // NOT READY YET
    // case '6.5MM CREEDMOOR':
    //   return {
    //     img: `https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/65.png`,
    //     href: `https://canadafirstammo.ca/search-results-page?q=6.5&${REF(subType)}`
    //   }
    case '9MM':
      return {
        img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/9.png',
        href: `https://canadafirstammo.ca/search-results-page?q=9mm&page=1&rb_categories=Ammunition&${REF(subType)}`,
      }

    case null:
    case undefined:
      switch (itemType) {
        case 'centerfire':
          return {
            img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/centerfire.png',
            href: `https://canadafirstammo.ca/ammunition/?${REF('centerfire')}`,
          }
        case 'shotgun':
          return {
            img: `https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/shotgun.png`,
            href: `https://canadafirstammo.ca/ammunition/shotgun/?${REF('shotgun')}`,
          }
        case 'rimfire':
          return {
            img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/rimfire.png',
            href: `https://canadafirstammo.ca/ammunition/rimfire/?${REF('shotgun')}`,
          }
        case 'reloading':
          return {
            img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/reloading.png',
            href: `https://canadafirstammo.ca/reloading/?${REF('reloading')}`,
          }
      }
  }

  // default fallback to info link to sponsor program
  if (page === 'LANG' || page === 'index')
    return {
      img: require('~/assets/TEST_SIDE.png'),
      href: INFO_LINK,
    }
  // return {
  //   img: require('~/assets/TEST_TOP.png'),
  //   href: INFO_LINK,
  // }
  // default to mobile ad
  else
    return {
      img: 'https://store-udt1amkaxd.mybigcommerce.com/content/ammobin/home-mobile.png',
      href: `https://canadafirstammo.ca/canadian-made/?${REF('mobile_homepage')}`,
    }
}
