interface ButtonFace {
  text?: string;
  disabled?: boolean;
  onClick?: () => {} | void;
}

export const Button = (props: ButtonFace) => {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
