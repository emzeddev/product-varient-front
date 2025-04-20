import { createStore } from 'vuex';
import axios from '@/axios/index.js';

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
            has_variantion: true,
            default_variation_id: null,
            is_active: true,
            price_before_offer: null,
            price: null,
            review: '',
            description: '',
            seo_title: '',
            seo_description: '',
            galleries: [{
                id: 1,
                file: null,
                preview: '',
                alt: '',
                isMain: false,
            }],
            specifications: [{ 
                id: 1,
                feature: '',
                featureInput: '',
                value: '',
                dropdownOpen: false
            }],
            attributes: [{
                feature: "",
                input: "",
                showDropdown: false,
                tempValue: "",
                values: [],
            }],
            variants: [],
            primary_category_id: null,
            other_category_ids: [],
            sku_number: 0,
            guarantee: null,
            brand_id: null,
            tags: []
        },
        attribute_list: [],
        brands_list: [],
        categories_list: [],
        tags_list: []
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
        },
        addProductImages(state , value) {
            state.productData.galleries = [...state.productData.galleries , value];
        },
        removeProductImages(state , value) {
            state.productData.galleries = state.productData.galleries.filter((item , index) => index !== value);
        },
        setProductMainImage(state , value) {
            state.productData.galleries = state.productData.galleries.map((item , index) => {
                if (index === value) {
                    return {
                        ...item,
                        isMain: true
                    }
                } else {
                    return {
                        ...item,
                        isMain: false
                    }
                }
            })
        },
        setProductImageFile(state , value) {
            state.productData.galleries = state.productData.galleries.map((item , index) => {
                if (index === value.index) {
                    return {
                        ...item,
                        preview: value.preview,
                        file: value.file
                    }
                } else {
                    return item;
                }
            })
        },
        setAttributeList(state , value) {   
            state.attribute_list = value;
        },
        addProductSpecifications(state , value) {
            // Check if the value is an object and has the required properties
            if (typeof value === 'object' && value.hasOwnProperty('feature') && value.hasOwnProperty('value')) {
                state.productData.specifications.push(value);
            } else {
                console.error('Invalid specification object:', value);
            }
        },
        removeProductSpecifications(state , value) {
            // Check if the value is a number
            if (typeof value === 'number') {
                state.productData.specifications = state.productData.specifications.filter((item , index) => index !== value);
            } else {
                console.error('Invalid specification index:', value);
            }
        },
        setProductDescription(state , value) {
            state.productData.description = value;
        },
        setProductReview(state , value) {
            state.productData.review = value;
        },
        setProductHasVariants(state , value) {
            state.productData.has_variantion = value;
        },
        addProductAttributeGroup(state , value) {
            // Check if the value is an object and has the required properties
            if (typeof value === 'object' && value.hasOwnProperty('feature') && value.hasOwnProperty('input')) {
                state.productData.attributes.push(value);
            } else {
                console.error('Invalid attribute group object:', value);
            }
        },
        setProductVariants(state , value) {
            // Check if the value is an array
            if (Array.isArray(value)) {
                state.productData.variants = value;
            } else {
                console.error('Invalid variants array:', value);
            }
        },
        clearProductVariants(state , value=[]) {
            // Check if the value is an array
            if (Array.isArray(value)) {
                state.productData.variants = value;
                state.productData.attributes = [{
                    feature: "",
                    input: "",
                    showDropdown: false,
                    tempValue: "",
                    values: [],
                }];
            } else {
                console.error('Invalid variants array:', value);
            }
        },
        updateProductAttributeGroup(state , value) {
            // Check if the value is an array
            if (Array.isArray(value)) {
                state.productData.attributes = value;
            } else {
                console.error('Invalid attribute group array:', value);
            }
        },
        setProductSeoTitle(state , value) {
            state.productData.seo_title = value;
        },
        setProductSeoDescription(state , value) {
            state.productData.seo_description = value;
        },
        setBrandsList(state , value) {
            // Check if the value is an array
            if (Array.isArray(value)) {
                state.brands_list = value;
            } else {
                console.error('Invalid brands list:', value);
            }
        },
        setCategoriesList(state , value) {
            // Check if the value is an array
            if (Array.isArray(value)) {
                state.categories_list = value;
            } else {
                console.error('Invalid categories list:', value);
            }
        },
        setTagsList(state , value) {
            // Check if the value is an array
            if (Array.isArray(value)) {
                state.tags_list = value;
            } else {
                console.error('Invalid tags list:', value);
            }
        },
        addToCategoriesList(state , value) {
            // Check if the value is an array
            if (typeof value === 'object' && value !== null) {
                state.categories_list = [value , ...state.categories_list];
            } else {
                console.error('Invalid categories object:', value);
            }
        },
        setProductCategoryId(state , value) {
            // Check if the value is a number
            if (typeof value === 'string' && value.length > 0) {
                state.productData.primary_category_id = value;
            } else {
                console.error('Invalid category ID:', value);
            }
        },
        setProductOtherCategoryIds(state , value) {
            // Check if the value is an array
            if (Array.isArray(value)) {
                state.productData.other_category_ids = value;
            } else {
                console.error('Invalid other category IDs:', value);
            }
        },
        addToBrandsList(state , value) {
            // Check if the value is an object
            if (typeof value === 'object' && value !== null) {
                state.brands_list = [value , ...state.brands_list];
            } else {
                console.error('Invalid brand object:', value);
            }
        },
        setProductBrandId(state , value) {
            // Check if the value is a number
            if (typeof value === 'string' && value.length > 0) {
                state.productData.brand_id = value;
            } else {
                console.error('Invalid brand ID:', value);
            }
        },
        setProductIsActive(state , value) {
            state.productData.is_active = value;
        },
        setProductSkuNumber(state , value) {
            
            // Check if the value is a number
            if (typeof value === 'number') {
                state.productData.sku_number = value;
            } else {
                console.error('Invalid SKU number:', value);
            }
        },
        setProductGuarantee(state , value) {
            // Check if the value is a string
            if (typeof value === 'string' && value.length > 0) {
                state.productData.guarantee = value;
            } else {
                console.error('Invalid guarantee:', value);
            }
        },
        addToTagsList(state , value) {
            // Check if the value is an object
            if (typeof value === 'object' && value !== null) {
                state.tags_list = [value , ...state.tags_list];
            } else {
                console.error('Invalid tag object:', value);
            }
        },
        addTpProductTags(state , value) {
            // Check if the value is an array
            if (Array.isArray(value)) {
                state.productData.tags = value;
            } else {
                console.error('Invalid tags array:', value);
            }
        }
        

    },
    actions: {
        // Define asynchronous functions to commit mutations
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
        },
        addProductImage({commit} , value) {
            commit('addProductImages', value);
        },
        removeProductImage({commit} , value) {
            commit('removeProductImages', value);
        },
        setProductMainImage({commit} , value) {
            commit('setProductMainImage', value);
        },
        setProductImageFile({commit} , value) {
            commit('setProductImageFile', value);
        },
        async getAttributeList({commit}) {
            const result = await axios.get('/v1/attributes')
            console.log(result);
            if (result.status === 200) {
                commit('setAttributeList', result.data);
            }
        },
        addProductSpecification({commit} , value) {
            commit('addProductSpecifications', value);
        },
        removeProductSpecification({commit} , value) {
            commit('removeProductSpecifications', value);
        },
        saveAttribute({commit} , value) {
            return new Promise(async (resolve , reject) => {
                if (value.length > 1) {
                    try {
                        const result = await axios.post('/v1/attributes' , {
                            name: value,
                        })
                        if(result.status === 201) {
                            resolve({
                                success: true,
                                message: "ویژگی با موفقیت ثبت شد"
                            })
                        }
                    } catch(error) {
                        reject({
                            success: false,
                            message: "خطای سمت سرور"
                        })
                    }
                } else {
                    reject({
                        success: false,
                        message: "ویژگی نامعتبر است"
                    })
                }
            })
        },
        updateProductDescription({commit} , value) {
            commit('setProductDescription', value);
        },
        updateProductReview({commit} , value) {
            commit('setProductReview', value);
        },
        updateProductHasVariants({commit} , value) {
            commit('setProductHasVariants', value);
        },
        addProductAttributeGroup({commit} , value) {
            commit('addProductAttributeGroup', value);
        },
        updateProductVariants({commit} , value) {
            commit('setProductVariants', value);
        },
        removeProductVariants({commit , state} , value) {
            // Check if the value is a number
            if (typeof value === 'number') {
                commit('setProductVariants', state.productData.variants.filter((item , index) => index !== value));
            } else {
                console.error('Invalid variant index:', value);
            }
        },
        clearVariants({commit}) {
            commit('clearProductVariants', []);
        },
        removeProductAttributeGroup({commit , state} , value) {
            // Check if the value is a number
            if (typeof value === 'number') {
                commit('updateProductAttributeGroup', state.productData.attributes.filter((item , index) => index !== value));
            } else {
                console.error('Invalid attribute group index:', value);
            }
        },
        updateProductSeoTitle({commit} , value) {
            commit('setProductSeoTitle', value);
        },
        updateProductSeoDescription({commit} , value) {
            commit('setProductSeoDescription', value);
        },
        async getBrandsList({commit}) {
            const result = await axios.get('/v1/brands')
            if (result.status === 200) {
                commit('setBrandsList', result.data);
            }
        },
        async getCategoriesList({commit}) {
            const result = await axios.get('/v1/categories')
            if (result.status === 200) {
                console.log(result);
                commit('setCategoriesList', result.data);
            }
        },
        async getTagsList({commit}) {
            const result = await axios.get('/v1/tags')
            if (result.status === 200) {
                commit('setTagsList', result.data);
            }
        },
        async saveCategory({commit} , value) {
            return new Promise(async (resolve , reject) => {
                if (value.title.length > 1) {
                    try {
                        const result = await axios.post('/v1/categories' , {
                            title: value.title,
                        })
                        if(result.status === 201) {
                            resolve({
                                success: true,
                                message: "دسته بندی با موفقیت ثبت شد",
                                category: result.data.category
                            })
                        }
                    } catch(error) {
                        reject({
                            success: false,
                            message: "خطای سمت سرور"
                        })
                    }
                } else {
                    reject({
                        success: false,
                        message: "دسته بندی نامعتبر است"
                    })
                }
            })
        },
        updateCategoriesList({commit} , value) {
            // Check if the value is an array
            if (typeof value === 'object' && value !== null) {
                commit('addToCategoriesList', value);
            } else {
                console.error('Invalid categories list:', value);
            }
        },
        setProductCategoryId({commit} , value) {
            // Check if the value is a number
            if (typeof value === 'string' && value.length > 0) {
                commit('setProductCategoryId', value);
            } else {
                console.error('Invalid category ID:', value);
            }
        },
        setProductOtherCategoryIds({commit} , value) {
            // Check if the value is an array
            if (Array.isArray(value)) {
                commit('setProductOtherCategoryIds', value);
            } else {
                console.error('Invalid other category IDs:', value);
            }
        },
        saveBrand({commit , state} , value) {
            return new Promise(async (resolve , reject) => {
                if (value.title.length > 1) {
                    try {
                        const result = await axios.post('/v1/brands' , {
                            title: value.title,
                        })
                        if(result.status === 201) {
                            resolve({
                                success: true,
                                message: "برند با موفقیت ثبت شد",
                                brand: result.data.brand
                            })

                            commit("addToBrandsList" , result.data.brand);
                        }
                    } catch(error) {
                        reject({
                            success: false,
                            message: "خطای سمت سرور"
                        })
                    }
                } else {
                    reject({
                        success: false,
                        message: "برند نامعتبر است"
                    })
                }
            })
        },
        setProductBrandId({commit} , value) {
            // Check if the value is a number
            if (typeof value === 'string' && value.length > 0) {
                commit('setProductBrandId', value);
            } else {
                console.error('Invalid brand ID:', value);
            }
        },
        updateProductIsActive({commit} , value) {
            commit('setProductIsActive', value);
        },
        updateProductSkuNumber({commit} , value) {
            // Check if the value is a number
            if (typeof value === 'number') {
                commit('setProductSkuNumber', value);
            } else {
                console.error('Invalid SKU number:', value);
            }
        },
        updateProductGuarantee({commit} , value) {
            // Check if the value is a string
            if (typeof value === 'string' && value.length > 0) {
                commit('setProductGuarantee', value);
            } else {
                console.error('Invalid guarantee:', value);
            }
        },
        saveTag({commit} , value) {
            return new Promise(async (resolve , reject) => {
                if (value.title.length > 1) {
                    try {
                        const result = await axios.post('/v1/tags' , {
                            title: value.title,
                        })
                        if(result.status === 201) {
                            resolve({
                                success: true,
                                message: "برچسب با موفقیت ثبت شد",
                                tag: result.data.tag
                            })

                            commit("addToTagsList" , result.data.tag);
                        }
                    } catch(error) {
                        reject({
                            success: false,
                            message: "خطای سمت سرور"
                        })
                    }
                } else {
                    reject({
                        success: false,
                        message: "برچسب نامعتبر است"
                    })
                }
            })
        },
        setProductTags({commit} , value) {
            // Check if the value is an array
            if (Array.isArray(value)) {
                commit('addTpProductTags', value);
            } else {
                console.error('Invalid other category IDs:', value);
            }
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
        },
        getProductImages(state) {
            return state.productData.galleries;
        },
        getAttributeList(state) {
            return state.attribute_list;
        },
        getProductSpecifications(state) {
            return state.productData.specifications;
        },
        getProductDescription(state) {
            return state.productData.description;
        },
        getProductReview(state) {
            return state.productData.review;
        },
        getProductHasVariants(state) {
            return state.productData.has_variantion;
        },
        getProductAttributeGroups(state) {
            return state.productData.attributes;
        },
        getProductVariants(state) {
            return state.productData.variants;
        },
        getProductSeoTitle(state) {
            return state.productData.seo_title;
        },
        getProductSeoDescription(state) {
            return state.productData.seo_description;
        },
        getCategoriesList(state) {
            return state.categories_list;
        },
        getBrandsList(state) {
            return state.brands_list;
        },
        getTagsList(state) {
            return state.tags_list;
        },
        getProductIsActive(state) {
            return state.productData.is_active;
        },
        getProductSkuNumber(state) {
            return state.productData.sku_number;
        },
        getProductGuarantee(state) {
            return state.productData.guarantee;
        }

    },
});

export default store;