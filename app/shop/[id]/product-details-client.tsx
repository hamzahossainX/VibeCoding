"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
    sizes: string[];
    colors: string[];
}

interface ProductDetailsClientProps {
    product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "");
    const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || "");

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
            size: selectedSize,
            color: selectedColor,
        });
    };

    return (
        <div className="space-y-6">
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Size</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={cn(
                                    "flex items-center justify-center min-w-[3rem] h-10 px-3 rounded-md border text-sm font-medium transition-colors",
                                    selectedSize === size
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                                )}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Color</h3>
                    <div className="flex flex-wrap gap-3">
                        {product.colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={cn(
                                    "relative h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                    selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                                )}
                                style={{ backgroundColor: color }}
                                title={color}
                            >
                                {selectedColor === color && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        {/* If the color is white/light, verify contrast. For simplicity assuming dark check for now or mix-blend-difference */}
                                        <Check className="h-4 w-4 text-white mix-blend-difference" />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Add to Cart Button */}
            <div className="pt-2">
                <Button
                    size="lg"
                    className="w-full md:w-auto min-w-[200px]"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
