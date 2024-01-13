<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import MyCard from '@/components/elements/MyCard.vue'
import {instance} from '@/utils/axios'
import { ref, onMounted } from "vue";

const getMontres = async()=>{
  const response = await instance.get('/Montres');
  return response.data;
}
const montres = ref();

onMounted(async()=>{
  montres.value = await getMontres();
})
</script>

<template>
    <DefaultLayout>
        <div>
    <h1>Liste des Montres</h1>
    <div v-for="montre in montres" :key="montre.id_montre">
      <MyCard :boitier_image_url="montre.id_boitier" :bracelet_image_url="montre.id_bracelet" :Boitiers_Form="montre.Boitiers_Form"/>
    </div>
  </div>
    </DefaultLayout>
</template>

<style lang="scss" scoped>

</style>