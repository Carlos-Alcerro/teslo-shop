"use server"

/* import { Sleep } from "@/utils/sleep"; */

export const getStockBySlug=async(slug:string)=>{
    try {
        /* await Sleep(1) */
        const countStock = await prisma.product.findFirst({
            
            where:{
                slug:slug
            },
            select:{
                inStock:true
            }
        })
        return countStock?.inStock ?? 0;
    } catch (error) {
        console.log(error);
        return 0
    }
}