import { db } from "@/lib/db";
import { UsersClient } from "./client"; // We will create this
import { format } from "date-fns";
import { UserColumn } from "./columns"; // We will create this

export default async function UsersPage() {
    const users = await db.user.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedUsers: UserColumn[] = users.map((item) => ({
        id: item.id,
        name: item.name || "N/A",
        email: item.email || "N/A",
        role: item.role,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <UsersClient data={formattedUsers} />
            </div>
        </div>
    );
}
