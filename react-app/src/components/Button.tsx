import Alert from "./Alert";

interface Props {
  text: string;
  onClick: () => void;
}

function Button({ text, onClick }: Props) {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
