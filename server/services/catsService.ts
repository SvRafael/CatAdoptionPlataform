import { PrismaClient } from "@prisma/client"
import { Cat } from "../types/cats"

const prisma = new PrismaClient

export const getAllCats = async (): Promise<Cat[]> => {
    return await prisma.cat.findMany();
};

export const getCatById = async (id: number): Promise<Cat | null> => {
    return await prisma.cat.findFirst({
      where: { id: id },
    });
};

export const createCat = async (cat: Cat): Promise<Cat | undefined> => {
    const createdCat = await prisma.cat.create({
        data: cat,
    });
    if(createdCat){
        return createdCat;
    }

    return undefined;
};

export const editCat = async (cat: Cat): Promise<boolean> => {
    const editedCat = await prisma.cat.update({
        where: { id: cat.id },
        data: cat,
    });

    return !!editedCat;
};

export const deleteCat = async (catId : number): Promise<boolean> => {
    const deletedCat = await prisma.cat.delete({
        where: { id: catId }
    });

    return !!deletedCat;
};