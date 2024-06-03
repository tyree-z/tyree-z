<template>
  <button @click="login" class="btn btn-ghost-primary d-flex d-md-flex">Log in</button>
</template>
<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithRedirect } = useAuth0();

    const login = async () => {
      loginWithRedirect();
    };

    return {
      login
    };
  }
};
</script>
