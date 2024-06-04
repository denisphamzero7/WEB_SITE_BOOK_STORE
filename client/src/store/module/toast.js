const state = {
    message: null,
    show: false,
    type: ['warning', 'success', 'error'],
    backgroundColor: '', // 'warning', 'error', 'success'
};

const mutations = {
    SHOW_TOAST(state, payload) {
        state.message = payload.message;
        state.type = payload.type;
        state.backgroundColor = payload.backgroundColor;
        state.show = true;
    },

    hideToast(state) {
        state.show = false;
    },
};

const actions = {
    showtoast({ commit }, payload) {
        commit('SHOW_TOAST', payload);
        setTimeout(() => {
            commit('hideToast');
        }, 3000);
    },
};

const getters = {
    getMessage: (state) => ({
        message: state.message,
        type: state.type,
    }),
    getBackgroundColor: (state) => {
        if (state.type === 'warning') {
            return 'bg-yellow-500 text-white';
        } else if (state.type === 'error') {
            return 'bg-red-500 text-white';
        } else if (state.type === 'success') {
            return 'bg-green-500 text-white';
        } else {
            return '';
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
