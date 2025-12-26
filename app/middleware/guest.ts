/**
 * Guest middleware - redirects authenticated users away from auth pages
 */
export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn } = useUserSession();

  if (loggedIn.value) {
    return navigateTo("/reports");
  }
});

