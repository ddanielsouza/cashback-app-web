<template>
   <div class="login-page">
      <div class="presentation">
         <h2>Aproveite descontos em lojas online</h2>
         <h3>Com apenas um clique, simples e facil</h3>
      </div>
      <Form
         ref="form"
         :model="user"
         :rules="rules"
         class="form-login"
         @submit="singIn"
         enter-submit
      >
         <h1>Login</h1>
         <FormItem prop="email">
            <i-input
               type="email"
               v-model="user.email"
               placeholder="E-mail"
               @on-enter="singIn"
            />
         </FormItem>

         <FormItem prop="password">
            <i-input
               type="password"
               v-model="user.password"
               placeholder="Senha"
               @on-enter="singIn"
            />
         </FormItem>

         <FormItem>
            <Button
               type="primary"
               style="width: 100%"
               shape="circle"
               @click="singIn"
            >
               Entrar
            </Button>
         </FormItem>
      </Form>
   </div>
</template>

<script>
export default {
   data() {
      return {
         user: {},
         rules: {
            email: [
               { required: true, message: 'E-mail é obrigatório' },
               { type: 'email', message: 'E-mail incorreto' },
            ],
            password: [{ required: true, message: 'Senha é obrigatório' }],
         },
      };
   },

   methods: {
      singIn() {
         const { email, password } = this.user;

         this.$refs.form.validate(valid => {
            if (valid) {
               this.$auth.login({
                  data: { email, password },
                  redirect: '/offers',
                  fetchUser: true,
               });
            }
         });
      },
   },
};
</script>

<style scoped>
.login-page {
   width: 100vw;
   min-height: 100vh;

   display: flex;
   justify-content: center;
   align-items: center;
}

.presentation {
   flex: 1;
   height: 100vh;

   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   text-align: center;
}

.presentation h2 {
   font-size: 3rem;
}

.form-login {
   background: #fff;
   width: 100%;
   max-width: 30rem;
   padding: 1rem;
}

@media screen and (max-width: 35rem) {
   .login-page {
      flex-direction: column-reverse;
      padding-top: 3rem;
   }
}
</style>
