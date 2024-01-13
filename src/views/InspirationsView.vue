<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import MyCard from '@/components/elements/MyCard.vue'
import { instance } from '@/utils/axios'
import {getboitiers,getPierres,getbracelet } from "@/utils/Donne.js";
import { ref, onMounted,watchEffect  } from "vue";

const budgetMin = ref(0);
const budgetMax = ref(300);
const montres = ref([]);
const currentPage = ref(1);
const cardsPerPage = 6;
const filteredMontres = ref();

const getboitier = ref();
const getPierre = ref();
const getBracelets = ref();
const getMontres = async () => {
  const userId = 4; 
  const response = await instance.get(`/Montres/Utilisateurs/${userId}`);
  return response.data;
}
const getCardRange = () => {
  const startIndex = (currentPage.value - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  return { startIndex, endIndex };
};
const getBraceletTexture = (idBracelet) => {
  switch (idBracelet) {
    case 'texture-tissus-or.jpg':
      return 'Tissus or';
    case 'texture-tissus-marron.jpg':
      return 'Tissus marron';
    case 'texture-cuir-blanc.jpg':
      return 'Cuir blanc';
    default:
      return 'Texture inconnue';
  }
};
const getBoitierName = (idBoitier) => {
  switch (idBoitier) {
    case 'background_fluo01.png':
      return 'FLUO';
    case 'background_black01.png':
      return 'black01';
    case 'background_black02.png':
      return 'black02';
    case 'background_mickey.png':
      return 'mickey';
    case 'background_white01.png':
      return 'white';
    case 'background_white02.png':
      return 'white02';
    case 'background_white03.png':
      return 'white03';
    case 'background_white04.png':
      return 'white04';
    case 'background_white05.png':
      return 'white05';
    default:
      return 'Boîtier inconnu';
  }
};
const getBoitierFormName = (boitierForm) => {
  switch (boitierForm) {
    case 'rond':
      return 'Round';
    case 'carré':
      return 'Carré';
    default:
      return 'Forme inconnue';
  }
};
const applyFilters = () => {
  return montres.value.filter((montre) => {
    const withinBudget = montre.Prix_unitaire >= budgetMin.value && montre.Prix_unitaire <= budgetMax.value;
    return withinBudget;
  });
};
const updateFilteredMontres = () => {
  filteredMontres.value = applyFilters();
};
onMounted(async () => {
  montres.value = await getMontres();
  getboitier.value = await getboitiers();
  getPierre.value = await getPierres();
  getBracelets.value = await getbracelet();
  updateFilteredMontres();
});
watchEffect(() => {
  updateFilteredMontres();
});
</script>

<template>
  <DefaultLayout>
    <div class="">
      <div class="C-inspiration">      
        <h1 class="C-inspiration__titre">Liste des Montres</h1>
        <p class="C-inspiration__texte">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, ullam excepturi! Neque iure earum recusandae quae repellendus iste quod et soluta, hic, eaque eveniet natus ipsa tempora vero ex praesentium.</p>
      </div>
      <div class="C-inspiration">
        <h2 class="C-inspiration__titreFilter">Filtres</h2>
        <div class="C-inspiration__titreFilter__Min">
          <label class="C-inspiration__titreFilter__Min__label" >Budget min:</label>
          <input class="C-inspiration__titreFilter__Min__input" type="number" v-model="budgetMin" />
        </div>
        <div class="C-inspiration__titreFilter__Max">
          <label class="C-inspiration__titreFilter__Max__label">Budget max:</label>
          <input class="C-inspiration__titreFilter__Max__input" type="number" v-model="budgetMax" />
        </div>
      </div>
      <div class="C-inspiration__card">
        <div v-for="montre in filteredMontres && filteredMontres.length ? filteredMontres.slice(getCardRange().startIndex, getCardRange().endIndex) : []" :key="montre.id_montre" class="C-inspiration__card__plus">
        <MyCard :boitier_image_url="montre.id_boitier" :bracelet_image_url="montre.id_bracelet" :Boitiers_Form="montre.Boitiers_Form" />
        <div class="C-inspiration__card__des">
          <p class="C-inspiration__card__des__texte">{{ getBraceletTexture(montre.id_bracelet) }}</p>
          <p class="C-inspiration__card__des__texte">{{ getBoitierName(montre.id_boitier) }}</p>
          <p class="C-inspiration__card__des__texte">{{ montre.id_pierres }}</p>
          <p class="C-inspiration__card__des__texte">{{ getBoitierFormName(montre.Boitiers_Form) }}</p>
        </div>
        <div>
          <p class="Prix">{{ montre.Prix_unitaire }}<span>€</span></p>
        </div>
      </div>
    </div>
      <div class="C-inspiration">
        <div class="C-inspiration__pag">
          <button @click="currentPage -= 1" :disabled="currentPage === 1" class="C-inspiration__pag__Precedent">Précédent</button>
          <span class="C-inspiration__pag__currentPage">{{ currentPage }}</span>
          <button class="C-inspiration__pag__Suivant" @click="currentPage += 1" :disabled="!montres || getCardRange().endIndex >= montres.length">Suivant</button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>



<style lang="scss" scoped>
.C-inspiration{
  margin: rem(30) auto;
  font-family: $primary-font-familly;
  &__titre{
    font-size:$bigger-font-size;
    font-weight: 700;
    text-align: center;
    margin-bottom: rem(30);
  }
  &__titreFilter{
    font-size:$big-font-size;
    font-weight: 700;
    text-align: start;
    margin: rem(30);
    &__Min {
      margin: rem(30);
      display: flex;
      gap: rem(20);
      &__label {
      display: block;
      font-size: 1.2em;
      margin-bottom: 5px;
    }
    &__input {
    padding: 5px;
    width: 100px;
  }

    }
    &__Max {
      margin: rem(30);
      display: flex;
      gap: rem(20);
      &__label {
        display: block;
        font-size: 1.2em;
        margin-bottom: 5px; 
      }
      &__input {
      padding: 5px;
      width: 100px; 
    }
    }
  }
  &__texte{
    font-size:$medium-font-size;
    margin: rem(30);

  }
  &__card{

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: rem(30);

    justify-content: center;
    margin: rem(30) rem(100);
  &__des{

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: rem(30);
    margin: rem(30);
    &__texte{
      font-size:$medium-font-size;
      font-weight: 700;
      text-align: center;
      font-family: $primary-font-familly;
    }
    &__Prix{
      font-size:$medium-font-size;
      font-weight: 700;
      text-align: center;
      font-family: $primary-font-familly;
      color: #FF0000;
    }
  }
    
    &__plus{
      border: 1px solid $primary-color;
      border-radius: 10px;
      transition: all 0.3s ease-in-out;
      &:hover{
        transform: scale(1.1);
      }
    }
  }
  &__pag{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: rem(30);
    &__Precedent,
  &__Suivant {
   padding: 8px 16px;
   font-size: 16px;
   cursor: pointer;
   background-color: $primary-color; 
   color: #ffffff;
   border: none;
   border-radius: 4px;
   &:disabled {
     background-color: #bdc3c7;
     color: #7f8c8d; 
     cursor: not-allowed;
   }
  }
  &__currentPage {
    font-size: 18px;
    margin: rem(20);
    font-weight: bold;
    color: #2c3e50;
  }
  }

}
.Prix{
  font-size:$medium-font-size;
  font-weight: 700;
  text-align: end;
  margin: rem(30);
  font-family: $primary-font-familly;
  color: #FF0000;
}

</style>