import { memo, useRef, useEffect, useCallback, useState } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = memo(function SearchBar({ onSearch }: SearchBarProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setValue(v);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onSearch(v.toLowerCase().trim());
      }, 220);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setValue("");
    onSearch("");
    inputRef.current?.focus();
  }, [onSearch]);

  // Keyboard shortcut: / to focus search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="no-print mb-6 relative group" role="search">
      {/* Search icon */}
      <div
        className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${
          isFocused ? "text-primary" : "text-slate-400 dark:text-slate-500"
        }`}
        aria-hidden="true"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="search"
        value={value}
        placeholder="Buscar disciplina, tópico ou referência..."
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        enterKeyHint="search"
        aria-label="Buscar no guia de estudos"
        className={`
          font-body w-full h-12 pl-11 pr-24 sm:pr-28 rounded-xl border
          transition-all duration-200 outline-none
          bg-white dark:bg-slate-800
          text-slate-800 dark:text-slate-100
          placeholder:text-slate-400 dark:placeholder:text-slate-500
          ${isFocused
            ? "border-primary shadow-[0_0_0_3px_rgba(232,119,34,0.15)] dark:shadow-[0_0_0_3px_rgba(232,119,34,0.12)]"
            : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
          }
        `}
      />

      {/* Right side: keyboard hint + clear */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
        {!value && !isFocused && (
          <kbd className="hidden sm:flex items-center px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-mono text-slate-400 dark:text-slate-500 pointer-events-none select-none">
            /
          </kbd>
        )}

        {value && (
          <button
            onClick={handleClear}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-150 cursor-pointer border-none text-xs font-bold"
            aria-label="Limpar busca"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
});

export default SearchBar;
