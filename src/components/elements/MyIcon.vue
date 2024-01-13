<script setup>
import { computed } from 'vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconPanier from '@/components/icons/IconPanier.vue'

const props = defineProps({
  name: String,
})
const getIcon = computed(() => {
  switch (props.name) {
    case 'Facebook':
      return IconFacebook 
    case 'Instagram':
      return IconInstagram 
    case 'Twitter':
      return IconTwitter
    default:
      return IconPanier
  }
})
</script>

<template>
<i>
  <component :is='getIcon' />
</i>
</template>

<style lang='scss' scoped>
</style>