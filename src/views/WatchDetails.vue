<template>
    <div>
      <!-- Your watch details rendering goes here -->
      <p>{{ id }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const id = ref(null);
  
  // Access the route object to get the "id" parameter
  const route = useRoute();
  
  // On component mount, set the "id" value from the route params
  onMounted(() => {
    id.value = route.params.id;
  });
  
  // ... rest of the setup code ...
  </script>
  