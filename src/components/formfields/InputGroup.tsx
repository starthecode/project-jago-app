const InputGroup = ({
  type,
  placeholder,
  name,
  onChange,
  value,
  disabled,
}: any) => {
  return (
    <div className="mb-5">
      <div className="space-y-2">
        <input
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
};

export default InputGroup;
