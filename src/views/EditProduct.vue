<template>
<div class="add-product p-6 grid grid-cols-12 gap-4" v-if="product != null">
  <div class="lg:col-span-9 col-span-full">
      <Main/>
  </div>
  <div class="lg:col-span-3 col-span-full">
      <Sidebar/>
  </div>
</div>
<div class="add-product p-6 grid grid-cols-12 gap-4" v-else>
  <p>محصول مورد نظر یافت نشد! خطایی رخ داد</p>
</div>

</template>

<script setup>
import Main from '@/components/Main/index.vue'
import Sidebar from '@/components/Sidebar/index.vue'
import {useRoute} from 'vue-router'
import {onMounted , ref} from 'vue'
import store from '@/store/index.js'

const route = useRoute()
const product = ref(null)


onMounted(() => {
    if(route.params.id) {
        getProductById({id: route.params.id})
    }
})

const getProductById = async (id) => {
    const result = await store.dispatch("getProductById" , {id: route.params.id})
    .then(res => {
        product.value = res.product
    }).catch(err => {
        console.log(err.message);
    }) 
}
</script>