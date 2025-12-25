<template>
  <Html :lang="locale" :dir="localeProperties?.dir || 'rtl'">
    <Head>
      <Meta charset="utf-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Title>{{ $t('nav.portal') }}</Title>
    </Head>
    <Body>
      <div class="layout">
        <header class="header">
          <div class="container">
            <nav class="nav">
              <NuxtLink to="/" class="logo">
                {{ $t('nav.portal') }}
              </NuxtLink>
              <div class="nav-links">
                <NuxtLink to="/" class="nav-link">{{ $t('nav.home') }}</NuxtLink>
                <NuxtLink to="/apply" class="nav-link">{{ $t('nav.apply') }}</NuxtLink>
                <NuxtLink to="/list" class="nav-link">{{ $t('nav.list') }}</NuxtLink>
                <button @click="toggleLocale" class="lang-switcher">
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

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const localeProperties = computed(() => {
  return (locales.value as any[]).find((l) => l.code === locale.value);
});

const toggleLocale = () => {
  const newLocale = locale.value === 'ar' ? 'en' : 'ar';
  setLocale(newLocale);
};
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: var(--nds-color-primary, #1e5a3f);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}

.lang-switcher {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.lang-switcher:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.main {
  flex: 1;
  padding: 2rem 0;
}

.footer {
  background-color: var(--nds-color-surface, #f5f5f5);
  padding: 2rem 0;
  text-align: center;
  color: var(--nds-color-text-secondary, #666);
  margin-top: auto;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    padding: 0.5rem;
  }
}
</style>
