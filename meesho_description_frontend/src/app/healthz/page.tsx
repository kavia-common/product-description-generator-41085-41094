import { appConfig } from "@/lib/config";

export const dynamic = "force-static";

export default function Healthz() {
  // Keeping content minimal to ensure it can be used by health probes
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f6f7fb]">
      <div className="text-center text-gray-700">
        <p>ok</p>
        <small className="block opacity-70 mt-1">path: {appConfig.healthPath}</small>
      </div>
    </main>
  );
}
