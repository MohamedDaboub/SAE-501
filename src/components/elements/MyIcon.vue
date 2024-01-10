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
<i :class="className">
  <component :is='getIcon' />
</i>
</template>

<style lang='scss' scoped>
.icon{
  align-items: center;
  background: $white;
  border-radius: 100%;
  box-shadow: 0 0 rem(5) 0 $gray;
  display: inline-flex;
  height: rem(50);
  justify-content: center;
  width: rem(50);
}
.iconPanier{
  align-items: center;
  display: inline-flex;
  height: rem(50);
  justify-content: center;
  width: rem(50);
}
</style>