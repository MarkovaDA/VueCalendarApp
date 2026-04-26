<script setup>
import WelcomeItem from './WelcomeItem.vue'
import Calendar from './Calendar.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

</script>

<template>
  <WelcomeItem>
    <template #icon>
      <Calendar />
    </template>
  </WelcomeItem>
</template>
