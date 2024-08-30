export function useCat() {
interface Cat {
    id: number | null;
    name: string;
    description: string;
    image: string;
}
const catStore = useCatStore();
const data = ref<any[]>([]);
const error = ref<string | null>(null);
const loading = ref(true);

const getCats = async () => {
    try {
        const data = await $fetch<Cat[]>('http://localhost:3000/api/v1/cats')
        catStore.addCats(data || []);
    } catch (err) {
        error.value = 'Erro ao buscar dados';
    } finally {
        loading.value = false;
    }
};

const createCat = async ({name, description, image}: Cat) => {
    const createdCat = await $fetch<Cat>('http://localhost:3000/api/v1/cats', {
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
    const editedCat = await $fetch<Cat>('http://localhost:3000/api/v1/cats/'+id, {
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
    await $fetch('http://localhost:3000/api/v1/cats/'+id, {
        method: 'DELETE',
    });
}

const getCatById = async (id: number) => {
    const data = await $fetch<Cat[]>('http://localhost:3000/api/v1/cats/'+id)
    console.log(data)
    catStore.addCat(data);
}


  return {
    getCats,
    createCat,
    editCat,
    deleteCat,
    getCatById,
    data,
    error,
    loading
  };
}