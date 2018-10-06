<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="../assets/logo.png">
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Component({
    components: {
        HelloWorld
    }
})
export default class Home extends Vue {}
</script>
