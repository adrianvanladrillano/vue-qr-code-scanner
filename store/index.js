import axios from 'axios'
export const state = () => ({
    citizens: [],
})

export const getters = {
}
export const mutations = {
    ADD_CITIZEN(state, payload) {
        state.citizens.push(payload)
    },
}
export const actions = {
}