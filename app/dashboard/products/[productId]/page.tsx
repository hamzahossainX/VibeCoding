import { db } from "@/lib/db";
import { ProductForm } from "./product-form";

export default async function ProductPage({
    params
}: {
    params: Promise<{ productId: string }>
}) {
    const { productId } = await params;

    let product = null;

    if (productId !== "new") {
        product = await db.product.findUnique({
            where: {
                id: productId
            }
        });
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm initialData={product} />
            </div>
        </div>
    );
}
