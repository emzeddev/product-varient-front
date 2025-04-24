<script setup>
import Main from './components/Main/index.vue'
import Sidebar from './components/Sidebar/index.vue'
</script>

<template>
<div class="add-product p-6 grid grid-cols-12 gap-4">
  <div class="lg:col-span-9 col-span-full">
      <Main/>
  </div>
  <div class="lg:col-span-3 col-span-full">
      <Sidebar/>
  </div>
</div>

</template>
