interface ButtonFace {
  text?: string;
  disabled?: boolean;
  onClick?: () => object | void;
  type?: "button" | "submit" | "reset";
}

export const Button = (props: ButtonFace): JSX.Element => {
  return (
    <button
      className="default-button"
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
    >
      {props.text}
    </button>
  );
};
