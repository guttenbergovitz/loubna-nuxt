import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

type PageKey = 'home' | 'about' | 'bio' | 'workshop' | 'contact' | 'bookACall' | 'businessGift' | 'thankYou'

export const usePageSeo = (pageKey: PageKey) => {
  const route = useRoute()
  const router = useRouter()
  const { t, locale } = useI18n()

  const siteUrl = 'https://loubnaphoto.no'
  const siteName = 'Loubna Photo'

  // Get SEO data from i18n
  const seoData = computed(() => {
    if (pageKey === 'thankYou') {
      return {
        title: t('thankYou.bookCall.title'),
        description: t('thankYou.bookCall.message'),
        keywords: ''
      }
    }

    const key = `seo.${pageKey}`
    return {
      title: t(`${key}.title`),
      description: t(`${key}.description`),
      keywords: t(`${key}.keywords`)
    }
  })

  const pageUrl = computed(() => {
    const path = route.path
    return `${siteUrl}${path}`
  })

  const ogImage = computed(() => {
    const imageMap: Record<PageKey, string> = {
      home: '/images/og/loubna-photo-og.jpg',
      about: '/images/og/about-og.jpg',
      bio: '/images/og/bio-og.jpg',
      workshop: '/images/og/workshop-og.jpg',
      contact: '/images/og/loubna-photo-og.jpg',
      bookACall: '/images/og/loubna-photo-og.jpg',
      businessGift: '/images/og/loubna-photo-og.jpg',
      thankYou: '/images/og/loubna-photo-og.jpg'
    }
    return `${siteUrl}${imageMap[pageKey]}`
  })

  // Get hreflang URLs for both locales
  const getAlternateUrl = (lang: string) => {
    const currentPath = route.path
    // Remove locale prefix from current path
    const pathWithoutLocale = currentPath.replace(/^\/(en|nb)/, '')
    return `${siteUrl}/${lang}${pathWithoutLocale}`
  }

  // Noindex for thank-you pages
  const isNoindex = computed(() => {
    return pageKey === 'thankYou' || route.path.includes('/thank-you')
  })

  // Set meta tags
  useHead({
    title: seoData.value.title,
    meta: [
      {
        name: 'description',
        content: seoData.value.description
      },
      {
        name: 'keywords',
        content: seoData.value.keywords
      },
      // Open Graph
      {
        property: 'og:title',
        content: seoData.value.title
      },
      {
        property: 'og:description',
        content: seoData.value.description
      },
      {
        property: 'og:type',
        content: pageKey === 'bio' ? 'profile' : 'website'
      },
      {
        property: 'og:url',
        content: pageUrl.value
      },
      {
        property: 'og:image',
        content: ogImage.value
      },
      {
        property: 'og:site_name',
        content: siteName
      },
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: seoData.value.title
      },
      {
        name: 'twitter:description',
        content: seoData.value.description
      },
      {
        name: 'twitter:image',
        content: ogImage.value
      },
      // Noindex for thank-you pages
      ...(isNoindex.value
        ? [
            {
              name: 'robots',
              content: 'noindex, nofollow'
            }
          ]
        : [])
    ],
    link: [
      // Canonical URL
      {
        rel: 'canonical',
        href: pageUrl.value
      },
      // hreflang for i18n
      {
        rel: 'alternate',
        hreflang: 'en',
        href: getAlternateUrl('en')
      },
      {
        rel: 'alternate',
        hreflang: 'nb',
        href: getAlternateUrl('nb')
      },
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: getAlternateUrl('en')
      }
    ]
  })

  return {
    seoData,
    pageUrl,
    ogImage,
    isNoindex
  }
}
