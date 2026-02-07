import { db } from "../lib/db";

async function main() {
    console.log("Testing database connection...");
    try {
        await db.$connect();
        console.log("Successfully connected to the database!");

        const count = await db.user.count();
        console.log(`Current user count: ${count}`);

        console.log("Database connection test passed.");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    } finally {
        await db.$disconnect();
    }
}

main();
