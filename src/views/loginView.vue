<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';



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
    localStorage.setItem('userId', userId.value);
    const router = useRouter();
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
    <div>
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <label for="Email_utilisateur">Email:</label>
        <input v-model="loginData.Email_utilisateur" type="email" required>

        <label for="password">Mot de passe:</label>
        <input v-model="loginData.password" type="password" required>

        <button type="submit">Se connecter</button>
      </form>
    </div>
    <p v-if="userId">Hello {{ userName.value }}! <button @click="logout">Se déconnecter</button></p>
    <p v-else>Veuillez vous connecter.</p>
  </template>
