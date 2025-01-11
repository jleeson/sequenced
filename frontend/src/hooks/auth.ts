import { useMutation } from "@tanstack/react-query";
import { reloadUser } from "./user";
import { Preferences } from "@capacitor/preferences";
import { queryClient } from "..";
import { fetchData } from "@/utils/data";

export async function checkAuth(res: Response) {
    if(res.status == 401){
        if(!window.location.pathname.startsWith("/auth")) window.location.href = "/auth";
    }
}

export function useLogin() {
    return useMutation({
        mutationFn: async (body: { email: string, password: string }) => {
            const response = await fetchData("/auth/login", {
                method: "POST",
                body
            });

            if(response.ok) reloadUser(queryClient);
        }
    })
}

export function useRegister() {
    return useMutation({
        mutationFn: async (body: { email: string, password: string, confirm_password: string }) => {
            const data = await fetchServer({
                path: "/auth/register",
                method: "POST",
                body,
                full: true
            });

            if (data.type == "ERROR") {
                return data.message;
            }

            await Preferences.set({ key: "token", value: data.token.token });

            console.log(`Token set to ${data.token.token}`);

            reloadUser(queryClient);

            return data;
        }
    })
}

export async function signout() {
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.invalidateQueries({ queryKey: ["token"] });

    await Preferences.remove({ key: "token" });

    console.log("User Signed Out");
}