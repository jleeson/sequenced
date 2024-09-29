import { Preferences } from "@capacitor/preferences";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SERVER_IP } from "./app";

export async function getToken() {
    const { value } = await Preferences.get({ key: "token" });
    return value ?? null;
}

export async function getUser() {

    const token = await getToken();

    if (!token) return null;

    let user = await fetch(`${SERVER_IP}/user`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    user = await user.json();

    if (user)
        return user;

    return null;
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