"use server";
import prisma from "../../lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const addres = await prisma.address.findFirst({
      where: { userId },
    });
    if (!addres) return null;

    const { countriesId, address2, ...rest } = addres;

    return {
      ...rest,
      country: countriesId,
      address2: address2 ? address2 : "",
      city: "Comayagua",
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
