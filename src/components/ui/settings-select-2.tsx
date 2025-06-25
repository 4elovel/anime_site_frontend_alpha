import * as React from "react";

interface SettingsSelect2Props {
  label?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const DownArrowSvg = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 10L12 15L17 10"
      stroke="#A1A1AA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsSelect2: React.FC<SettingsSelect2Props> = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Оберіть...",
  className = "",
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className={`w-full ${className}`} ref={ref}>
      {label && (
        <label
          className="block text-white text-[1.6rem] font-normal mb-2 select-none leading-none"
          style={{ lineHeight: 1.1 }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          className={`flex items-center justify-between w-full rounded-lg border border-[#49638A] bg-transparent px-4 py-2 text-base font-normal text-[#A1A1AA] focus:outline-none focus:border-blue-400 focus:ring-0 transition-all relative h-9 min-h-9 select-none pr-12`}
          style={{
            fontFamily: "Inter, sans-serif",
            boxSizing: "border-box",
            background: "transparent",
            borderWidth: 1,
          }}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span
            className={`truncate text-left w-full ${
              !value
                ? "text-[#A1A1AA] font-normal"
                : "text-[#A1A1AA] font-normal"
            }`}
          >
            {selectedLabel || placeholder}
          </span>
          <span className="ml-2 flex items-center pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <DownArrowSvg />
          </span>
        </button>
        {open && (
          <ul
            className="absolute left-0 bottom-[110%] z-50 w-full bg-[#181C24] border border-[#49638A] rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none text-white text-base font-normal animate-fade-in"
            tabIndex={-1}
            role="listbox"
            style={{ marginBottom: 4 }}
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                className={`px-4 py-2 cursor-pointer hover:bg-[#223c5e] transition-colors rounded-md ${
                  value === opt.value ? "bg-[#223c5e]" : ""
                }`}
                role="option"
                aria-selected={value === opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SettingsSelect2;
