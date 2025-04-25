import { createStore } from 'vuex';
import axios from '@/axios/index.js';

const store = createStore({
    state: {
        productData: {
            fa_title: null,
            fa_slug: null,
            en_title: null,
            en_slug: null,
            stock: 0,
            stock_status: 'unlimited',
            minimum_order_q: 0,
            maximum_order_q: 0,
            is_spacial_offer: false,
            spacial_offer_date: null,
            has_variantion: true,
            default_variation_id: null,
            is_active: true,
            price_before_offer: 0,
            price: 0,
            review: null,
            description: null,
            seo_title: '',
            seo_description: '',
            galleries: [],
            specifications: [],
            attributes: [],
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
        },


        async setdefaultValuesForProductData(state , product) {
            state.productData.fa_title = product.fa_title != 'null' ? product.fa_title : null 
            state.productData.fa_slug = product.fa_slug != 'null' ? product.fa_slug : null 
            state.productData.en_title = product.fa_title != 'null' ? product.en_title : null 
            state.productData.en_slug = product.fa_slug != 'null' ? product.en_slug : null 

            state.productData.stock = parseInt(product.stock)
            state.productData.stock_status = product.stock_status

            state.productData.minimum_order_q = parseInt(product.minimum_order_q)
            state.productData.maximum_order_q = parseInt(product.maximum_order_q)
            
            state.productData.is_spacial_offer = product.is_spacial_offer == "true" ? true : false
            state.productData.spacial_offer_date = product.spacial_offer_date

            if(product.galleries.length != 0) {
                const gallery = product.galleries.map((val , index) => {
                    return {
                        id: val.id,
                        file: val.file != 'null' ? `http://localhost:8000/storage/${val.file}` : null,
                        preview: '',
                        alt: val.alt,
                        isMain: val.is_main == "yes" ? true : false,
                    }
                })
                state.productData.galleries = gallery
            }

            if(product.specifications.length != 0) {
                product.specifications.forEach((spec , index) => {
                    state.productData.specifications = [{
                        dropdownOpen: false,
                        feature: spec.title,
                        featureInput: spec.title,
                        id: index+1,
                        value: spec.value
                    } , ...state.productData.specifications]
                });
            }

            state.productData.description = product.description != 'null' ? product.description : null
            state.productData.has_variantion = product.has_variantion == "true" ? true : false

            if(product.attributes.length != 0) {
                const setAttributePromise = new Promise((resolve , reject) => {
                    product.attributes.forEach((attr , index) => {
                        const pushedData = {
                            showDropdown: false,
                            feature: attr.attribute?.name,
                            input: attr.attribute?.name,
                            tempValue: "",
                            values: []
                        }
    
                        if(attr.values.length != 0) {
                            attr.values.forEach((val , index) => {
                                pushedData.values = [val.value , ...pushedData.values]
                            })
                        }
    
                        state.productData.attributes = [pushedData, ...state.productData.attributes]

                        resolve({
                            success: true
                        })
                    })
                })
                
                const result = await setAttributePromise
                if(result.success) {
                    setTimeout(() => {
                        if(product.variants.length != 0) {
                            product.variants.forEach((variant , index) => {
                                state.productData.variants[index].id = variant.id
                                state.productData.variants[index].is_default = variant.is_default == "no" ? false : true
                                state.productData.variants[index].localimage = null
                                state.productData.variants[index].image = variant.image != 'null' ? `http://localhost:8000/storage/${variant.image}`: null
                                state.productData.variants[index].price = parseInt(variant.price)
                                state.productData.variants[index].price_before_discount = parseInt(variant.price_before_discount)
                                state.productData.variants[index].stock = parseInt(variant.stock)
                                state.productData.variants[index].weight = parseInt(variant.weight)
                                state.productData.variants[index].preparation_time = parseInt(variant.preparation_time)
                                state.productData.variants[index].sku_number = parseInt(variant.sku_number)
        
                                state.productData.variants[index]["length"] = variant["length"] == "null" ? null : variant["length"]
                                state.productData.variants[index]["width"] = variant["width"] == "null" ? null : variant["width"]
                                state.productData.variants[index]["height"] = variant["height"] == "null" ? null : variant["height"]
                            })
                        }
                    },3000)
                }
            }

            state.productData.review = product.review != 'null' ? product.review : null
            state.productData.seo_title = product.seo_title != 'null' && product.seo_title != null ? product.seo_title : ''
            state.productData.seo_description = product.seo_description != 'null' && product.seo_description != null ? product.seo_description : ''

            state.productData.primary_category_id = product.primary_category_id
            if(product.categories.length != 0) {
                const otherCatIds = product.categories.map((val , index) => {
                    return val.id
                })
                state.productData.other_category_ids = otherCatIds
            }

            state.productData.brand_id = product.brand_id != "null" ? product.brand_id : null
            state.productData.guarantee = product.guarantee != "null" ? product.guarantee : null

            if(product.tags.length != 0) {
                const tagIds = product.tags.map((val , index) => {
                    return val.id
                })
                state.productData.tags = tagIds
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
        },
        saveProduct({commit , state} , value) {
            return new Promise(async (resolve, reject) => {
                if (state.productData.primary_category_id == null) {
                  return reject({
                    success: false,
                    message: "دسته بندی اصلی را انتخاب کنید",
                  });
                }

                let formData = new FormData();
                formData.append("fa_title", state.productData.fa_title);
                formData.append("fa_slug", state.productData.fa_slug);
                formData.append("en_title", state.productData.en_title);
                formData.append("en_slug", state.productData.en_slug);
                formData.append("stock", state.productData.stock);
                formData.append("is_draft", value.isDraft);
                formData.append("stock_status", state.productData.stock_status);
                formData.append("minimum_order_q", state.productData.minimum_order_q);
                formData.append("maximum_order_q", state.productData.maximum_order_q);
                formData.append("is_spacial_offer", state.productData.is_spacial_offer);
                formData.append("spacial_offer_date", state.productData.spacial_offer_date);
                formData.append("has_variantion", state.productData.has_variantion);
                formData.append("default_variation_id", state.productData.default_variation_id);
                formData.append("is_active", state.productData.is_active);
                formData.append("price_before_offer", state.productData.price_before_offer);
                formData.append("price", state.productData.price);
                formData.append("review", state.productData.review);
                formData.append("description", state.productData.description);
                formData.append("seo_title", state.productData.seo_title);
                formData.append("seo_description", state.productData.seo_description);
                formData.append("primary_category_id", state.productData.primary_category_id); 
                formData.append("sku_number", state.productData.sku_number);
                formData.append("guarantee", state.productData.guarantee);
                formData.append("brand_id", state.productData.brand_id);

                if(state.productData.other_category_ids.length > 0) {
                    formData.append("other_category_ids", JSON.stringify(state.productData.other_category_ids));
                }

                if(state.productData.tags.length > 0) {
                    formData.append("tags", JSON.stringify(state.productData.tags));
                }

                if(state.productData.galleries.length > 0) {
                    state.productData.galleries.forEach((gallery, index) => {
                        if (gallery.file) {
                            formData.append(`galleries[${index}][file]`, gallery.file);
                        }
                        formData.append(`galleries[${index}][id]`, gallery.id);
                        formData.append(`galleries[${index}][preview]`, gallery.preview);
                        formData.append(`galleries[${index}][alt]`, gallery.alt);
                        formData.append(`galleries[${index}][isMain]`, gallery.isMain);
                    });
                }

                if(state.productData.specifications.length > 0) {
                    formData.append("specifications", JSON.stringify(state.productData.specifications));
                }

                if(state.productData.attributes.length > 0) {
                    formData.append("attributes", JSON.stringify(state.productData.attributes));
                }

                if (state.productData.variants.length > 0) {
                    state.productData.variants.forEach((variant, index) => {
                        formData.append(`variants[${index}][height]`, variant.height);
                        formData.append(`variants[${index}][image]`, variant.image);
                        formData.append(`variants[${index}][is_default]`, variant.is_default);
                        formData.append(`variants[${index}][length]`, variant.length);
                        formData.append(`variants[${index}][localimage]`, variant.localimage);
                        formData.append(`variants[${index}][preparation_time]`, variant.preparation_time);
                        formData.append(`variants[${index}][price]`, variant.price);
                        formData.append(`variants[${index}][price_before_discount]`, variant.price_before_discount);
                        formData.append(`variants[${index}][properties]`, JSON.stringify(variant.properties));
                        formData.append(`variants[${index}][sku]`, variant.sku);
                        formData.append(`variants[${index}][sku_number]`, variant.sku_number);
                        formData.append(`variants[${index}][stock]`, variant.stock);
                        formData.append(`variants[${index}][weight]`, variant.weight);
                        formData.append(`variants[${index}][width]`, variant.width);
                    });
                }
            
                try {
                  const result = await axios.post("/v1/products", formData , {
                    headers :{
                        "Content-Type": "multipart/form-data"
                    }
                  });
            
                  if (result.status === 201) {
                    resolve({
                      success: true
                    });
                  } else {
                    reject({
                      success: false,
                      message: "خطایی رخ داد",
                    });
                  }
                } catch (err) {
                  reject({
                    success: false,
                    message: err?.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
                  });
                }
            });
        },

        getProductById({commit} , value) {
            return new Promise(async (resolve , reject) => {
                try {
                    const result = await axios.get(`/v1/products/${value.id}`)
                    
                    if(result.status == 200) {
                        resolve({
                            success: true,
                            message: "با موفقیت دریافت شد",
                            product: result.data.product
                        })

                        commit("setdefaultValuesForProductData" , result.data.product)


                    }else {
                        reject({
                            success: false,
                            message: "خطایی رخ داد",
                        });
                    }
                }catch(err) {
                    reject({
                        success: false,
                        message: err?.response?.data?.message || "خطای ناشناخته‌ای رخ داد",
                    });
                }
            })
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
        },

        // [
        getSpecialOfferDataValue(state) {
            return state.productData.spacial_offer_date
        },
        getProductPrimaryCategory(state) {
            return state.productData.primary_category_id
        },
        getProductOtherCategoryIds(state) {
            return state.productData.other_category_ids
        },
        getProductBrandId(state) {
            return state.productData.brand_id
        },
        getProductTagIds(state) {
            return state.productData.tags
        }
        // ]

    },
});

export default store;