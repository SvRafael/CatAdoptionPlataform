import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useSupabaseUser } from '~/composables/useSupabase';

export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useSupabaseUser();
    if (!user) {
      return navigateTo('/login');
    }
});