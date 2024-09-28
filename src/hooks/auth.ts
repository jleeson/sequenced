import { useMutation } from "@tanstack/react-query";
import { reloadUser } from "./user";
import { Preferences } from "@capacitor/preferences";

export function useLogin() {
    return useMutation({
        mutationFn: async (body: { email: string, password: string }) => {
            const response = await fetch(`http://localhost:8080/auth/login`, {
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
            const response = await fetch(`http://localhost:8080/auth/register`, {
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