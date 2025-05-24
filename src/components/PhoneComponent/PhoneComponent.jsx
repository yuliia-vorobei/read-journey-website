import desktopImage from "../../assets/iPhone 15 desctop.png";
import mobileImage from "../../assets/iphone mobile-min.png";
import css from "./PhoneComponent.module.css";

export const PhoneComponent = () => {
  return (
    <div className={css.imageContainer}>
      <picture>
        <source media="(min-width: 1440px)" srcSet={desktopImage} />
        <source media="(min-width: 320px)" srcSet={mobileImage} />
        <img src={desktopImage} alt="library" className={css.image} />
      </picture>
    </div>
  );
};
