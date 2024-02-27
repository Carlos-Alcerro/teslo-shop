import { initialData } from './seed';
import prisma from '../lib/prisma';
import { countries } from './seed-countries';


async function main() {
    const countriesData = countries;
    await Promise.all([
        prisma.user.deleteMany(), // Llama a la función de eliminación
        prisma.countries.deleteMany(),
        prisma.productImage.deleteMany(), // Llama a la función de eliminación
        prisma.product.deleteMany(), // Llama a la función de eliminación
        prisma.category.deleteMany(), // Llama a la función de eliminación
    ]);

    const { categories, products, users } = initialData;

    await prisma.user.createMany({
        data: users
    })

    // Crear categorías
    const categoriesData = categories.map((name) => ({ name }));
    await prisma.category.createMany({
        data: categoriesData,
    });

    //crear paises
    await prisma.countries.createMany({
        data:countriesData
    })

    // Mapear nombres de categoría a IDs de categoría
    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);

    // Crear productos
    for (const product of products) {
        const { type, images, ...rest } = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type.toLowerCase()], // Usa minúsculas para consistencia
            },
        });

        // IMÁGENES
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }))
        await prisma.productImage.createMany({
            data: imagesData
        })
    }

}

(async () => {
    if (process.env.NODE_ENV === 'production') return;
    await main();
})();
