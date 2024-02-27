"use server";
import { Address } from "@/interfaces";
import prisma from "../../lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = createOrReplaceAddress(address, userId);
    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo guardar la direccion",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.address.findUnique({
      where: {
        userId: userId,
      },
    });

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      firstName: address.firstName,
      lastName: address.lastName,
      countriesId: address.country,
      postalCode: address.postalCode,
      city: address.city,
      phone: address.phone,
    };

    if (!storeAddress) {
      const newAddres = await prisma.address.create({
        data: addressToSave,
      });
      return newAddres;
    }

    const updateAddress = await prisma.address.update({
      where: { userId },
      data: addressToSave,
    });

    return updateAddress;
  } catch (error) {
    console.log(error);

    throw new Error("No se pudo guardar la direccion");
  }
};
