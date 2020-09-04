import React from "react";
import { InputText } from "primereact/inputtext";

interface InputProps {
  description: string;
  setDescription: (description: string) => void;
}

export const Description: React.FC<InputProps> = ({
  description,
  setDescription,
}) => {
  return (
    <div className="description">
      <InputText
        id="description"
        value={description}
        keyfilter={/^[^#<>*!]+$/}
        onChange={(e) => {
          setDescription(e.currentTarget.value);
        }}
      />
    </div>
  );
};
