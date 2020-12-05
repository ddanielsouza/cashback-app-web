<template>
   <div>
      <Header>
         <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem>Ofertas</BreadcrumbItem>
         </Breadcrumb>
      </Header>
      <div class="grey-box"></div>
      <div class="content-page-list-offers">
         <h1>Ofertas</h1>
         <Divider />
         <br />
         <row>
            <i-col :sm="6">
               <Button to="/offers/create" type="success">
                  <Icon type="md-add" />
                  Nova oferta
               </Button>
            </i-col>
         </row>

         <br />

         <Table border :loading="loading" :columns="columns" :data="offersFormatted">
            <template slot-scope="{ row }" slot="action">
               <ButtonGroup size="small">
                  <Button type="warning" @click="$router.push(`/offers/${row.id}`)">
                     Editar
                  </Button>

                  <Button
                     type="success"
                     @click="() => handleEnable(row)"
                     v-if="row.calcDisable"
                     :disabled="!row.disable"
                  >
                     Habilitar
                  </Button>
                  <Button type="info" @click="() => handleDisable(row)" v-else>
                     Desabilitar
                  </Button>

                  <Button type="error" @click="() => handleRemove(row)"
                     >Remover</Button
                  >
               </ButtonGroup>
            </template>
         </Table>
      </div>
   </div>
</template>

<script>
import Header from '../../../../shared/components/Header';
import api from '../../../../shared/providers/api';
export default {
   components: {
      Header,
   },
   data() {
      return {
         loading: false,
         offers: [],
         columns: [
            {
               title: 'Id',
               key: 'id',
            },
            {
               title: 'Nome ',
               key: 'advertiser_name',
            },
            {
               title: 'Status',
               key: 'status',
            },
            {
               title: ' ',
               slot: 'action',
               width: 250,
               align: 'center',
            },
         ],
      };
   },
   computed: {
      offersFormatted() {
         return this.offers.map(offer => {
            return {
               ...offer,
               status: offer.calDisable ? 'Desabilitado' : 'Habilitado',
            };
         });
      },
   },
   methods: {
      async handleDisable(row) {
         this.loading = true;
         try {
            const { data: offer } = await api.patch(`/offers/disable/${row.id}`);

            const offerIndex = this.offers.findIndex(
               foundOffer => foundOffer.id === offer.id,
            );

            const newOffers = [...this.offers];

            newOffers[offerIndex] = offer;

            this.offers = newOffers;
         } catch (e) {
            this.$Notice.error({
               title: 'Oferta',
               desc: 'Error ao atualizar oferta',
            });
         } finally {
            this.loading = false;
         }
      },
      async handleRemove(row) {
         this.loading = true;

         try {
            await api.delete(`/offers/${row.id}`);

            const offerIndex = this.offers.findIndex(
               foundOffer => foundOffer.id === row.id,
            );

            const newOffers = [...this.offers];

            newOffers.splice(offerIndex, 1);

            this.offers = newOffers;
         } catch (e) {
            this.$Notice.error({
               title: 'Oferta',
               desc: 'Error ao remover oferta',
            });
         } finally {
            this.loading = false;
         }
      },

      async handleEnable(row) {
         this.loading = true;
         try {
            const { data: offer } = await api.patch(`/offers/enable/${row.id}`);

            const offerIndex = this.offers.findIndex(
               foundOffer => foundOffer.id === offer.id,
            );

            const newOffers = [...this.offers];

            newOffers[offerIndex] = offer;

            this.offers = newOffers;
         } catch (e) {
            this.$Notice.error({
               title: 'Oferta',
               desc: 'Error ao atualizar oferta',
            });
         } finally {
            this.loading = false;
         }
      },
   },
   async created() {
      this.loading = true;
      try {
         const { data: offers } = await api.get('offers');
         this.offers = offers || [];
      } catch (e) {
         this.$Notice.error({
            title: 'Oferta',
            desc: 'Error ao buscar ofertas',
         });
      } finally {
         this.loading = false;
      }
   },
};
</script>

<style scoped>
.grey-box {
   background-color: #fafafa;
   height: 10rem;
   border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.content-page-list-offers {
   max-width: 900px;
   margin: 0 auto;
   background: #fff;
   border-radius: 0.5rem;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
   position: relative;
   top: -3rem;
   padding: 1rem;
}
</style>
