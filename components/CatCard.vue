<script setup lang="ts">
const emit = defineEmits(['adoptCatClick'])

const props = defineProps({
  catProps: {
    type: Object,
    required: true
  }
})

const handlerAdoptCat = () => {
    emit('adoptCatClick', props.catProps.id);
}
</script>

<template>
    <div class="max-w-[19rem] h-[25rem] flex flex-col stroke rounded-xl p-6 space-y-4">
        <img 
            class="relative h-44 w-64 rounded-xl" 
            :src="props.catProps.image"
        />
        <h1 class="text-primary font-semibold text-[20px]">
            {{props.catProps.name}}
        </h1>
        <p class="text-secondaty font-medium text-[14px] h-[5rem]">
            {{props.catProps.description}}
        </p>
        <button @click="handlerAdoptCat" class="text-center bg-main-color hover:bg-violet-950 rounded-lg py-3 text-white font-medium text-[14px]">
            Adopt
        </button>
    </div>
</template>