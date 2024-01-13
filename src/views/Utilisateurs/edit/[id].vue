<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import CanvasLayout from '@/components/layout/CanvaLayout.vue'
import { useRoute, useRouter } from 'vue-router'
import { instance } from '@/utils/axios'
import { getCadrans, getBracelets, getClocksById, delClock } from '@/utils/Donne.js'
const route = useRoute()
const router = useRouter()
const cadrans = ref()
const bracelets = ref()
const montre = ref()
const newMontre = ref()
const userId = ref()
if (localStorage.getItem('userId')) {
  userId.value = localStorage.getItem('userId')
}
onBeforeMount(async () => {
  // const montre = ref()
  montre.value = await getClocksById(route.params.id)
  console.log(montre.value)
  const panierValue = ref()
  if (montre.value.Panier) {
    panierValue.value = true
  } else {
    panierValue.value = false
  }
  newMontre.value = {
    boitier_form: montre.value.boitier_form,
    cadran_name: montre.value.cadran,
    bracelet_name: montre.value.bracelet,
    // panier: panierValue.value
  }
})

onMounted(async () => {
  console.log(montre.value.user_id)
  console.log(userId.value)
  cadrans.value = await getCadrans()
  bracelets.value = await getBracelets()
//   cadrans.value.forEach((cadran) => {
    // console.log("Cadran ",cadran.price)
    // prixCadran.value.push(cadran.price)
//   })
  // console.log(prixCadran.value)
//   bracelets.value.forEach((cadran) => {
    // console.log("Bracelet ",cadran.price)
    // prixBracelet.value.push(cadran.price)
//   })
  // console.log(prixBracelet.value)
})

const updateMontre = async () => {
  if (userId.value == montre.value.user_id) {
      await instance.put(`/montre/update/${route.params.id}`, newMontre.value)
      newMontre.value = {
        panier: newMontre.value.panier,
        boitier_form: newMontre.value.boitier_form,
        cadran_name: newMontre.value.cadran_name,
        bracelet_name: newMontre.value.bracelet_name
      }
  } else {
    alert('Vous ne pouvez pas modifier cette montre.')
  }
}

const deleteMontre = async () => {
  console.log(userId.value)
  console.log(montre.value.user_id)
  if (userId.value == montre.value.user_id) {
    if (confirm('Vous allez supprimé votre montre, voulez-vous continuer ?')) {
      await instance.delete(`/montres/${route.params.id}/delete`)
      router.push('/Montres')
    }
  } else {
    alert('Vous ne pouvez pas supprimer cette montre.')
  }
}
</script>

<template>
  <div>
    <RouterLink to="/"> Retour à l'accueil </RouterLink>
    <div>
      <h1>Page {{ route.params.id }}</h1>
    </div>
    <form @submit.prevent="updateMontre">
      <input type="hidden" v-model="t" />
      <select required v-model="newMontre.cadran_name">
        <option
          v-for="(cadran, index) in cadrans"
          :value="cadran.texture"
          :key="index"
          :label="cadran.texture"
        />
      </select>
      <select required v-model="newMontre.bracelet_name">
        <option
          v-for="(bracelet, index) in bracelets"
          :value="bracelet.texture"
          :key="index"
          :label="bracelet.texture"
        />
      </select>
      <select required v-model="newMontre.boitier_form">
        <option value="carre" label="Carre" />
        <option value="rond" label="Rond" />
      </select>
      <input type="checkbox" v-model="newMontre.panier" />

      <button type="submit">Modifier</button>
    </form>
    <button @click="deleteMontre">Supprimer</button>
    <CanvasLayout
      :boitier_shape="newMontre.boitier_form"
      :fond="newMontre.cadran_name"
      :bracelet_tissu="newMontre.bracelet_name"
    />
  </div>
</template>

<style lang="scss"></style>