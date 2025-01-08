import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/data";

async function getUser(){
    const response = await fetchData("/user", {});
    return await response.json();
} 

export async function updateName(first: string, last: string) {
    await fetchData("/user/name", {
        method: "PATCH",
        body: {
            first, last
        }
    })
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