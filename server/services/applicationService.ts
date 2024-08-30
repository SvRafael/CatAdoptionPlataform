import { PrismaClient } from "@prisma/client"
import { AdoptionApplication } from "../types/application"

const prisma = new PrismaClient

export const createAdoptApplication = async (application : AdoptionApplication): Promise<AdoptionApplication | undefined> => {
    const createdApplication = await prisma.application.create({
        data: application,
    });

    if(createdApplication){
        return createdApplication;
    }

    return undefined;
};