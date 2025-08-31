<template>
  <a-modal
    id="confirmDeleteModalAddBuilding"
    v-model:open="open"
    name="confirmDeleteModalAddBuilding"
    :title="$t('confirm_deletion')"
    :ok-text="$t('delete')"
    ok-type="danger"
    @ok="handleDelete"
    @cancel="closeDeleteModalAddBuilding"
  >
    <p>{{ $t('delete_modal_content') }}</p>
  </a-modal>
</template>

<script lang="ts" setup>
// ---------------------- Variables ----------------------
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  fallback: {
    type: Function as PropType<() => void>,
    required: true,
  },
});
const open = toRef(props, 'open');
const { $event } = useNuxtApp();

// ---------------------- Functions ----------------------
const closeDeleteModalAddBuilding = () => {
  $event.emit('closeDeleteModalAddBuilding');
};

const handleDelete = () => {
  closeDeleteModalAddBuilding();
  props.fallback();
};
</script>
