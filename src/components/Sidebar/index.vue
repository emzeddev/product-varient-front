<template>
  <div class="space-y-4 font-fa">
    <Publish v-if="!route.params.id"  />
    <PublishUpdate v-else />
    <mainCategory />
    <SubCategories />
    <Brand />
    <AdditionalSpecifications />
    <Tags />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Publish from "./elements/Publish.vue";
import PublishUpdate from "./elements/PublishUpdate.vue";
import mainCategory from "./elements/mainCategory.vue";
import SubCategories from "./elements/SubCategories.vue";
import Brand from "./elements/Brand.vue";
import AdditionalSpecifications from "./elements/AdditionalSpecifications.vue";
import Tags from "./elements/Tags.vue";

const route = useRoute()
</script>
