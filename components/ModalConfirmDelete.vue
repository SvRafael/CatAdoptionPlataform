<script lang="ts" setup>

defineProps({
  modalShow: Boolean,
})

const emit = defineEmits(['closeModal', 'confirmDelete']);

const handlerCloseModalClick = () => {
    emit('closeModal');
}
const handleConfirmDeleteClick = () => {
    emit('confirmDelete');
}

</script>

<template>
    <div 
        v-if="modalShow" 
        id="sucess-modal" 
        tabindex="-1" 
        aria-hidden="true" 
        class="flex flex-row items-center justify-center mx-auto overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 max-h-full bg-gray-800 bg-opacity-75"
    >
        <div class="relative p-4 w-full max-w-[18rem] max-h-full">
            <div class="relative bg-white rounded-xl stroke">
                <div class="flex flex-col items-center gap-4 md:p-5">
                    <button 
                        type="button" 
                        class="bg-red-100 rounded-lg w-10 h-10 inline-flex justify-center items-center"
                    >
                        <Icon 
                            name="mdi:trash" 
                            class="text-danger size-5"
                        />
                    </button>
                    <h3 class="text-[16px] font-semibold text-primary">
                        Are you sure?
                    </h3>
                    <p class="text-primaty text-[14px]">
                        Are you sure want to delete this cat profile? This action cannot be undone.
                    </p>
                </div>
                <div class="p-4">
                    <div class="flex flex-row justify-between gap-2 w-full">
                            <button 
                                @click="handlerCloseModalClick" 
                                class="w-full stroke bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-md text-[14px] px-5 py-2.5 text-center"
                            >
                                Cancel
                            </button>
                            <button 
                                @click="handleConfirmDeleteClick"
                                type="submit" 
                                class="w-full stroke-main-color text-white danger hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-md text-[14px] px-5 py-2.5 text-center"
                            >
                                Delete
                            </button>
                        </div>
                </div>
            </div>
        </div>
    </div> 
</template>