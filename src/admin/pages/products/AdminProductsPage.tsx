import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { currencyFormatter } from "@/lib/currency-formatter";
import { useProducts } from "@/shop/hooks/useProducts";
import { PencilIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";

export const AdminProductsPage = () => {

    const { data } = useProducts();




    return (
        <>
            <div className="flex justify-between items-center">
                <AdminTitle title="Productos" subtitle="Aqui puedes administrar tus productos" />

                <div className="flex justify-end mb-10 gap-4">
                    <Link to='/admin/products/new' className="m-2.5">
                        <Button>
                            <PlusIcon />
                            Nuevo Producto
                        </Button>
                    </Link >
                </div>

            </div>

            <Table className="bg-white p-10 shadow-xs border mt-2 border-gray-200 mb-10">
                <TableHeader>
                    <TableRow>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead >Precio</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Inventario</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!data ? (
                        <TableRow >
                            <TableCell colSpan={8} className="text-center">SIN DATOS</TableCell>
                        </TableRow>
                    ) :
                        (
                            data.products.map(product =>
                            (
                                <TableRow className="text" key={product.id}>
                                    <TableCell><img src={product.images[0]}
                                        alt="Producto"
                                        className="w-20 h-20 object-cover rounded-md"></img></TableCell>
                                    <TableCell className="font-montserrat">
                                        <Link to={`/admin/products/` + product.id}>
                                            {product.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="font-montserrat">{currencyFormatter(product.price)}</TableCell>
                                    <TableCell className="font-montserrat">{product.gender} </TableCell>
                                    <TableCell className="font-montserrat">{product.stock}</TableCell>
                                    <TableCell className="font-montserrat">{product.sizes.join(',')}</TableCell>
                                    <TableCell className="text-right font-montserrat">
                                        <Link className="text-right" to={`/admin/products/` + product.id}>
                                            <PencilIcon className="W-4 H-4 text-blue-500 text-right" />
                                        </Link></TableCell>
                                </TableRow>
                            )
                            )
                        )
                    }
                    {/* <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell><img src="ejemplo"
                            alt="Producto"
                            className="w-20 h-20 object-cover rounded-md"></img></TableCell>
                        <TableCell>Prodcuto 1</TableCell>
                        <TableCell>$250</TableCell>
                        <TableCell>Categoria 1 </TableCell>
                        <TableCell>Inventario 1 </TableCell>
                        <TableCell>L </TableCell>
                        <TableCell className="text-right">
                            <Link to={`/admin/products/:` + 'id'}>Acciones</Link></TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
            <CustomPagination totalPages={data?.pages || 6} />
        </>
    )
}
