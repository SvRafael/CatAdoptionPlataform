import type { Cat } from "@prisma/client";

export function useCat() {
    
const catStore = useCatStore();
const data = ref<any[]>([]);
const error = ref<string | null>(null);
const loading = ref(true);

const getCats = async () => {
    try {
        const data = await $fetch<Cat[]>('https://cat-adoption-plataform.vercel.app/api/v1/cats')
        catStore.addCats(data || []);
    } catch (err) {
        error.value = 'Erro ao buscar dados';
    } finally {
        loading.value = false;
    }
};

const createCat = async ({name, description, image}: Cat) => {
    const createdCat = await $fetch<Cat>('https://cat-adoption-plataform.vercel.app/api/v1/cats', {
        method: 'POST',
        body: {
            name: name,
            description: description,
            image: image
        }
    })
    catStore.addCats([...catStore.getCats, createdCat] as Cat[]);
}

const editCat = async ({id, name, description, image}: Cat) => {
    await $fetch<Cat>('https://cat-adoption-plataform.vercel.app/api/v1/cats/'+id, {
        method: 'PUT',
        body: {
            id: id,
            name: name,
            description: description,
            image: image
        }
    })
}

const deleteCat = async (id: number) => {
    await $fetch('https://cat-adoption-plataform.vercel.app/api/v1/cats/'+id, {
        method: 'DELETE',
    });
}

const getCatById = async (id: number) => {
    const data = await $fetch<Cat[]>('https://cat-adoption-plataform.vercel.app/api/v1/cats/'+id)
    catStore.addCat(data);
}

return {
    getCats,
    createCat,
    editCat,
    deleteCat,
    getCatById
};
}