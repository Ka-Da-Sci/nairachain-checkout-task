import menuClose from "../../public/images/icon-close-menu.svg";
import menuOpen from "../../public/images/icon-menu.png";
import { FC, useState, useEffect } from "react";
import ImageWrapper from "./image-wrapper";

// Props type for the MobileToggle component
type MobileToggleProps = {
  onToggle: (toggleState: boolean) => void;
};

// Component to toggle mobile navigation menu visibility
const MobileToggle: FC<MobileToggleProps> = (props) => {
  const [toggleState, setToggleState] = useState(false);

  // Effect to manage toggle state based on window size and nav link clicks
  useEffect(() => {
    const updateToggleState = () => {
      const width = window.innerWidth;
      const navBarElements = document
        .querySelector("nav")
        ?.querySelectorAll("a");

      if (width <= 640) {
        setToggleState(false);
        setToggleState(false);
        navBarElements?.forEach((element) => {
          element.addEventListener("click", () => {
            setToggleState(false);
          });
        });
      } else {
        setToggleState(true);
      }
    };

    updateToggleState();
    window.addEventListener("resize", updateToggleState);
    return () => window.removeEventListener("resize", updateToggleState);
  }, []);

  // Handler to toggle menu state and notify parent via callback
  const handleToggleState = () => {
    setToggleState((prevToggle) => !prevToggle);

    props.onToggle(toggleState);
  };

  return (
    // Container for mobile toggle button, hidden on larger screens
    <div
      onClick={handleToggleState}
      className="justify-center cursor-pointer sm:hidden"
    >
      <div
        className={`justify-center w-full h-full max-w-[25px] max-h-[25px] ${
          toggleState ? "hidden" : "flex"
        }`}
      >
        <ImageWrapper
          sourceUrl={menuOpen.src}
          alternativeText="menu-toggle-icon"
        />
      </div>

      {/* Display close menu icon when menu is open */}
      <div
        className={`justify-center w-full h-full max-w-[25px] max-h-[25px] ${
          toggleState ? "flex" : "hidden"
        }`}
      >
        <ImageWrapper
          sourceUrl={menuClose}
          alternativeText="menu-toggle-icon"
        />
      </div>
    </div>
  );
};

export default MobileToggle;
