import { db } from "@/lib/db";
import { format } from "date-fns";
import { ProductColumn } from "./columns"; // We will create this
import { ProductsClient } from "./client";   // We will create this

export default async function ProductsPage() {
    const products = await db.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        price: formatPrice(item.price),
        category: item.category,
        size: item.sizes.join(", "),
        color: item.colors.join(", "),
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        stock: item.stock
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductsClient data={formattedProducts} />
            </div>
        </div>
    );
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}
