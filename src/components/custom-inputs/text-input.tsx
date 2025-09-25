"use client";
import { useField } from "formik";
import { FC } from "react";

interface TextInputProps {
  label: string;
  name: string;
  classNamePlus?: string;
  placeholder?: string;
  type?: string;
  as?: "input" | "textarea";
}

const TextInput: FC<TextInputProps> = ({ label, as, classNamePlus, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={`${classNamePlus ?? ""}`}>
      <label
        className="max-lg:text-lg max-md:text-base antialiased text-foreground-secondary font-bai_jamjuree font-normal text-xl"
        htmlFor={props.name}
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          rows={3}
          className="px-4 py-2 max-lg:text-base max-md:text-sm max-sm:text-xs text-textarea bg-background-primary text-foreground-sub-secondary border border-solid border-foreground-secondary-span rounded-lg outline-0 font-bai_jamjuree font-normal text-lg"
          {...field}
          {...props}
        />
      ) : (
        <input
          className="px-4 py-2 max-lg:text-base max-md:text-sm max-sm:text-xs !bg-background-primary !text-foreground-sub-primary text-input border border-solid border-foreground-secondary-span rounded-lg outline-0 font-bai_jamjuree font-normal text-lg transition-colors duration-[0s]"
          {...field}
          {...props}
        />
      )}
      {meta.touched && meta.error ? (
        <p className="error" style={{ color: "red", fontSize: "0.75rem" }}>
          {meta.error}
        </p>
      ) : null}
    </div>
  );
};

export default TextInput;
