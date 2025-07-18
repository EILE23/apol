import { useEffect } from "react";

export const useClientIP = () => {
  useEffect(() => {
    const sendClientIP = async () => {
      try {
        // Get IP from external service
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const clientIP = ipData.ip;

        // Send IP to our server
        const API_BASE_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        await fetch(`${API_BASE_URL}/api/access-logs/client-ip`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ip: clientIP,
            user_agent: navigator.userAgent,
            path: window.location.pathname,
            referrer: document.referrer || undefined,
          }),
        });
      } catch (error) {
        console.error("Failed to send client IP:", error);
      }
    };

    // Only run on client side
    if (typeof window !== "undefined") {
      sendClientIP();
    }
  }, []);
};
