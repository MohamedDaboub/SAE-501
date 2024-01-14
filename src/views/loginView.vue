<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
// Client axios global
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Stocke l'id de l'utilisateur connecté
const userId = ref(localStorage.getItem('userId') || null);
const userToken = ref(localStorage.getItem('userToken') || null);

// Informations de connexion
const loginData = ref({
  Email_utilisateur: '',
  password: '',
});
const userName = ref('');
// Fonction de connexion
const login = async () => {
  try {
    // Effectue la requête de connexion pour obtenir le token et userId
    const response = await client.post('/Utilisateurs/login', loginData.value);
    userId.value = response.data.id_Utilisateur;
    userToken.value = response.data.token;
    localStorage.setItem('userId', userId.value);
    localStorage.setItem('userToken', userToken.value);
    router.push('/');
    // Affiche la valeur de userId
    console.log('Identifiant utilisateur:', userId.value);
  } catch (error) {
    console.error('Erreur lors de la connexion :', error.message);
  }
};

// Fonction de déconnexion
const logout = () => {
  // Supprime le token et le localStorage
  userToken.value = null;
  localStorage.removeItem('userToken');

  // Supprime l'identifiant utilisateur et le localStorage
  userId.value = null;
  localStorage.removeItem('userId');

  console.log('Déconnecté avec succès');
};
</script>
<template>
  <div class="login-page">
    <div class="login-form">
      <h2 class="login-form__title">Connexion</h2>
      <form @submit.prevent="login" class="login-form__form">
        <label for="Email_utilisateur" class="login-form__label">Email:</label>
        <input v-model="loginData.Email_utilisateur" type="email" required class="login-form__input">

        <label for="password" class="login-form__label">Mot de passe:</label>
        <input v-model="loginData.password" type="password" required class="login-form__input">
        <button type="submit" class="login-form__button">Se connecter</button>
      </form>
      <p v-if="userId" class="login-form__welcome"><button @click="logout" class="login-form__logout">Se déconnecter</button></p>
      <p v-else class="login-form__prompt">Veuillez vous connecter.</p>
      <p class="login-form__register">Pas encore inscrit ? <router-link class="login-form__register-btn" to="/Inscription">S'inscrire</router-link></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: $primary-color;
}

.login-form {
  max-width: 700px;
  padding: rem(40);
  border: 1px solid #ccc;
  background: $secondary-color;
  color: $white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: $primary-font-familly;

  &__register{
    margin-top: 16px;
    color: $white;
    font-size: $regular-font-size;

    &-btn{
      color: $white;
      font-size: $regular-font-size;
    }
  }

  &__title {
    text-align: center;
    margin: rem(20);
    font-size: $big-font-size;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__label {
    margin-bottom: 8px;
  }

  &__input {
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &__button {
    background-color: $primary-color;
    background: linear-gradient(180deg, $secondary-color 0%, $primary-color 100%);
    border: none;
    border-radius: 4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: $white;
    font-family: $primary-font-familly;
    font-size: $regular-font-size;
    font-weight: 600;
    padding: 16px 32px;
    margin-top: 16px;
    margin-bottom: 16px;
    align-self: center;
  }

}
</style>
