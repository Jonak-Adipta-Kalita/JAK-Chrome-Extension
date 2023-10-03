import { useReducer } from "react";

import "./style.css";

function IndexPopup() {
    const [count, increase] = useReducer((c) => c + 1, 0);

    return (
        <button
            onClick={() => increase()}
            type="button"
            className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Count:
            <span className="ml-2 inline-flex h-4 w-8 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800">
                {count}
            </span>
        </button>
    );
}

export default IndexPopup;
