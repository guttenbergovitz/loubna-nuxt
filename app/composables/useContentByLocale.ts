import type { Collections } from '@nuxt/content'

export const useContentByLocale = <T extends keyof Collections>(collection: T) => {
  const { locale } = useI18n()

  const resolveLocale = (): string => {
    const first = useRoute().path.split('/')[1]
    if (first === 'en' || first === 'nb') return first
    return locale.value as string
  }

  const fetchAll = async () => {
    const loc = resolveLocale()
    const items = await queryCollection(collection)
      .where('locale', '=', loc)
      .order('sort', 'ASC')
      .all()
    if (items.length > 0) return items
    // fallback to default locale
    return queryCollection(collection)
      .where('locale', '=', 'en')
      .order('sort', 'ASC')
      .all()
  }

  const fetchByName = async (name: string) => {
    const loc = resolveLocale()
    let item = await queryCollection(collection)
      .where('locale', '=', loc)
      .where('page', '=', name)
      .first()
    if (!item) {
      item = await queryCollection(collection)
        .where('locale', '=', 'en')
        .where('page', '=', name)
        .first()
    }
    return item
  }

  return { fetchAll, fetchByName }
}