<script setup lang="ts">
const { getCats, deleteCat } = useCat();
const catStore = useCatStore();

interface Cat {
    id: number;
    name: string;
    description: string;
    image: string;
}

const showNewCatModal = ref<boolean>(false);
const showConfirmDeleteModal = ref<boolean>(false);
const selectedCatId = ref<number>(0);
const modalType = ref<string>('create'||'edit');

const handleNewCatClick = () => {
    showNewCatModal.value = true;
    modalType.value = 'create';
}

const handleEditCatClick = (cat:Cat) => {
    selectedCatId.value = cat.id;
    showNewCatModal.value = true;
    modalType.value = 'edit';
}

const handleDeleteCatClick = (cat:Cat) => {
    selectedCatId.value = cat.id;
    showConfirmDeleteModal.value = true;
}

const confirmDeleteCat = async () => {
    await deleteCat(selectedCatId.value);
    await getCats();
    showConfirmDeleteModal.value = false;
    selectedCatId.value = 0
}

onMounted(async () => {
    await getCats()
})


</script>
<template>
    <div class="flex flex-row w-full h-full">
        <div class="flex flex-col w-2/12 stroke">
            <HeaderPage class="justify-center"/>
            <div class="pt-12">
                <span class="px-10 text-[14px] text-secondary font-semibold">MAIN MENU</span>
                <ul class="py-8 px-8">
                    <li class="flex flex-row gap-6 text-main cursor-pointer hover:bg-[#4E2096] py-1.5 px-2 hover:rounded-lg hover:text-white">
                        <Icon name="solar:cat-bold" class="size-6"/>
                        <span class="text-[16px] font font-semibold">Cat list</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex flex-col w-10/12 pt-8 px-8 bg-slate-100 bg-opacity-70">
            <div class="flex flex-row justify-between">
                <div class="flex flex-row items-center gap-4">
                    <label class="flex items-center bg-blue-100 px-3 py-2.5 rounded-lg">
                        <Icon name="solar:cat-bold" class="text-main size-9"/>
                    </label>
                    <h1 class="text-[24px] text-primary font-semibold">Cat List</h1>
                </div>
                <button 
                    @click="handleNewCatClick"
                    class="stroke-main-color text-white bg-main-color hover:bg-violet-950 focus:ring-4 focus:outline-none font-medium rounded-md text-[14px] px-5 text-center"
                >
                    New Cat
                </button>
            </div>
            <div v-if="catStore.getCats.length > 0" class="mt-8 stroke rounded-lg bg-white px-4">
                <table class="min-w-full ">
                    <thead class="text-main text-[14px]">
                        <tr class="px-4 py-4">
                            <th class="text-start py-2 px-4">Image</th>
                            <th class="text-start py-2 px-4">Name</th>
                            <th class="text-start py-2 px-4">Description</th>
                            <th class="text-end py-6 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cat in catStore.getCats as Cat[]" class="text-[14px] text-secondary border-t-2 border-t-[#DFE4E8]">
                            <td class="text-start py-6 px-4">
                                <div class="h-[3rem] w-[3rem] rounded-full">
                                    <img
                                        :src="cat.image"
                                        class="h-full w-full rounded-full"
                                        alt=""
                                    />
                                </div>
                            </td>
                            <td class="text-start py-6 px-4 ">{{ cat.name }}</td>
                            <td class="text-start py-6 px-4 ">{{ cat.description }}</td>
                            <td class="flex items-end justify-end py-6 px-4">
                                <button @click="handleEditCatClick(cat)" class="flex justify-center bg-blue-100 text-primary py-2 px-3 rounded hover:bg-[#4E2096] hover:text-white">
                                    <Icon name="mdi:pencil" class="size-5"/>
                                </button>
                                <button @click="handleDeleteCatClick(cat)" class="flex justify-center bg-red-100 text-danger hover:text-white py-2 px-3 rounded hover:bg-red-600 ml-2">
                                    <Icon name="mdi:trash" class="size-5"/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <ModalNewCat v-if="showNewCatModal" :type="modalType" :editingCatId="selectedCatId" @close-modal="showNewCatModal = false, selectedCatId = 0" :modalShow="showNewCatModal"/>
        <ModalConfirmDelete @confirm-delete="confirmDeleteCat" @close-modal="showConfirmDeleteModal = false" :modalShow="showConfirmDeleteModal"/>
    </div>
</template>