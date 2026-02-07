"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { UserColumn, columns } from "./columns"; // We will create this
import { DataTable } from "@/components/ui/data-table";

interface UsersClientProps {
    data: UserColumn[];
}

export const UsersClient: React.FC<UsersClientProps> = ({
    data
}) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Users (${data.length})`}
                    description="Manage users for your store"
                />
            </div>
            <Separator />
            <DataTable searchKey="email" columns={columns} data={data} />
        </>
    );
};
