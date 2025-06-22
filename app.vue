<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable no-empty -->
<template>
  <a-config-provider
    :locale="localeRef"
    :theme="{
      algorithm: darkModeException.find((route) => currentRoute.path.includes(route))
        ? theme.defaultAlgorithm
        : lightMode
          ? theme.defaultAlgorithm
          : theme.darkAlgorithm,
    }"
  >
    <div class="w-full h-full flex flex-col">
      <LayoutLoading />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <a-modal
        v-model:open="deleteConfirmModal"
        ok-type="danger"
        :ok-text="$t('delete')"
        :title="$t('confirm_deletion')"
        @ok="
          () => {
            deleteConfirmModal = false;
            if (noPasswordRequired) {
              callbackFunction();
            } else {
              confirmPasswordModal = true;
              passwordDeleteConfirmFormRef?.clearValidate();
              passwordDeletionfForm.confirmPasswordForDeletion = '';
            }
          }
        "
      >
        <p>{{ $t('delete_modal_content') }}</p>
      </a-modal>
      <a-modal
        v-model:open="updateConfirmModal"
        :ok-text="$t('confirm')"
        :title="$t('confirm_update')"
        @ok="
          () => {
            updateConfirmModal = false;
            if (noPasswordRequired) {
              callbackFunction();
            } else {
              confirmPasswordModal = true;
              passwordDeleteConfirmFormRef?.clearValidate();
              passwordDeletionfForm.confirmPasswordForDeletion = '';
            }
          }
        "
      >
        <p>{{ updateModalContent }}</p>
      </a-modal>
      <a-modal
        v-model:open="confirmPasswordModal"
        :ok-type="isDeleteModalOpen ? 'danger' : 'primary'"
        :ok-text="$t('confirm')"
        :title="$t(isDeleteModalOpen ? 'confirm_deletion_with_password' : 'confirm_update_with_password')"
        @ok="verifyPassword"
      >
        <a-form ref="passwordDeleteConfirmFormRef" :model="passwordDeletionfForm" layout="vertical">
          <a-form-item
            :rules="[{ required: true, message: $t('password_require'), trigger: 'blur' }]"
            name="confirmPasswordForDeletion"
          >
            <label class="mb-1 flex items-center" for="confirmPasswordForDeletion">
              <span>{{ $t('password') }}</span>
              <img :src="svgPaths.asterisk" alt="Asterisk" class="ms-1 select-none" />
            </label>
            <a-input-password
              id="confirmPasswordForDeletion"
              v-model:value="passwordDeletionfForm.confirmPasswordForDeletion"
              :placeholder="$t('password')"
              autocomplete="off"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </a-config-provider>
</template>

<script lang="ts" setup>
import enUS from 'ant-design-vue/es/locale/en_US';
import viVN from 'ant-design-vue/es/locale/vi_VN';
import { theme, notification, type FormInstance } from 'ant-design-vue';
import { pageRoutes } from './consts/page_routes';
import { svgPaths } from './consts/svg_paths';
import { getMessageCode } from './consts/api_response';
import { api } from './services/api';

// ---------------------- Variables ----------------------
const localeRef = ref(viVN);
const { $event } = useNuxtApp();
const { locale, t } = useI18n();
const lightModeCookie = useCookie('lightMode', {
  maxAge: 60 * 60 * 24 * 365,
});
const currentRoute = useRoute();
const darkModeException = Object.values(pageRoutes.authentication);
const lightMode = computed(
  () => lightModeCookie.value === null || lightModeCookie.value === undefined || parseInt(lightModeCookie.value) === 1
);
const updateModalContent = ref<string>('');
const updateConfirmModal = ref<boolean>(false);
const deleteConfirmModal = ref<boolean>(false);
const confirmPasswordModal = ref<boolean>(false);
const callbackFunction = ref<() => void>(() => {});
const passwordDeletionfForm = ref({
  confirmPasswordForDeletion: '',
});
const passwordDeleteConfirmFormRef = ref<FormInstance>();
const isDeleteModalOpen = ref<boolean>(false);
const noPasswordRequired = ref<boolean>(false);

notification.config({
  placement: 'topRight',
  rtl: false,
  duration: 5,
});

// ---------------------- Functions ----------------------
async function verifyPassword() {
  let validateFail = true;
  let allowCallBack = false;

  try {
    if (!passwordDeleteConfirmFormRef.value) return;
    await passwordDeleteConfirmFormRef.value.validateFields();
    const response = await api.authentication.verifyPassword(passwordDeletionfForm.value.confirmPasswordForDeletion);
    if (response.data) {
      allowCallBack = true;
      validateFail = false;
    } else {
      notification.error({
        message: t('wrong_password'),
        description: t('wrong_password_description'),
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (err: any) {
    if (
      err.response?._data.message === getMessageCode('SYSTEM_ERROR') ||
      err.response?._data.message === getMessageCode('INVALID_PARAMETER')
    ) {
      notification.error({
        message: t('system_error_title'),
        description: t('system_error_description'),
      });
    } else if (err.response?._data.message === getMessageCode('PARAMETER_VALIDATION')) {
      notification.error({
        message: t('empty_password'),
        description: t('password_require'),
      });
    }
  } finally {
    if (!validateFail) {
      confirmPasswordModal.value = false;
    }
    if (allowCallBack) {
      callbackFunction.value();
    }
  }
}

// ---------------------- Event Listeners ----------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
$event.on('toggleTheme', (e: any) => {
  lightModeCookie.value = e.isLightMode ? '1' : '0';
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
$event.on('deleteItem', (e: any) => {
  deleteConfirmModal.value = true;
  callbackFunction.value = e.callback;
  isDeleteModalOpen.value = true;
  noPasswordRequired.value = e.noPasswordRequired || false;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
$event.on('updateItem', (e: any) => {
  updateConfirmModal.value = true;
  callbackFunction.value = e.callback;
  updateModalContent.value = t(e.updateModalContent);
  isDeleteModalOpen.value = false;
  noPasswordRequired.value = e.noPasswordRequired || false;
});

$event.on('deleteItemSuccess', () => {
  notification.info({
    message: t('delete_success'),
    description: t('delete_success_content'),
  });
});

// ---------------------- Lifecycles ----------------------
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

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

::-webkit-scrollbar-thumb {
  background-color: #7a7a7a;
  border-radius: 3px;
}

.hideBrowserScrollbar::-webkit-scrollbar {
  display: none;
}
.btn-primary {
    @apply py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75;
}

.hideBrowserScrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.ant-input-search-button{
  display:flex !important;
  justify-content:center !important;
  align-items: center !important;
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
