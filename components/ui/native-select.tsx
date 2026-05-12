"use client";

import styles from "./native-select.module.css";

export type NativeSelectOption = {
  value: string;
  label: string;
};

type NativeSelectProps = {
  id: string;
  value: string;
  placeholder: string;
  options: NativeSelectOption[];
  onChange: (value: string) => void;
  required?: boolean;
  name?: string;
  describedBy?: string;
  ariaLabel?: string;
};

export default function NativeSelect({
  id,
  value,
  placeholder,
  options,
  onChange,
  required,
  name,
  describedBy,
  ariaLabel,
}: NativeSelectProps) {
  return (
    <div className={styles.wrap}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        aria-describedby={describedBy}
        aria-label={ariaLabel}
        className={styles.select}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span aria-hidden="true" />
    </div>
  );
}
