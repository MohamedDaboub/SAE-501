<script setup>
import { ref, onMounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import { instance } from '@/utils/axios'
import { delClock } from '@/utils/Donne.js'
import CanvasLayout from '@/components/layout/CanvaLayout.vue'

const route = useRoute()

const montres = ref()

const modifierMontre = (montreId) => {
  const route = useRoute();
  // Utilisez votre logique pour la redirection
  route.push({ name: 'Montre-edit-id', params: { id: montreId } });
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
  <div>
    <h1>Vos montres</h1>
    <ul>
      <li v-for="(montre, index) in montres" :key="index">
        <!-- <RouterLink to="" @click="$router.push({ name: 'Montre-edit-id', params: { id: montre.montre_id } })">Modifier</RouterLink> -->
        <a href="#" @click="modifierMontre(montre.montre_id)">Modifier</a>
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
</template>