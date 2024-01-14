<script setup>
import { ref, onMounted } from 'vue';
import { instance } from '@/utils/axios';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';


const panier = ref([]);
const userId = ref(localStorage.getItem('userId'));
const sommePrix = ref(0);

onMounted(async () => {
  // Récupérez les données du panier depuis le backend pour l'utilisateur actuel
  try {
    const response = await instance.get(`/Panier/${userId.value}`);
    panier.value = response.data;
    
    // Calculez la somme des Prix_unitaire
    calculerSomme();
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error.message);
  }
});

const calculerSomme = () => {
  sommePrix.value = panier.value.reduce((acc, item) => acc + item.Prix_unitaire, 0);
};
</script>

<template>
  <DefaultLayout>
    <div class="cart">
      <h1 class="cart__title">Mon Panier</h1>
    </div>
    <div v-if="panier.length > 0" class="cart__items">
      <!-- Affichez les montres dans le panier -->
      <div v-for="(item, index) in panier" :key="index" class="cart-item">
        <p class="cart-item__info">{{ item.id_Montre }} - {{ item.Prix_unitaire }}</p>
        <!-- Ajoutez d'autres détails du montre si nécessaire -->
      </div>

      <p class="cart__total">Prix total de vos montres : {{ sommePrix }}</p>
    </div>
    <div v-else class="cart__empty">
      <p>Votre panier est vide.</p>
    </div>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
.cart {
  font-family: $primary-font-familly;
  &__title {
    font-size: $big-font-size;
    font-weight: bold;
    margin: 20px;
    text-align: center;
  }

  &__items {
    
    border: 1px solid #ccc;
    padding: rem(20);
    margin-top: rem(25);

    .cart-item {
      border-bottom: 1px solid #eee;
      padding: 10px;

      &__info {
        font-size: $medium-font-size;	
        font-family: $primary-font-familly;
      }
    }
  }
  
      &__total {
        font-family: $primary-font-familly;
        margin-top: rem(20);
        font-size: $medium-font-size;
        font-weight: bold;
        color: #f00;
      }

  &__empty {
    font-size: 18px;
    color: #777;
  }
}
</style>

