import { useState } from "react";

interface Props {
  onChange: (status: boolean) => void;
}

function Checkbox({ onChange }: Props) {
  const [isChecked, setChecked] = useState(false);

  const toggle = (event: Event) => {
    const element = event.target as HTMLInputElement;
    const status = element.checked;

    status === true ? setChecked(true) : setChecked(false);
    onChange(status);
  };

  return (
    <input
      type="checkbox"
      className="form-checkbox"
      checked={isChecked}
      onChange={() => toggle(event)}
    />
  );
}

export default Checkbox;
