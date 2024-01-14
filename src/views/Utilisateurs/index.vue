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
    <h1>Vos montres</h1>
    <p>ici vous trouvre tout vous montre </p>
    <ul>
      <li v-for="(montre, index) in montres" :key="index">
        <!-- <RouterLink to="" @click="$router.push({ name: 'Montre-edit-id', params: { id: montre.montre_id } })">Modifier</RouterLink> -->
        <router-link :to="{ name: 'Montre-edit-id', params: { id: montre.id_Montre } }">Modifier</router-link>
         <!--       router.push('/login'); fait moi push sur montre-edit-id  -->
        <!-- <button @click="updateMontre(montre.montre_id)">Modifier</button>  -->
        <button  @click="delClock(montre.id_Montre)">Supprimer</button>
        <!-- {{ montre.id_Montre}} -->
        <CanvasLayout
        :boitier_image_url="montre.id_boitier" :bracelet_image_url="montre.id_bracelet" :Boitiers_Form="montre.Boitiers_Form"
        />
      </li>
    </ul>
  </div>
  </DefaultLayout>
</template>