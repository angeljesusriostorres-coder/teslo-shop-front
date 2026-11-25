// https://github.com/Klerith/bolt-product-editor

import { Navigate, useNavigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {
    const { id } = useParams();
    const { data: product, isLoading, isError, mutation } = useProduct(id || '')
    const navigate = useNavigate();




    const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
    const subtitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.';

    const handleSubmit = async (productLike: Partial<Product> & { files?: File[] }) => {

        console.log(productLike);

        await mutation.mutateAsync(productLike, {
            onSuccess: (data) => {
                toast.success('Producto actualizado correctamente', {
                    position: 'top-right'
                });
                navigate(`/admin/products/${data.id}`);
            },
            onError: (error) => {
                console.log(error);
                const message = error instanceof Error ? error.message : 'Error desconocido';
                toast.error(`Error al guardar el producto: ${message}`)
            }

        });
    }

    if (isError) {
        return <Navigate to={'/admin/products'} />
    }
    if (isLoading)
        return <CustomFullScreenLoading />

    if (!product)
        return <Navigate to={'/admin/products'} />

    return <ProductForm title={title} subtitle={subtitle} product={product} onSubmit={handleSubmit} isActiveButton={mutation.isPending} />





}