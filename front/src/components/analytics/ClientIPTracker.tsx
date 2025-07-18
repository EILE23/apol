import { useClientIP } from "../../hooks/useClientIP";

export default function ClientIPTracker() {
  useClientIP();

  // This component doesn't render anything
  return null;
}
