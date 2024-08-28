import { createStore } from 'vuex';
import api from '@/utils/api';
import router from '@/router';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
      localStorage.setItem('refresh_token', refreshToken);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/api/login_check', credentials);
        commit('setToken', response.data.token);
        commit('setRefreshToken', response.data.refresh_token);
        const userInfo = {
          user: response.data.user,
        };
        commit('setUserInfo', userInfo);

        router.push('/');
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    async refreshToken({ commit, state }) {
      try {
        const response = await api.post('/api/token/refresh', {
          refresh_token: state.refreshToken,
        });
        commit('setToken', response.data.token);
      } catch (error) {
        console.error('Token refresh error:', error);
      }
    },
  },
});

export default store;
