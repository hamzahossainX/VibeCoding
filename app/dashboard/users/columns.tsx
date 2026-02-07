"use client"

import { ColumnDef } from "@tanstack/react-table"

export type UserColumn = {
    id: string
    name: string
    email: string
    role: string
    createdAt: string
}

export const columns: ColumnDef<UserColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
]
