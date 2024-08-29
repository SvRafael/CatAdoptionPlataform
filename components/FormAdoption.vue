
<script lang="ts" setup>

defineProps({
  modalShow: Boolean,
})

const emit = defineEmits(['closeModal']);

const handlerCloseModalClick = () => {
    emit('closeModal');
}

</script>
<template>
    <div v-if="modalShow" id="adoption-modal" tabindex="-1" aria-hidden="true" class="flex flex-row items-center justify-center mx-auto overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 max-h-full bg-gray-800 bg-opacity-75">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg stroke">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 class="text-xl font-semibold text-primary">
                        Adoption Form
                    </h3>
                    <button @click="handlerCloseModalClick" type="button" class="bg-red-200 hover:bg-red-300 rounded-full w-8 h-8 ms-auto inline-flex justify-center items-center">
                        <Icon name="mingcute:close-line" class="text-danger size-5"/>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-4 md:p-5">
                    <form class="space-y-4" action="#">
                        <div class="flex flex-col gap-2">
                            <label 
                                for="email" 
                                class="text-[14px] font-semibold text-main"
                            >
                                Full Name
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                                placeholder="Enter your full name" 
                                required 
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label 
                                for="email" 
                                class="text-[14px] font-semibold text-main"
                            >
                                Email
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                                placeholder="Enter your email" 
                                required 
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label 
                                for="telephone" 
                                class="text-[14px] font-semibold text-main"
                            >
                                Telephone
                            </label>
                            <input 
                                type="number" 
                                name="telephone" 
                                id="telephone" 
                                class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                                placeholder="Enter your telephone" 
                                required 
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label 
                                for="about" 
                                class="text-[14px] font-semibold text-main"
                            >
                                Why would you want to adopt this cat?
                            </label>
                            <textarea
                                type="text" 
                                name="about" 
                                id="about" 
                                class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                                placeholder="White here..." 
                                required 
                            />
                        </div>
                        <div class="flex justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="iagree" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3" required />
                                </div>
                                <label for="iagree" class="ms-2 text-[14px] font-medium text-secondary">I agree to take care of this cat</label>
                            </div>
                        </div>
                        <div class="flex flex-row justify-end gap-4">
                            <button @click="handlerCloseModalClick" class="stroke bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-md text-[14px] px-5 py-2.5 text-center">
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                class="stroke-main-color text-white bg-main-color hover:bg-violet-950 focus:ring-4 focus:outline-none font-medium rounded-md text-[14px] px-5 py-2.5 text-center"
                            >
                                Submit application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
</template>