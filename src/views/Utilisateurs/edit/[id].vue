<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { instance } from '@/utils/axios'
import { getClocksById, delClock, getboitiers, getPierres, getbracelet } from '@/utils/Donne.js'
import CanvasLayout from '@/components/layout/CanvaLayout.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';

const route = useRoute()
const router = useRouter()
const getboitier = ref([])
const getPierre = ref([])
const getBracelets = ref([])
const montre = ref({})
const nouveauMontre = ref({})
const userId = ref(localStorage.getItem('userId'))

onBeforeMount(async () => {
  getboitier.value = await getboitiers()
  getPierre.value = await getPierres()
  getBracelets.value = await getbracelet()
  montre.value = await getClocksById(route.params.id)
  nouveauMontre.value = {
    id_Utilisateur: userId.value,
    id_boitier: montre.value.id_boitier,
    id_pierres: montre.value.id_pierres,
    id_bracelet: montre.value.id_bracelet,
    Boitiers_Form: montre.value.Boitiers_Form,
  };
})

const updateMontre = async () => {
  if (userId.value == montre.value.id_Utilisateur) {
    // Vérifier si toutes les propriétés de nouveauMontre sont définies
    if (Object.values(nouveauMontre.value).every(value => value !== undefined && value !== '')) {
      await instance.put(`/Montres/edit/${route.params.id}`, nouveauMontre.value);
      router.push('/Montre');
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  } else {
    alert('Vous ne pouvez pas modifier cette montre.');
  }
};

const deleteMontre = async () => {
  if (userId.value == montre.value.id_Utilisateur) {
    if (confirm('Vous allez supprimer votre montre, voulez-vous continuer ?')) {
      await delClock(route.params.id)
      router.push('/Montre')
    }
  } else {
    alert('Vous ne pouvez pas supprimer cette montre.')
  }
}
</script>

<template>
  <DefaultLayout>
    <div>
      <h1>Page {{ route.params.id }}</h1>
    </div>
    <form @submit.prevent="updateMontre">
      <div>
        <label for="boitiers">Choisissez le boitiers</label>
        <select name="boitiers" required v-model="nouveauMontre.id_boitier">
          <option v-for="(boitier, index) in getboitier" :key="index" :label="boitier.nom_boitier" :value="boitier.boitier_image_url"></option>
        </select>
      </div>
      <div>
        <label for="pierre">Choisissez l'image de votre cadran</label>
        <select name="pierre" v-model="nouveauMontre.id_pierres" id="">
          <option v-for="(pierre, index) in getPierre" :key="index" :label="pierre.nom_pierres"  :value="pierre.nom_pierres"></option>
        </select>
      </div>
      <div>
        <label for="bracelet">Choisissez l'image de votre cadran</label>
        <select name="bracelet" v-model="nouveauMontre.id_bracelet" id="">
          <option v-for="(bracelet, index) in getBracelets" :key="index" :label="bracelet.nom_bracelet" :value="bracelet.bracelet_image_url"></option>
        </select>
      </div>
      <div>
        <label for="typeBoitier">Choisissez l'image de votre cadran</label>
        <select name="typeBoitier" id="typeBoitier" v-model="nouveauMontre.Boitiers_Form">
            <option value="rond" selected>Round</option>
            <option value="carré">Carré</option>
        </select>
      </div>
      <button type="submit">Modifier</button>
    </form>
    <button @click="deleteMontre">Supprimer</button>
    <CanvasLayout :boitier_image_url="nouveauMontre.id_boitier" :bracelet_image_url="nouveauMontre.id_bracelet" :Boitiers_Form="nouveauMontre.Boitiers_Form"/>
    <router-link to="/Montre">Retour à l'accueil</router-link>
  </DefaultLayout>
</template>

<style lang="scss"></style>