<script setup>
import { ref, onMounted } from "vue";
import {instance } from "@/utils/axios";
import {getboitiers} from "@/utils/Donne.js";
import CanvasLayout from '@/components/layout/CanvaLayout.vue'
const getboitier = ref();

const nouveauMontre = ref(({
    Nom_Montre:"",
    id_boitier:"",
    id_pierres:"",
    id_bracelet:"",
}))
const getMontres = async () => {
  const reponse = await instance.get("/Montres");
  return reponse.data;
};
console.log(getMontres());
const montres = ref();
onMounted(async () => {
  montres.value = await getMontres();
  console.log(montres.value);
  getboitier.value = await getboitiers();
});


</script>

<template>
    <section class="Layout__Aside">    
    <h2 class="Layout__Aside__Titre">Configurez votre montre</h2>
    <p  class="Layout__Aside__Texte">Vous avec les choise de Configure votre montre comme vous le suite avec les choiuse suivant  </p>
    <div>
        <div>
            <h3>Cadren</h3>
            <p>Choisisez l'image de votre Cadren</p>
            <form action="">
                <select name="boit" required multiple v-model="nouveauMontre.id_boitier"   >
                    <option v-for="(boitier,index) in getboitier " :key="index"  :label=boitier.nom_boitier value=""></option>
                </select>
                <select multiple>
                    <option value="">uobgihyj n</option>
                    <option value="">uobgihyj n</option>
                    <option value="">uobgihyj n</option>
                </select>
                <p v-for="(boitier,index) in getboitier " :key="index">{{ boitier }}</p>
            </form>
        </div>
    </div>
        <div>
            <button>
                <router-link to="/about">Commencer</router-link>
            </button>
        </div>
        <CanvasLayout  :boitier_rond="nouveauMontre.id_boitier" :boitier_image_url="nouveauMontre.id_boitier"/>
    </section>
</template>

<style lang="scss" scoped>
.Layout__Aside{
    background: $black;
    height: 100%;
    color: $white;
    border-left: 3px solid $white; 
    font-family: $primary-font-familly; 

    &__Titre{
        font-size: $big-font-size;
        font-weight: 700;
        text-align: center;
        padding: 1rem;
    }
    &__Texte{
        font-size: $medium-font-size;
        font-weight: 400;
        text-align: center;
        padding: 1rem;
    }
}
</style>