<template>
  <DefaultLayout>
    <div class="c-details">
      <CanvasLayout class="c-details__canvas"
        :boitier_image_url="montre.id_boitier"
        :bracelet_image_url="montre.id_bracelet"
        :Boitiers_Form="montre.Boitiers_Form"
      />
      <div class="c-details__info">
        <h1 class="c-details__info__titre">Montre ID: {{ montre.id_Montre }}</h1>
        <p class="c-details__info__texte">Boîtier: {{ montre.id_boitier }}</p>
        <p class="c-details__info__texte">Pierre: {{ montre.id_pierres }}</p>
        <p class="c-details__info__texte">Bracelet: {{ montre.id_bracelet }}</p>
        <p class="c-details__info__texte">Type de Boîtier: {{ montre.Boitiers_Form }}</p>
        <p class="c-details__info__prix">Prix de la Montre {{ montre.Prix_unitaire }} <span>€</span></p>
      </div>
    </div>
    <div class="button">
      <router-link class="button__btn" to="/inspirations">Retour à la page d'inspirations</router-link>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { getClocksById, } from '@/utils/Donne.js';
import CanvasLayout from '@/components/layout/CanvaLayout.vue';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';

const route = useRoute();
const montre = ref({});

onBeforeMount(async () => {
  montre.value = await getClocksById(route.params.id);
});
</script>

<style lang="scss">
.button{
  // centre le button
  display: flex;
  justify-content: center;
  align-items: center;
  margin: rem(30) auto;
  &__btn{
    background-color: $primary-color;
    background: linear-gradient(180deg, $secondary-color 0%, $primary-color 100%);
    border: none;
    border-radius: rem(5);
    box-shadow: 0px rem(4) rem(4) rgba(0, 0, 0, 0.25);
    display: inline-block;
    color: $white;
    font-family: $primary-font-familly;
    font-size: $regular-font-size;
    font-weight: 600;
    padding: rem(16) rem(32);  
    text-decoration: none;
  } 
}
.c-details {
  display: grid;
  grid-template-columns: 2fr 1fr;

  &__canvas {
    width: 50%;
    height: 50%;
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__titre{
      font-size:$bigger-font-size;
      font-family: $primary-font-familly;
      font-weight: 700;
      text-align: center;
      margin-bottom: rem(30);
    }
    &__texte{
      font-size:rem(20);
      font-family: $primary-font-familly;
    }
    &__prix{
      font-size:rem(20);
      font-family: $primary-font-familly;
      font-weight: 700;
      color: #f00;
    }
  }
}
</style>
