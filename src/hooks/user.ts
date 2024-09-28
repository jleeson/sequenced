import { Preferences } from "@capacitor/preferences";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export async function getToken() {
    const { value } = await Preferences.get({ key: "token" });
    return value ?? null;
}

export async function getUser() {

    const token = await getToken();

    const user = await (await fetch(`http://localhost:8080/user`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })).json();

    if (user)
        return user;

    return {};
}

export function useToken() {
    return useQuery({
        queryKey: ["token"],
        queryFn: getToken,
        staleTime: Infinity
    });
}

export function useUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        staleTime: Infinity
    });
}

export function reloadUser() {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ["user"] });
}

export function reloadToken() {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ["token"] });
}