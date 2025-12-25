<template>
  <Html :lang="locale"
        :dir="localeProperties?.dir || 'rtl'">

  <Head>
    <Meta charset="utf-8" />
    <Meta name="viewport"
          content="width=device-width, initial-scale=1" />
    <Title>{{ $t('nav.portal') }}</Title>
  </Head>

  <Body>
    <div class="layout">
      <header class="header">
        <div class="container">
          <nav class="nav">
            <div class="nav-header">
              <NuxtLink to="/"
                        class="logo">
                <img src="/images/saudi-swords-symbol.png" alt="Saudi Emblem" class="logo-emblem" />
                <span>{{ $t('nav.portal') }}</span>
              </NuxtLink>
              <button @click="mobileMenuOpen = !mobileMenuOpen"
                      class="burger-menu"
                      aria-label="Toggle menu">
                <span :class="{ 'burger-open': mobileMenuOpen }"></span>
                <span :class="{ 'burger-open': mobileMenuOpen }"></span>
                <span :class="{ 'burger-open': mobileMenuOpen }"></span>
              </button>
            </div>
            <div class="nav-links"
                 :class="{ 'nav-links-open': mobileMenuOpen }">
              <NuxtLink to="/"
                        class="nav-link"
                        @click="mobileMenuOpen = false">{{ $t('nav.home') }}</NuxtLink>
              <NuxtLink to="/apply"
                        class="nav-link"
                        @click="mobileMenuOpen = false">{{ $t('nav.apply') }}</NuxtLink>
              <NuxtLink to="/list"
                        class="nav-link"
                        @click="mobileMenuOpen = false">{{ $t('nav.list') }}</NuxtLink>
              <button @click="toggleLocale"
                      class="lang-switcher">
                {{ locale === 'ar' ? 'EN' : 'عربي' }}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main class="main">
        <div class="container">
          <NuxtPage />
        </div>
      </main>

      <footer class="footer">
        <div class="container">
          <p>{{ $t('footer.copyright') }}</p>
        </div>
      </footer>
    </div>
  </Body>

  </Html>
</template>

<script setup
        lang="ts">
        const { locale, locales, setLocale } = useI18n();
        const mobileMenuOpen = ref(false);

        const localeProperties = computed(() => {
          return (locales.value as any[]).find((l) => l.code === locale.value);
        });

        const toggleLocale = () => {
          const newLocale = locale.value === 'ar' ? 'en' : 'ar';
          setLocale(newLocale);
        };
</script>
