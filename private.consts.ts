export const sessionConsts = {
    cookiesName:"session",
    cookiesMaxAge:(60 * 60 * 24)*1, // = 1days
};
export const loginRoute = "/login";
export const homeRoute ="/";
export const protectedRoutes = ["/"];;
export const authApi = "/api/authenticate"
