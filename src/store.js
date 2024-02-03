import { createStore } from 'vuex';

export default createStore({
    state: {
        packages: [],
    },
    mutations: {
        setPackages(state, packages) {
            state.packages = packages;
        },
    },
});