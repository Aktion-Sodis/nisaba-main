import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

// import modules
import persistedDummyModule from './persistedDummyModule'
import volatileDummyModule from './volatileDummyModule'

// persist
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['persistedDummyModule']
})


export default createStore({
    state: {
        message: 'Hello World',
    },
    getters: {
        getHelloWorld: ({ message }) => message,
        helloWorldWithoutSpace: (_, { getHelloWorld }) => getHelloWorld.replaceAll(' ', '')
    },
    mutations: {
        setMessage: (state, { newMessage }) => {
            state.message = newMessage
        }
    },
    actions: {
        exampleButtonHandler: ({ commit, getters }) => {
            if (getters.getHelloWorld === 'Hello World') {
                commit('setMessage', { newMessage: 'Hello Nisaba!' })
            } else {
                commit('setMessage', { newMessage: 'Hello world!' })
            }
        }
    },
    modules: {
        persistedDummyModule,
        volatileDummyModule
    },
    plugins: [vuexLocal.plugin]
})