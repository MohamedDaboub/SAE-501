<script setup>
import { ref, onMounted } from "vue";
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

import {instance } from "@/utils/axios";
const getMontres = async () => {
  const reponse = await instance.get("/Montres");
  return reponse.data;
};
console.log(getMontres());
const montres = ref();
onMounted(async () => {
  montres.value = await getMontres();
  console.log(montres.value);
});

</script>
<template>
  <DefaultLayout>
    <template #header>  </template>
    Page about
    <template #aside> 
        <!-- fait une boucle v-for -->
        <div v-for="montre in montres" :key="montre.id">
          <h2>{{ montre.Nom_Montre }}</h2>
          <p>{{ montre.id_boitier }}</p>
        </div>
    </template>
    <template #footer> </template>
  </DefaultLayout>
</template>

<style lang="scss">
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
