import type { Application } from "@prisma/client";

export function useAdoption() {
    const createAdoption = async ({name, email, telephone, more, agree, catId}: Application) => {
        await $fetch<Application>('https://cat-adoption-plataform.vercel.app/api/v1/cats/adoption', {
            method: 'POST',
            body: {
                name: name,
                email: email,
                telephone: telephone,
                more: more,
                agree: agree,
                catId: catId
            }
        })
    }

    return {
        createAdoption,
    };
}