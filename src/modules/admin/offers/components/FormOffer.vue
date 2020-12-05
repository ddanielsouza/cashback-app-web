<template>
   <Form ref="form" :model="offer" :rules="rules">
      <h1><slot name="header">Nova oferta</slot></h1>
      <br />
      <FormItem prop="advertiser_name" label="Nome do anunciante">
         <i-input
            type="text"
            v-model="offer.advertiser_name"
            placeholder="Nome"
            @on-enter="submit"
         />
      </FormItem>

      <FormItem prop="url" label="URL">
         <i-input
            type="text"
            v-model="offer.url"
            placeholder="URL"
            @on-enter="submit"
         />
      </FormItem>

      <FormItem prop="description" label="Descrição">
         <p class="length-description">
            {{ offer && offer.description ? offer.description.length : 0 }} / 500
         </p>
         <i-input
            type="textarea"
            maxlength="500"
            v-model="offer.description"
            placeholder="Descricao"
            @on-enter="submit"
         />
      </FormItem>

      <FormItem prop="starts_at" label="Data de início">
         <DatePicker
            type="date"
            style="width: 100%"
            v-model="offer.starts_at"
            placeholder="Data de início"
            format="dd/MM/yyyy"
            @on-enter="submit"
         />
      </FormItem>

      <FormItem prop="ends_at" label="Data de término">
         <DatePicker
            type="date"
            style="width: 100%"
            v-model="offer.ends_at"
            placeholder="Data de término"
            format="dd/MM/yyyy"
            @on-enter="submit"
         />
      </FormItem>

      <FormItem prop="premium">
         <Checkbox v-model="offer.premium">Premium</Checkbox>
      </FormItem>

      <row>
         <i-col :sm="18">
            <br />
         </i-col>
         <i-col :sm="6">
            <Button
               style="width: 100%"
               type="success"
               @click="submit"
               :loading="loading"
            >
               Salvar
            </Button>
         </i-col>
      </row>
   </Form>
</template>

<script>
export default {
   props: { value: { required: true }, loading: { default: false } },
   data() {
      const validateURL = (rule, value, callback) => {
         const pattern = new RegExp(
            '^(https?:\\/\\/)?' +
               '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
               '((\\d{1,3}\\.){3}\\d{1,3}))' +
               '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
               '(\\?[;&a-z\\d%_.~+=-]*)?' +
               '(\\#[-a-z\\d_]*)?$',
            'i',
         );

         if (value === '') {
            callback(new Error('URL é obrigatório'));
         } else if (!pattern.test(value.trim())) {
            callback(new Error('URL inválida'));
         } else {
            callback();
         }
      };

      const validateStartAndEndDate = (_rule, value, callback) => {
         if (
            this.offer &&
            this.offer.ends_at &&
            this.offer.starts_at &&
            this.offer.ends_at instanceof Date &&
            this.offer.starts_at instanceof Date
         ) {
            if (this.offer.ends_at.getTime() <= this.offer.starts_at.getTime()) {
               return callback(
                  new Error('Data de término não pode ser menor que a de início'),
               );
            }
         }

         return callback();
      };

      return {
         offer: {},
         rules: {
            advertiser_name: [
               { required: true, message: 'Nome do anunciante é obrigatório' },
            ],
            url: [
               { required: true, message: 'URL é obrigatório' },
               { validator: validateURL, trigger: 'blur' },
            ],
            description: [{ required: true, message: 'Descrição é obrigatório' }],
            starts_at: [{ required: true, message: 'Data de início é obrigatório' }],
            ends_at: [{ validator: validateStartAndEndDate, trigger: 'blur' }],
         },
      };
   },
   watch: {
      offer(newValue) {
         this.$emit('input', newValue);
         this.$emit('change', newValue);
      },
      value(newValue) {
         this.offer = newValue;
      },
   },
   methods: {
      submit() {
         if (this.loading) {
            return;
         }

         this.$refs.form.validate(valid => {
            if (valid) {
               this.$emit('submit');
            }
         });
      },
   },
   created() {
      this.offer = this.value || {};
   },
};
</script>

<style scoped>
.length-description {
   text-align: right;
   position: relative;
   bottom: -3px;
   margin-right: 2px;
}
</style>
