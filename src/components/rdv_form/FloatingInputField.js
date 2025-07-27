// components/FloatingInputField.js
export default function FloatingInputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = " ",
  max,
  min,
  required = false,
}) {
  return (
    <div className="relative z-0 w-full group pb-3">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        max={max}
        min={min}
        required={required}
        className={`
          peer block w-full appearance-none border border-gray-300
          rounded-md px-2.5 pt-4 pb-2 text-white font-semibold
          bg-transparent focus:bg-transparent focus:outline-none focus:ring-0 transition
        `}
      />
      <label
        htmlFor={name}
        className={`
          absolute text-white duration-300 transform
          scale-[0.85] -translate-y-4 top-2 z-10 origin-[0]
          left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0.5
          peer-focus:scale-[0.85] peer-focus:-translate-y-4 peer-focus:text-white
        `}
      >
        {label} {required === true ? "*" : ""}
      </label>
    </div>
  );
}
