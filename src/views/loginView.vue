<!-- <script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { instance } from "@/utils/axios";

const Email_utilisateur = ref('');
const password = ref('');
const router = useRouter();

</script>


<template>
    <DefaultLayout>
        <div>
    <h2>Login</h2>
    <form >
      <label for="Email_utilisateur">Email utilisateur:</label>
      <input v-model="Email_utilisateur" type="text" required />

      <label for="password">Password:</label>
      <input v-model="password" type="password" required />

      <button type="submit">Login</button>
    </form>

    <div>
      <p>Welcome, {{ user.username }}!</p>
      <router-link to="/logout">Logout</router-link>
    </div>
  </div>
    </DefaultLayout>
</template>

<style lang="scss" scoped>


</style> -->