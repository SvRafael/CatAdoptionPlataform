<script lang="ts" setup>
  const catStore = useCatStore();
  const showSucessModal = ref<boolean>(false);
  const showFormAdoption = ref<boolean>(false);
  const { getCats } = useCat();
  
const selectedCatId = ref<number>(0);

const adoptCatClick = (catId:number) => {
  showFormAdoption.value = true
  selectedCatId.value = catId
}

const openSucessModal = () => {
    showSucessModal.value = true;
}

onMounted(() => {
    getCats()
})
</script>

<template>
  <div class="bg-white h-full w-full px-72 pb-24">
    <HeaderPage />
    <div class="py-12 ">
      <h1 class="text-[32px] text-main font-semibold">Cats for adoption</h1>
      <p class="font-medium text-secondaty text-[16px] mt-2">Explore our list of lovable cats looking for their forever homes.</p>
    </div>
    <main class="grid grid-cols-4 gap-x-2 gap-y-8">
      <div v-for="cat in catStore.getCats">
        <CatCard :catProps="cat" @adopt-cat-click="adoptCatClick"/>
      </div>
    </main>
    <SucessModal 
        :modalShow="showSucessModal"
        @close-modal="showSucessModal = false"
    />
    <FormAdoption
        @created-sucessfully="openSucessModal"
        @close-modal="showFormAdoption = false, selectedCatId =  0" 
        :catId="selectedCatId" 
        :modalShow="showFormAdoption"
    />
  </div>
</template>
