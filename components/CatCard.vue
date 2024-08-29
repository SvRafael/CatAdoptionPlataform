<script setup lang="ts">
const emit = defineEmits(['adoptCatClick'])

const handlerAdoptCat = () => {
    emit('adoptCatClick');
}
</script>

<template>
    <div class="max-w-[19rem] flex flex-col stroke rounded-xl p-6 space-y-4">
        <img 
            class="relative h-44 w-64 rounded-xl" 
            src="https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <h1 class="text-primary font-semibold text-[20px]">
            Max
        </h1>
        <p class="text-secondaty font-medium text-[14px]">
            Calm and quiet cat, e esse e o gato gatoso.
        </p>
        <button @click="handlerAdoptCat" class="text-center bg-main-color hover:bg-violet-950 rounded-lg py-3 text-white font-medium text-[14px]">
            Adopt
        </button>
    </div>
</template>