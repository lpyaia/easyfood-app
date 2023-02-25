import { useState } from "react";

export default function useAppRefresh() {
    const [appRefreshFlag, setAppRefresh] = useState(false);

    const appRefresh = (shouldRefresh) => {
        setAppRefresh(shouldRefresh);
    };

    return { setAppRefresh: appRefresh, appRefreshFlag };
}
