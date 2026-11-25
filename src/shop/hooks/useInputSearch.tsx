import { useRef } from "react";
import { useSearchParams } from "react-router";


export const useInputSearch = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);
    const query = searchParams.get('query') || '';

    const handleInputSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;

        const query = inputRef.current?.value.trim();

        setSearchParams((params) => {
            if (!query) {
                params.delete("query");
            } else {
                params.set("query", query);
            }

            return params;
        });
    };

    return {
        inputRef,
        query,
        handleInputSearch,
    };


}