<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
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
<DefaultLayout>
    <div>
      <h2>Add User</h2>
      <form @submit.prevent="addUser">
        <label for="Nom_Utilisateur">Nom Utilisateur:</label>
        <input type="text" v-model="Nom_Utilisateur" required />

        <label for="Email_utilisateur">Email Utilisateur:</label>
        <input type="email" v-model="Email_utilisateur" required />

        <label for="password">Password:</label>
        <input type="password" v-model="password" required />

        <button type="submit">Add User</button>
      </form>
    </div>
  </DefaultLayout>
</template>

<style lang="scss" scoped>

</style>