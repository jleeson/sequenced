import { useMutation } from "@tanstack/react-query";
import { reloadUser } from "./user";
import { Preferences } from "@capacitor/preferences";
import { queryClient } from "..";
import { SERVER_IP } from "./app";

export function useLogin() {
    return useMutation({
        mutationFn: async (body: { email: string, password: string }) => {
            const response = await fetch(`${SERVER_IP}/auth/login`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            await Preferences.set({ key: "token", value: data.token.token });
            reloadUser();

            return data;
        }
    })
}

export function useRegister() {
    return useMutation({
        mutationFn: async (body: { email: string, password: string, confirm_password: string }) => {
            const response = await fetch(`${SERVER_IP}/auth/register`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            await Preferences.set({ key: "token", value: data.token.tokens });
            reloadUser();

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