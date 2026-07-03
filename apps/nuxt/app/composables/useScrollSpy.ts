import { useWindowScroll } from '@vueuse/core'

export function useScrollSpy(
  selector = 'section[id]',
  anchor = 0.35, // 35% down viewport
) {
  const activeHash = ref<string | null>(null)
  const { y } = useWindowScroll()

  const update = () => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    )

    const anchorY = window.innerHeight * anchor

    const current = sections.find((section) => {
      const rect = section.getBoundingClientRect()
      return rect.top <= anchorY && rect.bottom >= anchorY
    })

    activeHash.value = current ? `#${current.id}` : null
  }

  onMounted(() => {
    update()
    watch(y, update)
  })

  return { activeHash }
}
