"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createProduct = async (data: any) => {
    await db.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            images: data.images,
            category: data.category,
            sizes: data.sizes,
            colors: data.colors,
            stock: data.stock,
            isFeatured: data.isFeatured,
        }
    });

    revalidatePath("/dashboard/products");
};

export const updateProduct = async (id: string, data: any) => {
    await db.product.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            images: data.images,
            category: data.category,
            sizes: data.sizes,
            colors: data.colors,
            stock: data.stock,
            isFeatured: data.isFeatured,
        }
    });

    revalidatePath("/dashboard/products");
    revalidatePath(`/dashboard/products/${id}`);
};

export const deleteProduct = async (id: string) => {
    await db.product.delete({
        where: { id }
    });

    revalidatePath("/dashboard/products");
};
