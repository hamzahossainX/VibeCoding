import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    const products = [
        {
            name: "Minimalist Leather Backpack",
            description: "Handcrafted from genuine full-grain leather. Features a dedicated laptop compartment and sleek design perfect for urban commuters.",
            price: 129.99,
            images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800"],
            category: "Bags",
            sizes: ["One Size"],
            colors: ["#333333", "#8B4513"],
            stock: 50,
            isFeatured: true
        },
        {
            name: "Premium Cotton T-Shirt",
            description: "Made from 100% organic cotton. Ultra-soft feel with a modern fit that stays true wash after wash.",
            price: 29.99,
            images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"],
            category: "Apparel",
            sizes: ["S", "M", "L", "XL"],
            colors: ["#FFFFFF", "#000000", "#1A1A1A"],
            stock: 100,
            isFeatured: true
        },
        {
            name: "Wireless Noise-Cancelling Headphones",
            description: "Immerse yourself in high-fidelity audio. Features active noise cancellation, 30-hour battery life, and plush ear cushions.",
            price: 249.99,
            images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"],
            category: "Electronics",
            sizes: ["One Size"],
            colors: ["#000000", "#C0C0C0"],
            stock: 30,
            isFeatured: true
        },
        {
            name: "Ceramic Coffee Mug Set",
            description: "Minimalist ceramic mugs with a matte finish. Perfect for your morning brew. Microwave and dishwasher safe.",
            price: 34.99,
            images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800"],
            category: "Home",
            sizes: ["Standard"],
            colors: ["#F5F5F5", "#333333"],
            stock: 75,
            isFeatured: true
        },
        {
            name: "Mechanical Keyboard",
            description: "Tactile switches for the ultimate typing experience. RGB backlighting and durable aluminum frame.",
            price: 149.99,
            images: ["https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&q=80&w=800"],
            category: "Electronics",
            sizes: ["Full", "TKL"],
            colors: ["#000000", "#FFFFFF"],
            stock: 20,
            isFeatured: false
        },
        {
            name: "Sustainable Water Bottle",
            description: "Double-wall violet insulation keeps drinks cold for 24 hours. Made from recycled stainless steel.",
            price: 24.99,
            images: ["https://images.unsplash.com/photo-1602143407151-0111419500be?auto=format&fit=crop&q=80&w=800"],
            category: "Accessories",
            sizes: ["500ml", "750ml"],
            colors: ["#4169E1", "#FF6347"],
            stock: 100,
            isFeatured: false
        }
    ]

    for (const p of products) {
        await prisma.product.create({
            data: p
        })
    }

    console.log('Seeding finished.')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
