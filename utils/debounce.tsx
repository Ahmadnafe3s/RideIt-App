import { useRef } from "react";

export const useDebounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number
) => {
    const timer = useRef(0);

    return (...args: Parameters<T>) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};
