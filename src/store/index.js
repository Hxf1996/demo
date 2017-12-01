import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

import hello from './modules/Hello';

Vue.use(Vuex);

export default function createStore() {
    return new Vuex.Store({
        strict: true,
        state: {},
        modules: {
            hello,
        },
        actions,
        getters,
        mutations,
    });
}
