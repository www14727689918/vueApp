<template>
  <div class="hello">
    <h2>{{count}}</h2>
  </div>
</template>

<script>
  import {mapGetters, mapActions}from 'vuex'
  export default {
    methods: mapActions([
      'add',
      'add1'
    ]),
    computed: mapGetters([
      'count'
    ])
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
