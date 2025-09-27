import SectionAnimatedWrapper from "./section-animated-wrapper";
import Link from "next/link";

const Footer = () => {
  return (
      <SectionAnimatedWrapper sectionId="footer" sectionClassName="w-full bg-hero-section-background-primary" classNamePlus="px-2 sm:px-4 py-2 flex-col gap-12 container mx-auto box-border">

        <div className="w-full">
          <nav className="flex justify-center flex-wrap items-center gap-4 pt-2 w-full border-t border-t-foreground-sub-primary border-t-solid">
            <Link href="/privacy-policy">
              <h1 className="font-bai_jamjuree font-normal text-sm text-foreground-sub-primary">Privacy Policy</h1>
            </Link>

            <Link href="/terms">
              <h1 className="font-bai_jamjuree font-normal text-sm text-foreground-sub-primary">Terms of Service</h1>
            </Link>

            <Link href="/cookies">
              <h1 className="font-bai_jamjuree font-normal text-sm text-foreground-sub-primary">Cookies Settings</h1>
            </Link>
          </nav>
        </div>
      </SectionAnimatedWrapper>
  );
};

export default Footer;
