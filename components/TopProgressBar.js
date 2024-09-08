"use client";

import { useEffect, useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./TopProgressBar.css";

// Configure NProgress
NProgress.configure({ showSpinner: false });

let timer;
let state;
let activeRequests = 0;
const delay = 10;

function load() {
    if (state === "loading") {
        return;
    }

    state = "loading";

    timer = setTimeout(function () {
        NProgress.start();
    }, delay); // Only show progress bar if it takes longer than the delay
}

function stop() {
    if (activeRequests > 0) {
        return;
    }

    state = "stop";

    clearTimeout(timer);
    NProgress.done();
}

export default function TopProgressBar() {
    useEffect(() => {
        // Set up route change events
        Router.events.on("routeChangeStart", load);
        Router.events.on("routeChangeComplete", stop);
        Router.events.on("routeChangeError", stop);

        // Ensure the cleanup of route change events
        return () => {
            Router.events.off("routeChangeStart", load);
            Router.events.off("routeChangeComplete", stop);
            Router.events.off("routeChangeError", stop);
        };
    }, []);

    useEffect(() => {
        // Client-side fetch override
        if (typeof window !== "undefined") {
            const originalFetch = window?.fetch;

            window.fetch = async function (...args) {
                if (activeRequests === 0) {
                    load();
                }

                activeRequests++;

                try {
                    const response = await originalFetch(...args);
                    return response;
                } catch (error) {
                    return Promise.reject(error);
                } finally {
                    activeRequests -= 1;
                    if (activeRequests === 0) {
                        stop();
                    }
                }
            };

            // Cleanup fetch override on unmount
            return () => {
                window.fetch = originalFetch;
            };
        }
    }, []);

    return null;
}
