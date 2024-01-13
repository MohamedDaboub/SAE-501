<script setup>
import { ref, onMounted } from "vue";
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

import {instance } from "@/utils/axios.js";

const getMontres = async () => {
  const reponse = await instance.get("/Montres");
  return reponse.data;
};
console.log(getMontres());
const Montres = ref([]);
onMounted(async () => {
  Montres.value = await getMontres();
  console.log(Montres.value);
});

</script>
<template>
  <DefaultLayout>
    <template #header>  </template>
    <div v-for="montre in Montres" :key="montre.id_Montre">
          <!-- <p>{{montre.id_boitier}}</p>
          <p>{{montre.id_bracelet}}</p>
          <p>{{montre.Boitiers_Form}}</p> -->

        </div>   
    <template #aside> 
        <!-- fait une boucle v-for -->
         
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
