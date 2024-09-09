'use client'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/components/TopProgressBar.css"
import { useEffect } from "react";
NProgress.configure({ showSpinner: false });
const useTopLoader = ({ loading = false }) => {
    const start = () => NProgress.start();
    const stop = () => NProgress.done();
    useEffect(() => {
        if (loading == true) {
            start()
        }
        else if (loading == false) {
            stop()
        }
    }, [loading])
    return {
        start,
        stop
    };
}
export default useTopLoader;
