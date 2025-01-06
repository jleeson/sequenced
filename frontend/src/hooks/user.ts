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

export async function updateName(first: string, last: string) {
    const token = await getToken();

    if (!token) return null;

    let user = await fetch(`${SERVER_IP}/user/name`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            first,
            last
        })
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

export function reloadUser(queryClient) {
    queryClient.invalidateQueries({ queryKey: ["user"] });
}

export function reloadToken(queryClient) {
    queryClient.invalidateQueries({ queryKey: ["token"] });
}