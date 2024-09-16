"use client";

import { useEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./TopProgressBar.css";

NProgress.configure({ showSpinner: false });
const delay = 100; // Adjusted delay for better UX

let timer;
let state;
let activeRequests = 0;

function load() {
  if (state === "loading") return;

  state = "loading";

  timer = setTimeout(() => {
    NProgress.start();
  }, delay);
}

function stop() {
  if (activeRequests > 0) return;

  state = "stop";

  clearTimeout(timer);
  NProgress.done();
}

const TopProgressBar = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Adding route change event listeners
      const handleRouteChangeStart = () => load();
      const handleRouteChangeEnd = () => stop();

      Router.events.on("routeChangeStart", handleRouteChangeStart);
      Router.events.on("routeChangeComplete", handleRouteChangeEnd);
      Router.events.on("routeChangeError", handleRouteChangeEnd);

      // Cleanup event listeners on component unmount
      return () => {
        Router.events.off("routeChangeStart", handleRouteChangeStart);
        Router.events.off("routeChangeComplete", handleRouteChangeEnd);
        Router.events.off("routeChangeError", handleRouteChangeEnd);
      };
    }
  }, []);

  // Enhance fetch to track request states
  useEffect(() => {
    if (typeof window !== "undefined") {
      const originalFetch = window.fetch;

      // Override fetch to track progress bar state
      window.fetch = async (...args) => {
        if (activeRequests === 0) load();
        activeRequests++;

        try {
          const response = await originalFetch(...args);
          return response;
        } catch (error) {
          return Promise.reject(error);
        } finally {
          activeRequests--;
          if (activeRequests === 0) stop();
        }
      };

      // Restore original fetch on component unmount
      return () => {
        window.fetch = originalFetch;
      };
    }
  }, []);

  return null; // Component does not render anything
};

export default TopProgressBar;
