<script setup lang="ts">
import { formSchema } from '../schemas/loginFormSchema';
import type { ZodErrors } from '../types/zodErrors';
import { formatZodErrors } from '../utils/formatZodErrors'
const { signIn } = useSupabaseUser();
const router = useRouter();

const loginForm = ref({
    name: '',
    password: '',
})

const loading = ref<boolean>(false);
const errors = ref<ZodErrors>({});
const errorMessage = ref<string>('')

const validateForm = () => {
    const result = formSchema.safeParse(loginForm.value);

    if (!result.success) {
      errors.value = formatZodErrors(result.error.format());
      return false;
    }

    errors.value = {};
    return true;
};

const redirectToPage = () => {
    router.push('/public');
};

const handleLogin = async () => {
    if(validateForm()){
        loading.value = true
        try {
            errorMessage.value = ''
            await signIn(loginForm.value.name, loginForm.value.password);
            loading.value = false
            return router.push('/Admin');
        } catch (error) {
            errorMessage.value = (error as Error).message;
            loading.value = false
        }
    }
};

</script>
<template>
    <div class="flex flex-row h-full w-full">
        <div class="flex flex-row  p-10">
            <div class="relative">
                <div class="text-[40px] font-semibold inset-0 mt-[3rem] m-auto w-max text-center text-white absolute bg-opacity-0 z-30">
                    <h1>Welcome to the Cat</h1>
                    <h1>Adoption Panel</h1>
                </div>
                <div class="rounded-2xl absolute inset-0 bg-main-color z-0"></div>
                <img class="w-full h-full z-10 filter brightness-200" src="../assets/Background.png"/>
                <div class="absolute top-0 flex items-bottom justify-center w-full h-full">
                    <img 
                        class="z-20" 
                        src="../assets/Cat.png" 
                    />
                </div>
            </div>
        </div>
        <div class="w-6/12 flex flex-col gap-3 items-center justify-center px-36">
            <HeaderPage />
            <div class="flex items-center justify-between w-full pt-2">
                <h1 class="text-[24px] font-semibold text-primary">
                    Login
                </h1>
            </div>
            <div class="w-full">
                <form  
                    @submit.prevent="handleLogin" 
                    class="space-y-4"
                >
                    <div class="flex flex-col gap-2">
                        <span 
                            v-if="errorMessage != ''" 
                            class="text-red-500"
                        >
                            {{ errorMessage }}
                        </span>
                        <label 
                            for="email" 
                            class="text-[14px] font-semibold text-main"
                        >
                            Username
                        </label>
                        <input
                            v-model="loginForm.name"
                            type="text" 
                            name="name" 
                            id="name" 
                            class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                            placeholder="Enter the user name" 
                        />
                        <span 
                            v-if="errors.name" 
                            class="text-[12px] text-red-500"
                        >
                            {{ Object.values(errors.name)[0] }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label 
                            for="email" 
                            class="text-[14px] font-semibold text-main"
                        >
                            Password
                        </label>
                        <input
                            v-model="loginForm.password"
                            type="password" 
                            name="password" 
                            id="password" 
                            class="bg-white stroke text-secondary text-sm rounded-md block w-full p-2.5" 
                            placeholder="Enter your password"  
                        />
                        <span 
                            v-if="errors.password" 
                            class="text-[12px] text-red-500"
                        >
                            {{ Object.values(errors.password)[0] }}
                        </span>
                    </div>
                    <div class="w-full flex flex-col gap-2">
                        <button
                            :disabled="loading"
                            type="submit" 
                            class="w-full disabled:cursor-not-allowed disabled:bg-opacity-70 stroke-main-color text-white bg-main-color hover:bg-violet-950 focus:ring-4 focus:outline-none font-medium rounded-md text-[14px] px-5 py-2.5 text-center"
                        >
                            Login
                        </button>
                        <button 
                            @click="redirectToPage"
                            class="w-full border border-purple-900 text-main bg-white hover:text-white hover:bg-violet-950 focus:ring-4 focus:outline-none font-medium rounded-md text-[14px] px-5 py-2.5 text-center"
                        >
                            I want to adopt a cat
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>