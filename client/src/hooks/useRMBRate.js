import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function useRMBRate() {
    const [rate, setRate] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/api/rate/rmb`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.rate) {
                    setRate(data.rate);
                }
            })
            .catch(() => console.warn("Failed to fetch RMB rate"));
    }, []);

    return rate; 
}
