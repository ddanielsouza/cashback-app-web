<template>
   <div style="background:#F9F7FC; min-height: 100vh">
      <Header style="width: 100%">
         <Breadcrumb>
            <BreadcrumbItem to="/">Ofertas</BreadcrumbItem>
         </Breadcrumb>
      </Header>
      <div class="greem-box">
         <p>
            O que você está esperando? Comece a usar e ganhe dinheiro em suas compras
            online.
         </p>

         <Icon type="ios-pricetags-outline" />
      </div>

      <section>
         <h1>Ofertas de descontos</h1>
         <p>
            Oferecemos as melhores opções e ofertas para todos os estados do Brasil.
            Aproveite as datas comemorativas, para economizar ainda mais nas suas
            compras!
         </p>
         <br />
         <row :gutter="16">
            <i-col :sm="12" v-for="offer in offers" :key="offer.id">
               <CardOffer
                  :name="offer.advertiser_name"
                  :url="offer.url"
                  :premium="offer.premium"
                  :description="offer.description"
               />
               <br />
            </i-col>
         </row>

         <div class="pages">
            <p>&nbsp;</p>
            <Page :total="total" :current="current" @on-change="changePage" />
         </div>
      </section>
   </div>
</template>

<script>
import api from '../../../../shared/providers/api';
import CardOffer from '../components/CardOffer';
import Header from '../../../../shared/components/Header';

export default {
   components: {
      CardOffer,
      Header,
   },
   data() {
      return {
         offers: [],
         total: 0,
         current: 0,
      };
   },
   watch: {
      async current(newValue) {
         const { data: paginate } = await api.get('/offers/enable', {
            params: { limit: 10, page: newValue },
         });

         this.offers = paginate.offers;
         this.total = paginate.total;
      },
   },
   methods: {
      changePage(page) {
         this.current = page;
      },
   },
   async created() {
      this.current = 1;
   },
};
</script>

<style scoped>
.greem-box {
   background: linear-gradient(to right, #19be6b, #9cdfbf);
   height: 20rem;
   border-bottom: 1px solid rgba(0, 0, 0, 0.12);
   padding-top: 50px;
   padding-left: 50px;
   font-size: 200%;
   font-weight: 600;
   color: #fff;
}
.greem-box > p {
   max-width: 500px;
}

section {
   max-width: 1000px;
   background: #fafafa;
   padding: 1rem;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

   margin: 0 auto;
   position: relative;
   top: -3rem;
}

.pages {
   display: flex;
   justify-content: space-between;
   align-items: center;
}
</style>
