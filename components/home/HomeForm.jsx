"use client";

import { useState, useTransition } from "react";
import { resolveName } from "@/app/actions";

export default function HomeForm({
  onResolved,
  disabled,
  variant = "desktop",
  idSuffix = "",
}) {
  const [name, setName] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleChange(event) {
    setName(event.target.value);
    if (notFound) setNotFound(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || isPending || disabled) return;

    startTransition(async () => {
      const result = await resolveName(trimmed);
      if (result.status === "found") {
        onResolved(result.id);
      } else {
        setNotFound(true);
      }
    });
  }

  const inputId = `visitor-name${idSuffix}`;

  return (
    <form
      className={`home-form-slot ${variant === "mobile" ? "home-form-slot--mobile" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor={inputId} className="home-label">
        What should I call you?
      </label>

      <div className="home-input-wrap">
        <input
          id={inputId}
          name="name"
          type="text"
          autoComplete="off"
          autoCapitalize="words"
          spellCheck={false}
          value={name}
          onChange={handleChange}
          disabled={disabled}
          className="home-input"
          aria-label="What should I call you?"
        />
      </div>

      <div className="home-underline" />

      <button
        type="submit"
        className="home-arrow-btn"
        aria-label="Enter"
        disabled={disabled || isPending}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3.5 12h16M13 5.5l6.5 6.5-6.5 6.5"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <p className="home-subcta">See if I remember you</p>

      <p className={`home-error ${notFound ? "is-visible" : ""}`} role="status">
        I don&rsquo;t have anything here under that name.
      </p>
    </form>
  );
}
