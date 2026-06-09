import { GetGlobalsDocument } from '#graphql-exports'
import type { SiteSettings } from '#payload-types'

export interface GlobalQueryResult {
  SiteSettings: SiteSettings
}

export const useSiteSettings = async () => {
  const siteSettings = useState<SiteSettings | null>('siteSettings', () => null)

  if (!siteSettings.value) {
    const { data } = await useAsyncQuery<GlobalQueryResult>(GetGlobalsDocument)
    siteSettings.value = data.value?.SiteSettings || null
  }

  return { siteSettings }
}

// export const useActiveSettings = () => {
//   const activeSettings = useState<SiteSettings | null>(
//     'activeSettings',
//     () => null,
//   )
//   return { activeSettings }
// }
