<script lang="ts" setup>

defineProps({
  modalShow: Boolean,
})

</script>

<template>
    <div v-if="modalShow" id="sucess-modal" tabindex="-1" aria-hidden="true" class="flex flex-row items-center justify-center mx-auto overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 max-h-full bg-gray-800 bg-opacity-75">
        <div class="relative p-4 w-full max-w-[18rem] max-h-full">
            <div class="relative bg-white rounded-xl stroke">
                <div class="flex flex-col items-center gap-4 md:p-5">
                    <button type="button" class="bg-green-100 hover:bg-green-200 rounded-lg w-10 h-10 inline-flex justify-center items-center">
                        <Icon name="ic:round-check" class="text-sucess size-5"/>
                    </button>
                    <h3 class="text-[16px] font-semibold text-primary">
                        Application Submitted!
                    </h3>
                    <p class="text-primaty text-[14px]">
                        Thank you for submitting your adoption application! Our team will review your application and get back to you shortly.
                    </p>
                </div>
                <div class="p-4 md:p-5">
                    <div class="flex flex-row justify-end gap-4">
                        <button 
                            type="submit" 
                            class="stroke-main-color w-full text-white bg-main-color hover:bg-violet-950 focus:ring-4 focus:outline-none font-medium rounded-md text-[14px] px-5 py-2.5 text-center"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>