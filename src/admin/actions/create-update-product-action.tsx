import { tesloApi } from '@/api/tesloApi';
import type { Product } from '@/interfaces/product.interface'
import { sleep } from '@/lib/sleep';

export const createUpdateProductAction = async (productlike: Partial<Product> & { files?: File[] })
    : Promise<Product> => {
    await sleep(1500);

    const { id, user, images = [], files = [], ...rest } = productlike;

    const isCreating = id === 'new';
    rest.stock = Number(rest.stock || 0);
    rest.price = Number(rest.price || 0);

    //preparar las imagenes
    if (files.length > 0) {
        const newImageNames = await UploadFiles(files);
        images.push(...newImageNames);

    }

    const imageToSave = images.map(img => {
        if (img.includes('http')) return img.split('/').pop() || '';
        return img;
    })


    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: {
            ...rest,
            images: imageToSave


        }
    });

    return {
        ...data,
        images: data.images.map(image => {
            if (image.includes('http'))
                return image;
            return `${import.meta.env.VITE_API_URL}/files/product/${image}`
        }),

    }
}

export interface FileUploadResponse {
    secureURL: string;
    fileName: string
}

const UploadFiles = async (files: File[]) => {

    const uploadPromises = files.map(async file => {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await tesloApi<FileUploadResponse>({
            url: 'files/product',
            method: 'POST',
            data: formData
        })
        return data.fileName;
    })
    const uploadedFileNames = await Promise.all(uploadPromises);

    return uploadedFileNames;
}
