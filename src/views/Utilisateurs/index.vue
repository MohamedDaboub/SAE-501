<script setup>
import { ref, onMounted, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import { instance } from '@/utils/axios'
import { delClock } from '@/utils/Donne.js'
import CanvasLayout from '@/components/layout/CanvaLayout.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';

// const route = useRoute()
const router = useRouter() // Add this line to get access to the router

const montres = ref()

const modifierMontre = (montreId) => {
  router.push({ name: 'Montre-edit-id', params: { id: montreId } });
};
const t = ref()
if (localStorage.getItem('userId')) {
  t.value = localStorage.getItem('userId')
}
const getClocks = async () => {
  const reponse = await instance.get(`/Utilisateurs/${t.value}/Montres`)
  return reponse.data
}

onMounted(async () => {
  montres.value = await getClocks()

})
onUpdated(async () => {
  montres.value = await getClocks()
})
</script>

<template>
  <DefaultLayout>
    <div>
    <h1 class="Titre">Vos montres</h1>
    <p class="texte">ici vous trouvre tout vous montre </p>
    <ul class="card">
      <li class="card__plus" v-for="(montre, index) in montres" :key="index">
        <CanvasLayout class="card__plus__canavas"
        :boitier_image_url="montre.id_boitier" :bracelet_image_url="montre.id_bracelet" :Boitiers_Form="montre.Boitiers_Form"
        />
        <router-link class="card__plus__Modifier" :to="{ name: 'Montre-edit-id', params: { id: montre.id_Montre } }">Modifier</router-link>
        <button  class="card__plus__Supprimer" @click="delClock(montre.id_Montre)">Supprimer</button>
      </li>
    </ul>
  </div>
  </DefaultLayout>
</template>
<style lang="scss" scoped>
.Titre{
  text-align: center;
  font-size: 2rem;
  font-family: $primary-font-familly;
  margin: rem(50);
  font-weight: 700;
}
.texte{
  text-align: start;
  font-size: 1.5rem;
  font-family: $primary-font-familly;
  margin: rem(50);
}
.card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-radius: 8px;
  gap: rem(20);
  margin: 10px;
  max-width: rem(1400);
  margin: rem(50) auto;
  font-family: $primary-font-familly;
  &__plus{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
    border-radius: 8px;

    &__canavas{
      width: 100%;
      height: 100%;
      border-radius: rem(10)  rem(10)  rem(0) rem(0);
    }
    &__Modifier{
      background-color: #000;
      color: #fff;
      text-decoration: none;
      text-align: center;
      padding: rem(10);
      margin: rem(10);
      &:hover{
        background-color: #fff;
        color: #000;
      }
    }
    &__Supprimer{
      background-color: #000;
      color: #fff;
      text-decoration: none;
      text-align: center;
      padding: rem(10);
      margin: rem(10);
      &:hover{
        background-color: #fff;
        color: #000;
      }
    }
  }

}
</style>