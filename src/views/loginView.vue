<script setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

</script>


<template>
    <DefaultLayout>
        <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input v-model="username" type="text" required />

      <label for="password">Password:</label>
      <input v-model="password" type="password" required />

      <button type="submit">Login</button>
    </form>

    <div v-if="isAuthenticated">
      <p>Welcome, {{ user.username }}!</p>
      <router-link to="/logout">Logout</router-link>
    </div>
  </div>
    </DefaultLayout>
</template>

<style lang="scss" scoped>


</style>