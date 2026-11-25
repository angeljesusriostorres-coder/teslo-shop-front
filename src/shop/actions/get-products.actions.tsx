import { tesloApi } from "@/api/tesloApi"
import type { ProductsResponse } from "@/interfaces/products.response";
interface Options {
    limit?: number | string;
    offset?: number | string;
    sizes?: string;
    gender?: string;
    minPrice?: number;
    maxPrice?: number;
    q?: string

}


export const getProductsAction = async (options: Options): Promise<ProductsResponse> => {

    const { limit, offset, sizes, gender, minPrice, maxPrice, q } = options;

    console.log(sizes)
    const { data } = await tesloApi.get<ProductsResponse>('/products', {
        params: {
            limit,
            offset: offset,
            gender,
            sizes,
            minPrice,
            maxPrice,
            q
        }
    });
    const productsWhitImageUrls = data.products.map(product => ({
        ...product,
        images: product.images.map(image => `${import.meta.env.VITE_API_URL}/files/product/${image}`)

    }))

    return {
        ...data,
        products: productsWhitImageUrls
    };
}
