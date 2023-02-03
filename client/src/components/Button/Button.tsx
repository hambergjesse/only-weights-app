interface ButtonFace {
  text?: string;
  disabled?: boolean;
  onClick?: () => object | void;
  type?: "button" | "submit" | "reset";
}

export const Button = (props: ButtonFace) => {
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
