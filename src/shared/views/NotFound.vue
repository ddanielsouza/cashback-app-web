<template>
   <div class="not-found-page">
      <h1>404: Página não encontrada</h1>
      <h2>Parece que o endereço me que você entrou não está disponível</h2>
   </div>
</template>

<script>
export default {
   data() {
      return {};
   },
};
</script>

<style scoped>
.not-found-page {
   width: 100vw;
   height: 100vh;

   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;

   text-align: center;
}

h1 {
   font-size: 4rem;
}
</style>
