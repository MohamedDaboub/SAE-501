<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { instance } from "@/utils/axios";
import Swal from 'sweetalert2';

const Nom_Utilisateur = ref('');
const Email_utilisateur = ref('');
const password = ref('');
const router = useRouter();

const addUser = async () => {
  try {
    const response = await instance.post(`/Utilisateurs/add`, {
      Nom_Utilisateur: Nom_Utilisateur.value,
      Email_utilisateur: Email_utilisateur.value,
      password: password.value,
    });
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'You have successfully created your account.',
      confirmButtonText: 'Continue to Login',
    }).then(() => {
      router.push('/login');
    });

  } catch (error) {
    console.error('Error adding user:', error.response.data.error);
  }
};
</script>

<template>
  <div class="page">
  <div class="registration-form">
    <h2 class="registration-form__title">Ajoute un Utilisateur</h2>
    <form @submit.prevent="addUser" class="registration-form__form">
      <label for="Nom_Utilisateur" class="registration-form__label">Nom Utilisateur:</label>
      <input type="text" v-model="Nom_Utilisateur" required class="registration-form__input" />

      <label for="Email_utilisateur" class="registration-form__label">Email Utilisateur:</label>
      <input type="email" v-model="Email_utilisateur" required class="registration-form__input" />

      <label for="password" class="registration-form__label">Password:</label>
      <input type="password" v-model="password" required class="registration-form__input" />
      <button type="submit" class="registration-form__button">Add User</button>
    </form>
    <p class="registration-form__login">Déjà inscrit ? <router-link class="registration-form__login-btn" to="/login" > Se connecter</router-link></p>
  </div>
</div>
</template>


<style lang="scss" scoped>
.page{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: $primary-color;
}
.registration-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  background: $secondary-color;
  color: $white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: $primary-font-familly;

  &__login{
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

