import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <section className="card" role="alert" aria-live="assertive">
        <header className="mb-1">
          <h1 className="text-xl font-semibold">404 – Page Not Found</h1>
          <p className="helper mt-1">The page you’re looking for doesn’t exist.</p>
        </header>
        <Link className="btn btn-primary mt-3 inline-flex" href="/">Go Home</Link>
      </section>
    </main>
  );
}
