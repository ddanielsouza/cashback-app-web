<template>
   <div class="header">
      <div class="top-header">
         <span> <slot></slot> </span>
         <div>
            <Icon
               type="ios-contact"
               class="button-user"
               v-click-outside="() => (showBoxUser = false)"
               @click="showBoxUser = !showBoxUser"
            />

            <div v-if="showBoxUser" class="box-info-user">
               <Fragment v-if="user">
                  <p>{{ user.name }}</p>
                  <p>{{ user.email }}</p>

                  <hr style="width: 105%" />

                  <Button style="margin-top: 8px" @click="signOut">
                     Sair <Icon type="ios-exit-outline" />
                  </Button>
               </Fragment>

               <Fragment v-else>
                  <Button style="margin-top: 8px" to="/login">
                     Entrar <Icon type="ios-exit-outline" />
                  </Button>
               </Fragment>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import Fragment from '../utils/Fragment';

export default {
   components: {
      Fragment,
   },
   data() {
      return {
         showBoxUser: false,
      };
   },
   computed: {
      user() {
         return this.$auth.user();
      },
   },
   methods: {
      signOut() {
         this.$auth.logout({
            redirect: '/',
         });
      },
   },
   directives: {
      ClickOutside,
   },
};
</script>

<style>
.header {
   position: absolute;

   top: 0;
   left: 0;
   width: 100vw;

   display: flex;
   justify-items: center;
   align-items: center;

   flex-direction: column;
}

.top-header {
   padding: 0.2rem 0.4rem;
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   background: #fff;
   border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.top-header .button-user {
   padding: 0;
   cursor: pointer;
   font-size: 2rem;
   opacity: 0.8;
}

.top-header .button-user:hover {
   opacity: 1;
}

.box-info-user {
   z-index: 500;
   position: absolute;
   top: 2.2rem;
   right: 1rem;
   padding: 1rem;
   background: #fff;
   display: flex;
   align-items: center;
   justify-items: center;
   flex-direction: column;

   border: 1px solid rgba(0, 0, 0, 0.2);
   border-radius: 8px;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
