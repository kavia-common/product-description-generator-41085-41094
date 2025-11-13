"use client";

import { useMemo, useState } from "react";
import { appConfig, featureFlags, logger } from "@/lib/config";
import { generateDescription, validateInput, type GeneratorInput } from "@/lib/generator";
import { useFormState } from "@/lib/store";

const gradient = "bg-gradient-to-br from-blue-500/10 to-gray-50";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}

// PUBLIC_INTERFACE
export default function Home() {
  /** This is the main application page for generating Meesho product descriptions. */
  const { data, updateField, reset } = useFormState();
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);

  const flags = featureFlags;

  const generate = () => {
    const issues = validateInput(data);
    setErrors(issues);
    if (issues.length) return;
    setBusy(true);
    try {
      const text = generateDescription({
        ...data,
        includeEmojis: flags.fancyOutput ? data.includeEmojis : false,
        includeHashtags: data.includeHashtags,
      });
      setOutput(text);
      logger.info("Generated description");
    } catch (e) {
      logger.error("Generation failed", e);
    } finally {
      setBusy(false);
    }
  };

  const hasError = (field: string) => errors.some((e) => e.field === field);
  const errorMsg = (field: string) => errors.find((e) => e.field === field)?.message;

  const formDisabled = useMemo(() => busy, [busy]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (e) {
      logger.warn("Clipboard copy failed", e);
    }
  };

  const shareIntent = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(output)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className={`min-h-[calc(100vh-56px-88px)] ${gradient}`}>
      <div className="grid md:grid-cols-2 gap-4">
        <Section title="Product Details">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="label" htmlFor="title">Title</label>
              <input
                id="title"
                className="input"
                placeholder="e.g., Premium Cotton Kurti Set"
                value={data.title}
                onChange={(e) => updateField("title", e.target.value)}
                aria-invalid={hasError("title")}
                aria-errormessage={hasError("title") ? "err-title" : undefined}
                disabled={formDisabled}
              />
              {hasError("title") && (
                <p id="err-title" className="text-red-600 text-xs mt-1">{errorMsg("title")}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor="category">Category</label>
                <input
                  id="category"
                  className="input"
                  placeholder="e.g., Women Ethnic"
                  value={data.category ?? ""}
                  onChange={(e) => updateField("category", e.target.value)}
                  disabled={formDisabled}
                />
              </div>
              <div>
                <label className="label" htmlFor="brand">Brand</label>
                <input
                  id="brand"
                  className="input"
                  placeholder="Optional"
                  value={data.brand ?? ""}
                  onChange={(e) => updateField("brand", e.target.value)}
                  disabled={formDisabled}
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="highlights">Highlights (comma separated)</label>
              <input
                id="highlights"
                className="input"
                placeholder="Soft cotton, Breathable fabric, Daily wear"
                value={(data.highlights ?? []).join(", ")}
                onChange={(e) =>
                  updateField(
                    "highlights",
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                disabled={formDisabled}
              />
              <p className="helper">Add 2–5 short highlights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="label" htmlFor="material">Material</label>
                <input
                  id="material"
                  className="input"
                  placeholder="e.g., Cotton"
                  value={data.material ?? ""}
                  onChange={(e) => updateField("material", e.target.value)}
                  disabled={formDisabled}
                />
              </div>
              <div>
                <label className="label" htmlFor="colors">Colors (comma)</label>
                <input
                  id="colors"
                  className="input"
                  placeholder="Maroon, Navy, Black"
                  value={(data.colors ?? []).join(", ")}
                  onChange={(e) =>
                    updateField(
                      "colors",
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                  disabled={formDisabled}
                />
              </div>
              <div>
                <label className="label" htmlFor="sizes">Sizes (comma)</label>
                <input
                  id="sizes"
                  className="input"
                  placeholder="S, M, L, XL"
                  value={(data.sizes ?? []).join(", ")}
                  onChange={(e) =>
                    updateField(
                      "sizes",
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                  disabled={formDisabled}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor="price">Price (₹)</label>
                <input
                  id="price"
                  type="number"
                  className="input"
                  placeholder="e.g., 799"
                  value={data.price ?? ""}
                  onChange={(e) => updateField("price", e.target.value === "" ? undefined : Number(e.target.value))}
                  aria-invalid={hasError("price")}
                  disabled={formDisabled}
                />
              </div>
              <div>
                <label className="label" htmlFor="selling">Selling Price (₹)</label>
                <input
                  id="selling"
                  type="number"
                  className="input"
                  placeholder="e.g., 599"
                  value={data.sellingPrice ?? ""}
                  onChange={(e) =>
                    updateField("sellingPrice", e.target.value === "" ? undefined : Number(e.target.value))
                  }
                  aria-invalid={hasError("sellingPrice")}
                  disabled={formDisabled}
                />
                {hasError("sellingPrice") && (
                  <p className="text-red-600 text-xs mt-1">{errorMsg("sellingPrice")}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="label" htmlFor="tone">Tone</label>
                <select
                  id="tone"
                  className="select"
                  value={data.tone}
                  onChange={(e) => updateField("tone", e.target.value as GeneratorInput["tone"])}
                  disabled={formDisabled}
                >
                  <option value="friendly">Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="trendy">Trendy</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
              <div className="flex items-end gap-3">
                <label className="badge">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={data.includeEmojis}
                    onChange={(e) => updateField("includeEmojis", e.target.checked)}
                    disabled={formDisabled || !flags.fancyOutput}
                  />
                  Emojis
                </label>
                <label className="badge">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={data.includeHashtags}
                    onChange={(e) => updateField("includeHashtags", e.target.checked)}
                    disabled={formDisabled}
                  />
                  Hashtags
                </label>
                <label className="badge">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={data.callToAction}
                    onChange={(e) => updateField("callToAction", e.target.checked)}
                    disabled={formDisabled}
                  />
                  CTA
                </label>
              </div>
              <div className="flex items-end justify-end gap-2">
                <button className="btn btn-ghost" onClick={reset} disabled={formDisabled}>
                  Reset
                </button>
                <button className="btn btn-primary" onClick={generate} disabled={formDisabled}>
                  {busy ? "Generating..." : "Generate"}
                </button>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Generated Description">
          {!output ? (
            <p className="helper">
              Your description will appear here after generation. Use the form to the left to provide product details.
            </p>
          ) : (
            <>
              <pre className="code text-[0.92rem] leading-6">{output}</pre>
              <div className="mt-3 flex gap-2">
                {featureFlags.copyEnabled && (
                  <button className="btn btn-ghost" onClick={copyToClipboard}>
                    Copy
                  </button>
                )}
                {featureFlags.shareEnabled && (
                  <button className="btn btn-primary" onClick={shareIntent}>
                    Share
                  </button>
                )}
              </div>
            </>
          )}
          <div className="mt-4 text-xs text-gray-500">
            <span className="mr-2">Env: {appConfig.nodeEnv}</span>
            {appConfig.experimentsEnabled ? (
              <span className="badge">Experiments ON</span>
            ) : (
              <span className="badge">Experiments OFF</span>
            )}
          </div>
        </Section>
      </div>
    </main>
  );
}
