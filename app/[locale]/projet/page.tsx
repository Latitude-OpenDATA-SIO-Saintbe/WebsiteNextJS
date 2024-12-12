export const experimental_ppr = true
import HereMap from '../../../components/ui/map';
import Banner from '../../../components/ui/banner';
import { Suspense } from "react"

const Page = async () => {
  "use server"
  return (
    <>
      <div>
        <Banner text="Bienvenue sur notre projet !" />
      </div>
      <div>
        <h1>Carte</h1>
        <Suspense fallback={<div />}><HereMap /></Suspense>
      </div>
    </>
  );
};

export default Page;
