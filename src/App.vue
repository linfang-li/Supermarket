<template>
  <keep-alive>
    <div id="app">
      <router-view/>
      <router-view name="footer"/>
    </div>
  </keep-alive>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
