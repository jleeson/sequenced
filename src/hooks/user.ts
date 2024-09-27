import { Preferences } from "@capacitor/preferences";
import { useQuery } from "@tanstack/react-query";

const SERVER_IP = "https://localhost:8080";

export async function getUser() {
    const { value } = await Preferences.get({ key: "token" });
    return value ? JSON.parse(value) : {};
}

export function useUser() {
    return useQuery({
        queryKey: ["token"],
        queryFn: getUser,
        staleTime: 1000 * 60 * 60 * 24 * 7
    });
}