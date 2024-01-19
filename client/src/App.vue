<template>
  <div>
 <component :is="$route.meta.layout">
   <router-view></router-view>
 </component>
  </div>
 </template>
 
 <script>
 
 export default {
   name: 'App',
   components: {
 
   }
 }
 </script>
 
 <style>
 body {
     font-family: var(--font-family);
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
 }
 </style>
 