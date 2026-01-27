<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { notify } from '@/utils/toast';

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import router from '@/router';

const authStore = useAuthStore();
const loginName = ref('');
const password = ref('');

const handleLogin = async () => {
  if (!loginName.value || !password.value) {
    notify.error('Please enter both username and password');
    return;
  }
  
  await authStore.userLogin(loginName.value, password.value);
  notify.success('Logged in successfully');
  router.push('dashboard');
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">

      <form @submit.prevent="handleLogin">
        <div class="field">
          <label for="username">Username</label>
          <InputText 
            id="username" 
            v-model="loginName" 
          />
        </div>

        <div class="field">
          <label for="password">Password</label>
          <Password 
            id="password" 
            v-model="password" 
          />
        </div>

        <Button 
          type="submit" 
          label="Login" 
        />
      </form>
    </div>
  </div>
</template>

<style scoped lang="css">
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-card {
    background: #333;
    padding: 2.5rem;
    width: 100%;
    max-width: 400px;
}

.field {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.field label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #cbd5e1;
}
</style>