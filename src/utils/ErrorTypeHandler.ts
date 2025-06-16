import type { AxiosError } from "axios";

export const getError = (e: unknown): string => {
    const err = e as AxiosError;
    const { error } = err.response?.data as { error: string };
    return error;
}