import BackgroundIMG from "../../assets/landing-page-background.webp";

export const Background = (): JSX.Element => {
  const preLoadImage = (new Image().src = BackgroundIMG);

  return (
    <div className="background__wrapper">
      <img
        className="background-img"
        src={preLoadImage}
        alt="Website Background"
      />
    </div>
  );
};
