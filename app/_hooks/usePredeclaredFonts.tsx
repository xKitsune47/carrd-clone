import {
  DM_Sans,
  IBM_Plex_Sans,
  Inter,
  Manrope,
  Poppins,
  Source_Sans_3,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const ibmPlexSans = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

const declaredFonts = {
  inter,
  sourceSans3,
  manrope,
  dmSans,
  poppins,
  ibmPlexSans,
};

const usePredeclaredFonts = () => {
  return { declaredFonts };
};

export default usePredeclaredFonts;
