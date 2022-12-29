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
const email_regex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
export default {
  head() {
    return {
      title: 'Spider Eyes // Signup',
    }
  },
  data() {
    return {
      usernameIn: '',
      emailIn: '',
      passwordIn: '',
    }
  },
  name: 'Create_Account',
  methods: {
    createAccountButtonOnClick() {
      let newAccountObj = {
        username: this.usernameIn,
        email: this.emailIn,
        password: this.passwordIn,
      }
      if (
        this.usernameIn.length > 1 &&
        this.emailIn.length >= 3 &&
        this.passwordIn.length >= 8 &&
        this.emailIn.match(email_regex)
      ) {
      }
      this.$axios
        .post(
          'https://spidereyes-api.vercel.app/api/dbop?newAccount=0',
          newAccountObj
        ) //https://spidereyes-api.vercel.app/api/dbop
        .then((r) => {
          if (r.data.status) {
            window.location.pathname = 'login'
          }
        })
        .catch((e) => {})
    },
    backToLoginOnClick() {
      window.location.pathname = 'login'
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
    <BaseLabel id="username_l" class="primary_l" v-text="'Username'" color="#8F34FF"></BaseLabel>
    <form ref="newAccountFormRef" action="POST">
      <input autofocus v-model="usernameIn" type="text" name="username" spellcheck="false" id="uid_input"></input>
      <BaseLabel id="email_l" class="primary_l" v-text="'Email'" color="#8F34FF"></BaseLabel>
      <input v-model="emailIn" type="text" spellcheck="false" id="email_input"></input>
      <BaseLabel id="password_l" class="primary_l" v-text="'Password'" color="#8F34FF"></BaseLabel>
      <input v-model="passwordIn" type="password" spellcheck="false" id="password_input"></input>
    </form>
    <HorizontalLine id="login_ln_1" color="#0500FF00"></HorizontalLine>
    <BaseButton @createAccountButtonOnClick="createAccountButtonOnClick" onClickEventName="createAccountButtonOnClick" id="create_account_btn" width="19.479166667%" height="4.259259259%" :label="{text: 'Create Account', fontSize: '2.3vh'}"></BaseButton>
    <BaseButton @backToLoginOnClick="backToLoginOnClick" onClickEventName="backToLoginOnClick" :baseColorSet="{text: '#5900C7', bkg: '#20004820', border: '#2A005E'}" :HoverColorSet="{text: '#5900C7', bkg: '#20004860', border: '#2A005E'}" id="login_btn" width="19.479166667%" height="4.259259259%" :label="{text: 'Back To Login', fontSize: '2.3vh'}"></BaseButton>
</div>
</template>
  

<style scoped>
#username_l {
  top: 40.37037037%;
}
#email_l {
  top: 49.722222222%;
}
#create_account_btn {
  top: 71.851851852%;
  left: 40.364583333%;
}
#login_btn {
  top: 79.166666667%;
  left: 40.364583333%;
}
#password_l {
  top: 58.888888889%;
}
#uid_input,
#password_input,
#email_input {
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
#password_input:hover,
#email_input:hover {
  background-color: #4700a340;
}
#uid_input:focus,
#password_input:focus,
#email_input:focus {
  color: #bf8aff;
}
#uid_input::selection,
#password_input::selection,
#email_input::selection {
  background-color: #88888840;
}
#email_input {
  top: 52.592592593%;
}

#password_input {
  top: 61.759259259%;
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
  top: 68.888888889%;
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