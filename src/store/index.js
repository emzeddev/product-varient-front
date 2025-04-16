import { createStore } from 'vuex';
import axios from '@/axios/index';

const store = createStore({
    state: {
        productData: {
            fa_title: '',
            fa_slug: '',
            en_title: '',
            en_slug: '',
            stock_status: '',
            minimum_order_q: null,
            maximum_order_q: null,
            is_spacial_offer: false,
            spacial_offer_date: '',
            review: '',
            description: '',
            seo_title: '',
            seo_description: '',
            galleries: [],
            specifications: [],
            attributes: [],
            variants: [],
            categories: []
        },
    },
    mutations: {
        setProducts(state, products) {
            console.log(products)
        },
    },
    actions: {
        // Define asynchronous functions to commit mutations
        async fetchProducts({ commit }) {
            try {
                const response = await axios.get('/api/products');
                commit('setProducts', response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
    },
    getters: {
        // Define functions to access and compute derived state
        allProducts(state) {
            return state.products;
        },
    },
});

export default store;