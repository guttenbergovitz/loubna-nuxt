import type { Collections } from '@nuxt/content'

export const useContentByLocale = <T extends keyof Collections>(collection: T) => {
  const { locale } = useI18n()

  const fetchAll = async () => {
    const loc = locale.value as string
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
    const loc = locale.value as string
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