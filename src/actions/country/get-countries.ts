"use server"
import prisma from '../../lib/prisma';


export const getCountries=async()=>{
    try {
        const obtenerPaiese= await prisma.countries.findMany({
            orderBy:{
                name:'asc'
            }
        })
        return obtenerPaiese
    } catch (error) {
        console.log(error);
        return []
    }
}