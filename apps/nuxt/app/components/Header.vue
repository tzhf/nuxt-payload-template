<script setup lang="ts">
// const { resolveLink } = useResolveLink()
// const { activeHash } = useScrollSpy()
const { siteSettings } = await useSiteSettings()

const route = useRoute()
const path = computed(() => route.path)

const headerScrollClass = ref('')
onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      headerScrollClass.value = 'scroll'
    } else {
      headerScrollClass.value = ''
    }
  })
})

const menuOpen = ref<boolean>(false)
const hasToggled = ref(false)
function toggle() {
  menuOpen.value = !menuOpen.value
  hasToggled.value = true
}

// function isLinkActive(link: NavItem['link']): boolean {
//   const resolvedLink = resolveLink(link)
//   if (resolvedLink.includes('#')) return activeHash.value === `#${resolvedLink.split('#')[1]}`
//   return path.value === resolvedLink
// }
</script>

<template>
  <header
    class="fixed top-0 left-0 z-50 flex h-20 w-full border-b transition-colors duration-500"
    :class="[headerScrollClass]"
  >
    <div
      class="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="flex items-center gap-2"
        aria-label="Return to homepage"
      >
        <img
          v-if="siteSettings?.navbar?.logo"
          :src="siteSettings?.navbar?.logo.url"
          :alt="siteSettings?.meta?.title || 'Logo'"
          class="max-h-20"
        />
        <span class="text-2xl font-extrabold">{{
          siteSettings?.meta?.title
        }}</span>
      </NuxtLink>

      <nav aria-label="Main navigation" class="ml-auto flex h-full shrink-0">
        <button
          class="flex cursor-pointer items-center md:hidden"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          @click="toggle()"
        >
          <Icon
            :key="!hasToggled ? 'initial' : menuOpen ? 'open' : 'closed'"
            :name="
              !hasToggled
                ? 'icons:menu'
                : menuOpen
                  ? 'icons:menu-to-close-alt-transition'
                  : 'icons:close-to-menu-alt-transition'
            "
            mode="svg"
            aria-hidden="true"
          />
        </button>

        <ul class="hidden h-full items-center gap-4 md:flex" role="list">
          <li
            v-for="item in siteSettings?.navbar?.links"
            :key="item.label"
            class="h-full"
          >
            <!-- <NuxtLink
                :to="item.url"
                :target="item.openInNewTab ? '_blank' : undefined"
                :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
                class="relative flex h-full cursor-pointer items-center text-base font-medium "
            >
                {{ item.label }}
            </NuxtLink> -->

            <NavItem
              :item="item"
              :class="`transition-border border-y-[3px] border-t-transparent duration-500 ease-in-out`"
            />
          </li>

          <li
            v-for="button in siteSettings?.navbar?.buttons"
            :key="button.label"
          >
            <!-- <Button :button="button" /> -->
          </li>
        </ul>
      </nav>
    </div>

    <!-- Mobile Nav overlay  -->
    <Teleport to="body">
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        :aria-hidden="!menuOpen"
        class="fixed inset-0 z-40 flex flex-col px-4 pt-28 opacity-75 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden"
        :class="[menuOpen ? 'translate-x-0' : 'translate-x-full']"
      >
        <ul class="space-y-12" role="list">
          <li
            v-for="item in siteSettings?.navbar?.links"
            :key="item.label"
            class="flex"
          >
            <NavItem
              :item="item"
              :class="`transition-border border-y-[3px] border-t-transparent duration-500 ease-in-out`"
            />
          </li>

          <li
            v-for="button in siteSettings?.navbar?.buttons"
            :key="button.label"
          >
            <!-- <Button :button="button" @click="menuOpen = false" /> -->
          </li>
        </ul>
      </nav>
    </Teleport>
  </header>
</template>

<style>
header,
#mobile-nav {
  background-color: var(--nav-background-color);
  color: var(--nav-text-color);
}
header.scroll {
  background-color: var(--nav-background-color-scroll);
}

/* section[id] {
  scroll-margin-top: 80px; /* match your header height
} */
</style>
