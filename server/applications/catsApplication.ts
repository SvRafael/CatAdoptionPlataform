import { H3Event } from 'h3';
import * as service from '../services/catsService';
import { Cat } from '@prisma/client';

export const getAllCats = async (event: H3Event): Promise<Cat[] | string> => {
    const cats = await service.getAllCats()
    if(!cats.length){
        setResponseStatus(event, 404);
        return "There are no registered cats.";
    }
    setResponseStatus(event, 200);
    return cats
};

export const createCat = async (event: H3Event) : Promise <Cat | string | undefined> => {
    const body = await readBody<Cat>(event);
    const createdCat = await service.createCat(body);
    if(!createCat){
        setResponseStatus(event, 500);
        return 'Error when registering cat.';
    }
    setResponseStatus(event, 200);
    return createdCat;
}

export const editCat = async (event: H3Event) : Promise <Cat | boolean | string> => {
    const catId = getRouterParam(event, "id") || "";
    const body = await readBody<Cat>(event);

    if (+catId < 0) {
      throw createError({
        status: 400,
        message: "The cat id is invalid.",
        statusMessage: "Erro Id",
        data: {
          message: "Invalid cat.",
        },
      });
    }
  
    const cat = await service.getCatById(+catId);

    if (!cat) {
      setResponseStatus(event, 404);
      return "Cat is not found";
    }

    const editedCat = await service.editCat(body);
    if (!editedCat) {
        setResponseStatus(event, 500);
        return "Error when editing cat.";
    }

    setResponseStatus(event, 200);
    return "Cat sucessfully edited";
}

export const deleteCat = async (event: H3Event): Promise<string> => {
    const catId = getRouterParam(event, "id") || "";
  
    if (+catId < 0) {
        throw createError({
            status: 400,
            message: "The cat id is invalid.",
            statusMessage: "Erro Id",
            data: {
              message: "Invalid cat.",
            },
        });
    }
  
    const cat = await service.getCatById(+catId);

    if (!cat) {
      setResponseStatus(event, 404);
      return "Cat is not found.";
    }
  
    const deletedCat = await service.deleteCat(+catId);
  
    if (!deletedCat) {
      setResponseStatus(event, 500);
      return "Error when deleting cat";
    }
  
    setResponseStatus(event, 200);
    return "Cat successfully deleted.";
  };