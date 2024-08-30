
<script lang="ts" setup>
import type { Cat } from '@prisma/client';


const props = defineProps({
    modalShow: Boolean,
    type: {
        type: String,
        required: true
    },
    editingCatId: {
        type: Number,
        required: false
    }
})

const emit = defineEmits(['closeModal']);
const catStore = useCatStore()
const { createCat, getCatById, editCat, getCats } = useCat();

const name = ref<string>('');
const image = ref<string>('');
const description = ref<string>('');

const handlerCloseModalClick = () => {
    emit('closeModal');
}

const handleSubmit = async function() {
    if(props.type == 'create'){
        await createCat({'id': null,'name': name.value, 'description': description.value, 'image': image.value});
    }else{
        await editCat({'id': props.editingCatId || null,'name': name.value, 'description': description.value, 'image': image.value});
    }
    handlerCloseModalClick();
    catStore.$reset();
    getCats();
}

onMounted(async () => {
    if(props.type == 'edit'){
        if(props.editingCatId){
            await getCatById(props.editingCatId)
            const editingCat = catStore.getCat as Cat;
            name.value = editingCat.name;
            description.value = editingCat.description;
            image.value = editingCat.image;
        }
    }
})

const modalName =  computed(() => {
  return props.type == 'create' ? 'Register New Cat' : 'Edit Cat';
})

</script>
<template>
    <div v-if="props.modalShow" id="adoption-modal" tabindex="-1" aria-hidden="true" class="flex flex-row items-center justify-center mx-auto overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 max-h-full bg-gray-800 bg-opacity-75">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg stroke">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 class="text-xl font-semibold text-primary">
                        {{ modalName }}
                    </h3>
                    <button @click="handlerCloseModalClick" type="button" class="bg-red-200 hover:bg-red-300 rounded-full w-8 h-8 ms-auto inline-flex justify-center items-center">
                        <Icon name="mingcute:close-line" class="text-danger size-5"/>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-4 md:p-5">
                    <form class="space-y-4"  @submit.prevent="handleSubmit">
                        <div class="flex flex-col gap-2">
                            <label 
                                for="image" 
                                class="text-[14px] font-semibold text-main"
                            >
                                Image
                            </label>
                            <input 
                                v-model="image"
                                type="text" 
                                name="image" 
                                id="image" 
                                class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                                placeholder="URL" 
                                required 
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label 
                                for="name" 
                                class="text-[14px] font-semibold text-main"
                            >
                                Name
                            </label>
                            <input 
                                v-model="name"
                                type="text" 
                                name="name" 
                                id="name" 
                                class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                                placeholder="Enter the cat's name" 
                                required 
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label 
                                for="description" 
                                class="text-[14px] font-semibold text-main"
                            >
                                Description
                            </label>
                            <textarea
                                v-model="description"
                                type="text" 
                                name="description" 
                                id="description" 
                                class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                                placeholder="White here..." 
                                required 
                            />
                        </div>
                        <div class="flex flex-row justify-end gap-4">
                            <button 
                                @click="handlerCloseModalClick" 
                                class="stroke bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-md text-[14px] px-5 py-2.5 text-center"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                class="stroke-main-color text-white bg-main-color hover:bg-violet-950 focus:ring-4 focus:outline-none font-medium rounded-md text-[14px] px-5 py-2.5 text-center"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
</template>