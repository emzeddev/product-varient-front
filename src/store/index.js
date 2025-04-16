import { createStore } from 'vuex';
import axios from '@/axios/index';

const store = createStore({
    state: {
        productData: {
            fa_title: '',
            fa_slug: '',
            en_title: '',
            en_slug: '',
            stock: 0,
            stock_status: 'unlimited',
            minimum_order_q: null,
            maximum_order_q: null,
            is_spacial_offer: false,
            spacial_offer_date: '',
            is_product_variantion: false,
            default_variation_id: null,
            is_active: true,
            price_before_offer: null,
            price: null,
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
        setProductFaTitle(state, value) {
            state.productData.fa_title = value;
            state.productData.fa_slug = value.replace(/\s+/g, '-').toLowerCase();
        },
        setProductEnTitle(state, value) {
            state.productData.en_title = value;
            state.productData.en_slug = value.replace(/\s+/g, '-').toLowerCase();
        },
        setProductStockStatus(state, value) {
            state.productData.stock_status = value;
        },
        setProductStock(state, value) {
            state.productData.stock = value;
        },   
        setProductMinOrderQuantity(state, value) {
            state.productData.minimum_order_q = value;
        },
        setProductMaxOrderQuantity(state, value) {
            state.productData.maximum_order_q = value;
        },
        setProductPrice(state , value) {
            state.productData.price = value;
        },
        setProductPriceBeforeOffer(state , value) {
            state.productData.price_before_offer = value;
        },
        setProductIsSpecialOffer(state , value) {
            state.productData.is_spacial_offer = value;
        },
        setProductSpecialOfferDate(state , value) {
            state.productData.spacial_offer_date = value;
        }
    },
    actions: {
        // Define asynchronous functions to commit mutations
        // async fetchProducts({ commit }) {
        //     try {
        //         const response = await axios.get('/api/products');
        //         commit('setProducts', response.data);
        //     } catch (error) {
        //         console.error('Error fetching products:', error);
        //     }
        // },
        updateProductFaTitle({commit} , value) {
            commit('setProductFaTitle', value);
        },
        updateProductStock({commit} , value) {
            commit('setProductStock', value);
        },
        updateProductEnTitle({commit} , value) {
            commit('setProductEnTitle', value);
        },
        updateProductStockStatus({commit} , value) {
            commit('setProductStockStatus', value);
        },
        updateProductMinOrderQuantity({commit} , value) {
            commit('setProductMinOrderQuantity', value);
        },
        updateProductMaxOrderQuantity({commit} , value) {
            commit('setProductMaxOrderQuantity', value);
        },
        updateProductPrice({commit} , value) {
            commit('setProductPrice', value);
        },
        updateProductPriceBeforeOffer({commit , state} , value) {
            // Check if the price before offer is less than or equal to the product price
            commit('setProductPriceBeforeOffer', value);
            return new Promise((resolve , reject) => {
                // Check if the value is a number
                if (parseInt(value) <= parseInt(state.productData.price)) {
                    return reject({
                        success: false,
                        message: "مقدار قیمت قبل از تخفیف باید بیشتر از قیمت محصول باشد"
                    });
                } else {
                    return resolve({
                        success: true,
                        message: "قیمت قبل از تخفیف با موفقیت ثبت شد"
                    })
                }
            })

        },
        updateProductIsSpecialOffer({commit} , value) {
            commit('setProductIsSpecialOffer', value);
        },
        updateProductSpecialOfferDate({commit} , value) {
            commit('setProductSpecialOfferDate', value);
        }
    },
    getters: {
        // Define functions to access and compute derived state
        getProductFaTitle(state) {
            return state.productData.fa_title;
        },
        getProductStock(state) {
            return state.productData.stock;
        },   
        getProductEnTitle(state) {
            return state.productData.en_title;
        },
        getProductStockStatus(state) {
            return state.productData.stock_status;
        },
        getProductMinOrderQuantity(state) {
            return state.productData.minimum_order_q;
        },
        getProductMaxOrderQuantity(state) {
            return state.productData.maximum_order_q;
        },
        getProductPrice(state) {
            return state.productData.price;
        },
        getProductPriceBeforeOffer(state) {
            return state.productData.price_before_offer;
        },
        getProductIsSpecialOffer(state) {
            return state.productData.is_spacial_offer;
        }

    },
});

export default store;