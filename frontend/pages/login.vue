<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HorizontalLine from '@/components/HorizontalLine.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseButton from '@/components/BaseButton.vue'
import SenseChart from '@/components/SenseChart.vue'
import MainSaveButtonDeco from '@/components/MainSaveButtonDeco.vue'
import SaveButtonDecoElement from '@/components/SaveButtonDecoElement.vue'
import Logo from '@/components/Logo.vue'

import isMobile from '@/composables/isMobile.ts'
import percentage from '@/composables/percentage.ts'
import rangeScaler from '@/composables/rangeScaler.ts'
</script>

<script>
export default {
  data() {
    return {
      isErrorLabelDisplayed: false,
      uidIn: '',
      passwordIn: '',
    }
  },
  head() {
    return {
      title: 'Spider Eyes // Login',
    }
  },
  name: 'Login',
  methods: {
    onCreateNewAccountRedirect() {
      window.location.pathname = 'signup'
    },
    onLoginButtonClick() {
      if (this.uidIn.length > 1 && this.passwordIn.length >= 8) {
        this.$axios
          .post('https://spidereyes-api.vercel.app/api/auth?login=0', {
            uid: this.uidIn,
            password: this.passwordIn,
          })
          .then((r) => {
            console.log(r.data)
            if(r.data.status != undefined){
              if(r.data.status){
                sessionStorage.setItem('AT', r.data.AT)
                sessionStorage.setItem('un', r.data.username)
                window.location.pathname = '/'
              }else{
                this.isErrorLabelDisplayed = true;
                this.passwordIn = ''
                setTimeout(() => {
                  this.isErrorLabelDisplayed = false;
                }, 3000);
              }
            }
          })
          .catch((e) => {})
      }
    },
  },
}
</script>

<template>
  <div>
    <div id="deco_container">
      <Logo id="logo"></Logo>
      <HorizontalLine id="login_ln_0" color="#0500FF00"></HorizontalLine>
      <div id="login_deco" class="main_save_btn_deco_container">
        <ul class="save_btn_deco_elm_list">
          <SaveButtonDecoElement
            v-for="x in 480"
            :key="x"
          ></SaveButtonDecoElement>
        </ul>
      </div>
    </div>
    <BaseLabel id="uid_l" class="primary_l" v-text="'Username'" color="#8F34FF"></BaseLabel>
    <input autofocus tabindex="" v-model="uidIn" type="text" spellcheck="false" id="uid_input"></input>
    <BaseLabel id="password_l" class="primary_l" v-text="'Password'" color="#8F34FF"></BaseLabel>
    <input v-model="passwordIn" type="password" spellcheck="false" id="password_input"></input>
    <HorizontalLine id="login_ln_1" color="#0500FF00"></HorizontalLine>
    <Transition name="tini">
      <BaseLabel id="auth_failed_l" class="primary_l" v-if="isErrorLabelDisplayed" v-text="'Auth Failed'" color="#FF003D"></BaseLabel>
    </Transition>
    <BaseButton @onLoginButtonClick="onLoginButtonClick" onClickEventName="onLoginButtonClick" id="login_btn" width="19.479166667%" height="4.259259259%" :label="{text: 'Log In', fontSize: '2.3vh'}"></BaseButton>
    <BaseButton @onCreateNewAccountRedirect="onCreateNewAccountRedirect" onClickEventName="onCreateNewAccountRedirect" :baseColorSet="{text: '#5900C7', bkg: '#20004820', border: '#2A005E'}" :HoverColorSet="{text: '#5900C7', bkg: '#20004860', border: '#2A005E'}" id="create_account_btn" width="19.479166667%" height="4.259259259%" :label="{text: 'Create New Account', fontSize: '2.3vh'}"></BaseButton>
</div>
</template>

<style scoped>
.tini-enter-active,
.tini-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.tini-enter-from,
.tini-leave-to {
  opacity: 0;
}
#auth_failed_l{
  top: 77.314814815%;
  left: 40.364583333%;
  width: 19.479166667%;
  height: 4.259259259%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(255, 0, 61, 0.2) 0%, rgba(255, 0, 61, 0) 100%);
  border-top: solid 1px #FF003D;
}
#uid_l {
  top: 40.37037037%;
}
#password_l {
  top: 49.722222222%;
}
#login_btn {
  top: 62.685185185%;
  left: 40.364583333%;
}
#create_account_btn {
  top: 70%;
  left: 40.364583333%;
}
#uid_input,
#password_input {
  position: absolute;
  background-color: #0b001a00;
  border: solid 1px #4700a3;
  width: 19.479166667%;
  height: 4.259259259%;
  top: 43.425925926%;
  left: 40.364583333%;
  outline: none;
  color: #8f34ff;
  font-size: 2vh;
  transition: all linear 0.07s;
  transition: color linear 0.12s;
}
#uid_input:hover,
#password_input:hover {
  background-color: #4700a340;
}
#uid_input:focus,
#password_input:focus {
  color: #bf8aff;
}
#uid_input::selection,
#password_input::selection {
  background-color: #88888840;
}
#password_input {
  top: 52.592592593%;
}
.primary_l {
  left: 40.364583333%;
  font-size: 2.3vh;
}
#login_ln_0,
#login_ln_1 {
  top: 38.425925926%;
  left: 29.21875%;
  width: 41.510416667%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #4900a7 0%,
    rgba(73, 0, 167, 0.15) 100%
  );
}
#login_ln_1 {
  top: 59.722222222%;
  left: 40.364583333%;
  width: 19.479166667%;
}
#logo {
  top: 13.981481481%;
  left: 50%;
  transform: translate(-50%);
  width: 22.447916667%;
  height: 15.137037037%;
}
#login_deco {
  top: 32.037037037%;
  left: 29.21875%;
  height: 05.277777778%;
}
.save_btn_deco_elm_list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(80, 1fr);
  grid-template-rows: repeat(6, 1fr);
}
.main_save_btn_deco_container {
  position: absolute;
  height: 5.277777778%;
  width: 41.510416667%;
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Electrolize&display=swap');
body {
  font-family: 'Electrolize', sans-serif;
  background: linear-gradient(
    110.18deg,
    #03000b 22.56%,
    #060012 61.28%,
    #020013 100%
  );
}
ul {
  position: absolute;
  padding: 0;
  margin: 0;
  display: flex;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
ul::-webkit-scrollbar {
  width: 0.5vh;
  height: 0;
}
ul::-webkit-scrollbar-track {
  background-color: #4900a700;
}

ul::-webkit-scrollbar-thumb {
  background-color: #4900a7;
}
/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>