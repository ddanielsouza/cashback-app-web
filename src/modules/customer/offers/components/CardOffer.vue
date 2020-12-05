<template>
   <article class="card-offer">
      <span v-if="premium" class="premium" style="height: 22px">PREMIUM</span>
      <span v-else style="height: 22px" />

      <h2>{{ name }}</h2>
      <p>{{ description }}</p>
      <Button type="success" :to="url" target="_blank"> Ir para loja </Button>
   </article>
</template>
<script>
export default {
   props: ['name', 'url', 'premium', 'description'],
};
</script>
<style scoped>
.card-offer {
   background-color: #fff;
   padding: 0.5rem;
   border-radius: 0.5rem;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

   display: flex;
   text-align: center;
   align-content: center;

   flex-direction: column;

   height: 15rem;
}
.card-offer > h2 {
   font-size: 3rem;
   top: 10px;
   text-transform: uppercase;
}

.card-offer > p {
   flex: 1;
}

.premium {
   color: #fff;
   background: #ed4014;
   position: relative;
   max-width: 8rem;
   border-radius: 0.2rem;
   padding: 0 0.5rem;

   margin: 0 0 0 auto;
   top: -1rem;
}

.premium:hover {
   opacity: 0.9;
}
</style>
