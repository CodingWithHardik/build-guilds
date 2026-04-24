import { AsyncLocalStorage } from "async_hooks";

export const requestDataStorage = new AsyncLocalStorage<{
    id: string,
    email: string,
    name?: string | null,
    role: string,
}>();