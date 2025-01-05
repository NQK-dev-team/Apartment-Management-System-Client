<template>
  <a-config-provider :locale="localeRef">
    <div class="w-full h-full flex flex-col">
      <GeneralLoading />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </a-config-provider>
</template>

<script lang="ts" setup>
import enUS from 'ant-design-vue/es/locale/en_US';
import viVN from 'ant-design-vue/es/locale/vi_VN';

// ---------------------- Variables ----------------------
const localeRef = ref(viVN);
const { $event } = useNuxtApp();
const { locale } = useI18n();
const lightModeCookie = useCookie('lightMode', {
  maxAge: 60 * 60 * 24 * 365,
});

// ---------------------- Event Listeners ----------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
$event.on('toggleTheme', (e: any) => {
  lightModeCookie.value = e.isLightMode ? '1' : '0';
});

// ---------------------- Life Cycles ----------------------
watch(
  () => locale.value,
  (newVal) => {
    localeRef.value = newVal === 'en' ? enUS : viVN;
  },
  { immediate: true }
);
</script>

<style lang="css">
html,
head,
body {
  height: 100vh;
  width: 100vw;
  height: 100dvh;
  width: 100dvw;
  font-family:'Roboto', sans-serif;
}

.dark_theme{
  background: #0A0A0A !important;
  color: #ffffff !important;
}

.white_text label,
.white_text p,
.white_text h1,
.white_text h2,
.white_text h3,
.white_text h4,
.white_text h5,
.white_text h6{
  color: #ffffff !important;
}

.dark_object *{
  color: #ffffff !important;
  background: #303030 !important;
}

#__nuxt {
  height: 100%;
  width: 100%;
}
</style>
