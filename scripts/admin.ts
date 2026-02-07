import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    const email = process.argv[2];

    if (!email) {
        console.error("Please provide an email address as an argument.");
        console.log("Usage: npx tsx scripts/admin.ts <email>");
        process.exit(1);
    }

    try {
        const user = await db.user.update({
            where: { email },
            data: { role: "ADMIN" },
        });
        console.log(`User ${email} has been updated to ADMIN role.`);
    } catch (error) {
        console.error(`Failed to update user: ${error}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
