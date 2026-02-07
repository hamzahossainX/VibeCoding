"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading"; // We might need to create this simple component
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns"; // We will create this
import { DataTable } from "@/components/ui/data-table"; // We need a data table component. Assuming shadcn data-table logic.

interface ProductsClientProps {
    data: ProductColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({
    data
}) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    description="Manage products for your store"
                />
                <Button onClick={() => router.push(`/dashboard/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};
