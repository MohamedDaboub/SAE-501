<script setup>
import { ref, onMounted } from "vue";
import {instance } from "@/utils/axios";
import {getboitiers,getPierres,getbracelet } from "@/utils/Donne.js";
import CanvasLayout from '@/components/layout/CanvaLayout.vue'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const router = useRouter();
const getboitier = ref();
const getPierre = ref();
const getBracelets = ref();
const userId = ref()

const nouveauMontre = ref(({
    id_boitier:"background_black01.png",
    id_pierres:"Aigue-marine",
    id_bracelet:"texture-tissus-or.jpg",
    Boitiers_Form:"rond",
}))
onMounted(async () => {
  getboitier.value = await getboitiers();
  getPierre.value = await getPierres();
  getBracelets.value = await getbracelet();

});

const addMontre = async () => {
  await instance.post('Montres/add', nouveauMontre.value);

  // Utiliser SweetAlert pour afficher un message
  Swal.fire({
    title: 'Montre ajoutée au panier!',
    icon: 'success',
    confirmButtonText: 'OK',
  });

  setTimeout(() => {
    // router push to montre
    router.push('/montre');
  }, 2000);
  nouveauMontre.value = {
    id_Utilisateur: userId.value,
    id_boitier: "background_black01.png",
    id_pierres: "Aigue-marine",
    id_bracelet: "texture-tissus-or.jpg",
    Boitiers_Form: "rond",
  };
};
if (localStorage.getItem('userId')) {
  userId.value = localStorage.getItem('userId');
  nouveauMontre.value = ({
    id_Utilisateur:userId.value,
    id_boitier:"background_black01.png",
    id_pierres:"Aigue-marine",
    id_bracelet:"texture-tissus-or.jpg",
    Boitiers_Form:"rond",
});
}


</script>

<template>
    <section class="Layout">
    <div class="Layout__Canvas">
      <CanvasLayout :boitier_image_url="nouveauMontre.id_boitier" :bracelet_image_url="nouveauMontre.id_bracelet" :Boitiers_Form="nouveauMontre.Boitiers_Form"/>
    </div>
    <div class="Layout__Config">
      <h2 class="Layout__Config__Title">Configurez votre montre</h2>
      <p class="Layout__Config__Text">Vous avez le choix de configurer votre montre avec les options suivantes</p>
        <form @submit.prevent="addMontre">
            <div>
                <label for="boit">Choisisez l'image de votre cadran</label>
                <select  name="boit" required v-model="nouveauMontre.id_boitier"   >
                    <option v-for="(boitier,index) in getboitier " :key="index"  :label="boitier.nom_boitier  " :value="boitier.boitier_image_url"></option>
                </select>
            </div>
            <div>
                <label for="pierre">Choisisez l'image de votre cadran</label>
                <select name="pierre" v-model="nouveauMontre.id_pierres" id="">
                    <option v-for="(pierre,index) in getPierre " :key="index" :label=pierre.nom_pierres  :value="pierre.nom_pierres"></option>
                </select>
            </div>
            <div>
                <label for="bracelet">Choisisez l'image de votre cadran</label>
                <select name="bracelet" v-model="nouveauMontre.id_bracelet" id="">
                    <option v-for="(bracelet,index) in getBracelets " :key="index" :label=bracelet.nom_bracelet  :value="bracelet.bracelet_image_url"></option>
                </select>
            </div>
            <div>
                <label for="typeBoitier">Choisisez l'image de votre cadran</label>
                <select name="typeBoitier" id="typeBoitier" v-model="nouveauMontre.Boitiers_Form">
                    <option value="rond" selected>Rond</option>
                    <option value="carré">Carré</option>
                </select>
            </div>
            <button type="submit">Ajouter au Panier</button>
        </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.Layout {
  display: flex;
  height: 100%;
  
  &__Canvas {
    flex: 2; /* 75% */
    background: $black;
    border-right: 3px solid $white;
  }

  &__Config {
    flex: 1; /* 25% */
    background: $secondary-color;
    color: $white;
    font-family: $primary-font-familly;
    &__Title {
      font-size: $big-font-size;
      font-weight: 700;
      text-align: center;
      padding: 1rem;
    }

    &__Text {
      font-size: $medium-font-size;
      font-weight: 400;
      text-align: center;
      padding: 1rem;
    }
  }
}
form {
  margin-top: 1.5rem;
  padding: rem(16);

  div {
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-size: $medium-font-size;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    select {
      width: 100%;
      padding: rem(10);
      font-size: $medium-font-size;
      border: 1px solid $black;
      background-color: $white;
      border-radius: rem(3);
      transition: border-color 0.3s ease;


      &:focus {
        outline: none;
        border-color: $primary-color;
      }
    }
  }

  button {
    padding: 1rem 2rem;
    font-size: $medium-font-size;
    font-weight: 700;
    background-color: $primary-color;
    color: $white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}
</style>