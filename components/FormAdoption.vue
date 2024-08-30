
<script lang="ts" setup>
import { formSchema } from '../schemas/adoptionFormSchema';
import type { ZodErrors } from '../types/zodErrors';
import { formatZodErrors } from '../utils/formatZodErrors'

const props = defineProps({
  modalShow: Boolean,
  catId: {
    type: Number,
    required: true
  }
})

const { createAdoption } = useAdoption()
const emits = defineEmits(['closeModal', 'createdSucessfully']);

const errors = ref<ZodErrors>({});

const adoptionForm = ref({
    name: '',
    email: '',
    telephone: '',
    more: '',
    agree: false
})

const validateForm = () => {
    const result = formSchema.safeParse(adoptionForm.value);

    if (!result.success) {
      errors.value = formatZodErrors(result.error.format());
      return false;
    }

    errors.value = {};
    return true;
};

const handleSubmit = () => {
    if(validateForm()){
        createAdoption({
            id: 0, 
            name: adoptionForm.value.name, 
            email: adoptionForm.value.email, 
            telephone: adoptionForm.value.telephone, 
            more: adoptionForm.value.more,
            agree: adoptionForm.value.agree,
            catId: props.catId
        });
        handlerCloseModalClick();
        resetForm();
        emits('createdSucessfully');
    }
}

const resetForm = () => {
    adoptionForm.value = {
        name: '',
        email: '',
        telephone: '',
        more: '',
        agree: false
    }
}

const handlerCloseModalClick = () => {
    emits('closeModal');
}

</script>
<template>
    <div v-if="props.modalShow" id="adoption-modal" tabindex="-1" aria-hidden="true" class="flex flex-row items-center justify-center mx-auto overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 max-h-full bg-gray-800 bg-opacity-75">
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
                    <form class="space-y-4" @submit.prevent="handleSubmit">
                        <div class="flex flex-col gap-2">
                            <label 
                                for="email" 
                                class="text-[14px] font-semibold text-main"
                            >
                                Full Name
                            </label>
                            <input
                                v-model="adoptionForm.name"
                                type="text" 
                                name="name" 
                                id="name" 
                                class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                                placeholder="Enter your full name" 
                            />
                            <span class="text-[12px] text-red-500" v-if="errors.name">
                                {{ Object.values(errors.name)[0] }}
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label 
                                for="email" 
                                class="text-[14px] font-semibold text-main"
                            >
                                Email
                            </label>
                            <input
                                v-model="adoptionForm.email"
                                type="email" 
                                name="email" 
                                id="email" 
                                class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                                placeholder="Enter your email" 
                            />
                            <span class="text-[12px] text-red-500" v-if="errors.email">
                                {{ Object.values(errors.email)[0] }}
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label 
                                for="telephone" 
                                class="text-[14px] font-semibold text-main"
                            >
                                Telephone
                            </label>
                            <input
                                v-model="adoptionForm.telephone"
                                type="string" 
                                name="telephone" 
                                id="telephone" 
                                class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                                placeholder="Enter your telephone"  
                            />
                            <span class="text-[12px] text-red-500" v-if="errors.telephone">
                                {{ Object.values(errors.telephone)[0] }}
                            </span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label
                                for="about" 
                                class="text-[14px] font-semibold text-main"
                            >
                                Why would you want to adopt this cat?
                            </label>
                            <textarea
                                v-model="adoptionForm.more"
                                type="text" 
                                name="about" 
                                id="about" 
                                class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                                placeholder="White here..." 
                            />
                            <span class="text-[12px] text-red-500" v-if="errors.more">
                                {{ Object.values(errors.more)[0] }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="iagree" type="checkbox" v-model="adoptionForm.agree" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3" />
                                </div>
                                <label for="iagree" class="ms-2 text-[14px] font-medium text-secondary">I agree to take care of this cat</label>
                            </div>
                        </div>
                        <span class="text-[12px] text-red-500" v-if="errors.agree">
                            {{ Object.values(errors.agree)[0] }}
                        </span>
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