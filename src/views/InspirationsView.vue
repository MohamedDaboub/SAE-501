<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import MyCard from '@/components/elements/MyCard.vue'
import { instance } from '@/utils/axios'
import { ref, onMounted } from "vue";

const getMontres = async () => {
  const response = await instance.get('/Montres');
  return response.data;
}

const montres = ref([]);
const currentPage = ref(1);
const cardsPerPage = 6;

const getCardRange = () => {
  const startIndex = (currentPage.value - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  return { startIndex, endIndex };
};

onMounted(async () => {
  montres.value = await getMontres();
})
</script>

<template>
  <DefaultLayout>
    <div>
      <h1>Liste des Montres</h1>
      <div v-for="montre in montres && montres.length ? montres.slice(getCardRange().startIndex, getCardRange().endIndex) : []" :key="montre.id_montre">
        <MyCard :boitier_image_url="montre.id_boitier" :bracelet_image_url="montre.id_bracelet" :Boitiers_Form="montre.Boitiers_Form"/>
        <p>{{ montre.Prix_unitaire }}</p>
        <p>{{montre.id_bracelet}}</p>
      </div>
      
      <div>
        <button @click="currentPage -= 1" :disabled="currentPage === 1">Précédent</button>
        <span>{{ currentPage }}</span>
        <button @click="currentPage += 1" :disabled="!montres || getCardRange().endIndex >= montres.length">Suivant</button>
      </div>
    </div>
  </DefaultLayout>
</template>


<style lang="scss" scoped>

</style>