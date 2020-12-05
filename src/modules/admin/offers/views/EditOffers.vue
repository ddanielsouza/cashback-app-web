<template>
   <div>
      <Header>
         <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/offers">Ofertas</BreadcrumbItem>
            <BreadcrumbItem>Editar Oferta</BreadcrumbItem>
         </Breadcrumb>
      </Header>
      <div class="grey-box"></div>

      <FormOffer
         class="form-new-offer"
         v-model="offer"
         @submit="save"
         :loading="loading"
      >
         <template slot="header">
            Editar oferta
         </template>
      </FormOffer>
   </div>
</template>

<script>
import Header from '../../../../shared/components/Header';
import FormOffer from '../components/FormOffer';
import api from '../../../../shared/providers/api';

export default {
   components: {
      Header,
      FormOffer,
   },

   data() {
      return {
         loading: false,
         offer: {},
      };
   },
   methods: {
      async save() {
         this.loading = true;
         try {
            await api.put(`/offers/${this.offer.id}`, this.offer);
            this.$Notice.success({
               title: 'Oferta',
               desc: 'Atualizado com sucesso',
            });

            this.$router.push('/offers');
         } catch (e) {
            if (e.response && e.response.status && e.response.status === 409) {
               this.$Notice.warning({
                  title: 'Oferta',
                  desc: 'Anunciante já está em uso',
               });
            } else {
               this.$Notice.error({
                  title: 'Oferta',
                  desc:
                     'Error na atualização da nova oferta, verifique os dados ou tente novamente mais tarde',
               });
            }
         } finally {
            this.loading = false;
         }
      },
   },

   async created() {
      const { id } = this.$route.params;

      const {
         data: { ends_at, starts_at, ...rest },
      } = await api.get(`/offers/${id}`);

      this.offer = {
         ...rest,
         ends_at: ends_at ? new Date(ends_at) : undefined,
         starts_at: starts_at ? new Date(starts_at) : undefined,
      };
   },
};
</script>

<style scoped>
.grey-box {
   background-color: #fafafa;
   height: 10rem;
   border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.form-new-offer {
   position: relative;
   top: -2rem;
   max-width: 800px;
   margin: 0 auto;
   padding: 1rem;
   border: 1px solid rgba(0, 0, 0, 0.2);
   border-radius: 8px;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
   background: #fff;
}
</style>
