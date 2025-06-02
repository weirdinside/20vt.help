"use server";

import React, { Suspense } from "react";
import Loading from "./_components/_loading/Loading";
import Homepage from "./_page";

import backgroundImage from "../../public/backgroundwhite.png";

export default async function page() {
  return (
    <Suspense fallback={<Loading />}>
      <Homepage backgroundImage={backgroundImage.src} />
    </Suspense>
  );
}
