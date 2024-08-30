import { H3Event } from 'h3';
import * as service from '../services/applicationService';
import { Application } from '@prisma/client';

export const createAdoptApplication = async (event: H3Event) : Promise <Application | string | undefined> => {
    const body = await readBody<Application>(event);
    const createdApplication = await service.createAdoptApplication(body);
    if(!createdApplication){
        setResponseStatus(event, 500);
        return 'Error when registering cat.';
    }
    setResponseStatus(event, 200);
    return createdApplication;
}
