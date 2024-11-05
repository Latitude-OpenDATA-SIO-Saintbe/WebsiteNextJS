'use client'

import React from 'react';
import HereMap from '../../../components/ui/map';
import Banner from '../../../components/ui/banner';

const Page = () => {
  return (
    <>
      <div>
        <Banner text="Bienvenue sur notre projet !" />
      </div>
      <div>
        <h1>Carte</h1>
        <HereMap />
      </div>
    </>
  );
};

export default Page;
