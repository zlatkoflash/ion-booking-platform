import { useEffect, useState } from "react";
import { AsYouType } from "libphonenumber-js";
import InputText from "./InputText";

export default function InputTextPhone(
  {
    id,
    label,
    name,
    value,
    placeholder,
    className,
    showLabelIconText,
    labelIconType,
    onChange,
    validation,
  }
    :
    {
      id?: string;
      label?: string;
      name?: string;
      value: string;
      placeholder?: string;
      className?: string;
      showLabelIconText?: boolean;
      labelIconType?: string;
      onChange?: (phone_number: string) => void;
      validation?: any;
    }
) {
  /**/
  const [phone_number, set_phone_number] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Use libphonenumber-js to parse and format on the fly
    // It automatically reads country codes like +1, +44, +33, etc.
    const formattedValue = new AsYouType().input(rawValue);

    set_phone_number(formattedValue);
  };

  useEffect(() => {
    onChange?.(phone_number);
  }, [phone_number]);

  return (
    <>
      <InputText
        id={id}
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
        className={className}
        showLabelIconText={true}
        labelIconType="call"
        onChange={(e) => {
          handlePhoneChange(e)
        }}
        validation={{ required: true }}
      />
    </>
  );
}