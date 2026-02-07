import { ProductCard, Product } from "@/components/ProductCard";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

async function getProducts(): Promise<Product[]> {
    try {
        const products = await db.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return products.map(p => ({
            ...p,
            images: p.images || [],
        }));
    } catch (error) {
        console.error("Failed to fetch products", error);
        return [];
    }
}

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shop All</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-muted-foreground text-lg">No products found.</p>
                        <p className="text-sm text-muted-foreground mt-2">Check back soon for new arrivals!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
