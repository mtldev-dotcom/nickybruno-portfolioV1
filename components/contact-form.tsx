"use client";

import { useState } from "react";

import type { ContactPayload } from "@/lib/schemas/contact";
import { contactSchema } from "@/lib/schemas/contact";

export type ContactCopy = {
  sectionLabel?: string;
  title: string;
  description: string;
  form: {
    nameLabel: string;
    emailLabel: string;
    companyLabel?: string;
    projectLabel: string;
    budgetLabel?: string;
    budgetOptions?: string[];
    submitLabel: string;
  };
  success: {
    title: string;
    description: string;
  };
  error: {
    title: string;
    description: string;
  };
};

type ContactFormProps = {
  locale: string;
  copy: ContactCopy;
};

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ locale, copy }: ContactFormProps) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload: ContactPayload = {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      company: formData.get("company")?.toString() ?? "",
      project: formData.get("project")?.toString() ?? "",
      budget: formData.get("budget")?.toString() ?? "",
      locale: locale as ContactPayload["locale"],
    };

    const validation = contactSchema.safeParse(payload);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string") {
          errors[field] = issue.message;
        }
      }
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSubmissionState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmissionState("success");
      event.currentTarget.reset();
    } catch (error) {
      console.error("Contact form submission failed", error);
      setSubmissionState("error");
    }
  };

  const { form } = copy;

  return (
    <section className="rounded-3xl border border-border/60 bg-card/80 px-6 py-10 shadow-[0_30px_90px_-60px_rgba(102,255,0,0.6)] sm:px-10 md:px-12 md:py-14">
      <div className="max-w-2xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {copy.sectionLabel ?? (locale === "fr" ? "Collaborons" : "Collaborate")}
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">{copy.title}</h2>
        <p className="text-base text-muted-foreground md:text-lg">{copy.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            {form.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder={locale === "fr" ? "Votre nom complet" : "Your full name"}
          />
          {formErrors.name ? <p className="text-xs text-destructive">{formErrors.name}</p> : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            {form.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder={locale === "fr" ? "nom@entreprise.com" : "name@company.com"}
          />
          {formErrors.email ? <p className="text-xs text-destructive">{formErrors.email}</p> : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium text-foreground">
            {form.companyLabel}
          </label>
          <input
            id="company"
            name="company"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder={locale === "fr" ? "Votre \u00E9quipe" : "Your team"}
          />
          {formErrors.company ? <p className="text-xs text-destructive">{formErrors.company}</p> : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="budget" className="block text-sm font-medium text-foreground">
            {form.budgetLabel}
          </label>
          <select
            id="budget"
            name="budget"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            defaultValue=""
          >
            <option value="" disabled>
              {locale === "fr" ? "S\u00E9lectionnez une option" : "Select an option"}
            </option>
            {form.budgetOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {formErrors.budget ? <p className="text-xs text-destructive">{formErrors.budget}</p> : null}
        </div>
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="project" className="block text-sm font-medium text-foreground">
            {form.projectLabel}
          </label>
          <textarea
            id="project"
            name="project"
            required
            rows={6}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder={
              locale === "fr"
                ? "D\u00E9crivez votre projet, \u00E9ch\u00E9ancier et objectifs principaux."
                : "Share your project context, timeline, and goals."
            }
          />
          {formErrors.project ? <p className="text-xs text-destructive">{formErrors.project}</p> : null}
        </div>
        <div className="md:col-span-2 flex items-center gap-4">
          <button
            type="submit"
            disabled={submissionState === "submitting"}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {submissionState === "submitting"
              ? locale === "fr"
                ? "Envoi\u2026"
                : "Sending\u2026"
              : form.submitLabel}
          </button>
          {submissionState === "success" ? (
            <div className="space-y-1 rounded-xl border border-primary/40 bg-primary/5 px-4 py-2">
              <p className="text-sm font-semibold text-primary">{copy.success.title}</p>
              <p className="text-xs text-muted-foreground">{copy.success.description}</p>
            </div>
          ) : null}
          {submissionState === "error" ? (
            <div className="space-y-1 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2">
              <p className="text-sm font-semibold text-destructive">{copy.error.title}</p>
              <p className="text-xs text-muted-foreground">{copy.error.description}</p>
            </div>
          ) : null}
        </div>
      </form>
    </section>
  );
}
