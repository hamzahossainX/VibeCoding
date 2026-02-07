"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

export interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    isFeatured?: boolean;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
            size: "M", // Default, user can change in cart or detail page
            color: "Default"
        });
    };

    return (
        <Card className="group relative overflow-hidden rounded-lg border-0 bg-transparent">
            <Link href={`/shop/${product.id}`}>
                <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Hover Actions */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 px-4">
                        <Button
                            onClick={handleAddToCart}
                            className="w-full bg-white text-black hover:bg-gray-100 hover:text-black dark:bg-black dark:text-white dark:hover:bg-gray-900"
                            size="sm"
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                        </Button>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white">
                            <Heart className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Link>
            <CardContent className="pt-4 px-0">
                <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                <Link href={`/shop/${product.id}`}>
                    <h3 className="font-semibold text-lg leading-tight hover:underline cursor-pointer">
                        {product.name}
                    </h3>
                </Link>
                <div className="mt-2 font-bold text-primary">
                    ${product.price.toFixed(2)}
                </div>
            </CardContent>
        </Card>
    );
}
