import { db } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductDetailsClient } from "./product-details-client";

// This is a server component that fetches data
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const product = await db.product.findUnique({
            where: { id },
        });

        if (!product) {
            return notFound();
        }

        return (
            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product Images */}
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                        {product.images?.[0] ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Product Details & Actions */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
                        <p className="text-2xl font-semibold text-primary mb-6">${product.price.toFixed(2)}</p>

                        <div className="prose dark:prose-invert mb-8 text-gray-600 dark:text-gray-300">
                            {product.description}
                        </div>

                        {/* Client Component for Interaction */}
                        <ProductDetailsClient product={product} />
                    </div>
                </div>
            </div>
        );

    } catch (error) {
        console.error("Error fetching product:", error);
        return notFound();
    }
}
