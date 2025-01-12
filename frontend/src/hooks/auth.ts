import { useMutation, useQuery } from "@tanstack/react-query";
import { reloadUser } from "./user";
import { queryClient } from "..";
import { fetchData } from "@/utils/data";

export async function checkAuth(res: Response) {
    if (res.status == 401) {
        if (!window.location.pathname.startsWith("/auth")) window.location.href = "/auth";
    }
}

export async function getAuth() {
    return await (await fetchData("/auth", {})).json();
}

export function useAuth() {
    return useQuery({
        queryKey: ['auth'],
        queryFn: getAuth,
        staleTime: 1000 * 60 * 60 * 30
    });
}

export function useLogin() {
    return useMutation({
        mutationFn: async (body: { email: string, password: string }) => {
            const response = await fetchData("/auth/login", {
                method: "POST",
                body
            });

            if (response.ok) reloadUser(queryClient);
        }
    })
}

export function useRegister() {
    return useMutation({
        mutationFn: async (body: { email: string, password: string, confirm_password: string }) => {
            const response = await fetchData("/", {
                method: "POST",
                body
            });

            const data = await response.json();

            if (data.type == "ERROR") {
                return data.message;
            }

            reloadUser(queryClient);

            return data;
        }
    })
}

export async function signout() {
    queryClient.invalidateQueries({ queryKey: ["auth"] });
    queryClient.invalidateQueries({ queryKey: ["user"] });

    console.log("User Signed Out");
}