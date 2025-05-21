"use client";

import { Suspense } from "react";
import CompendiumContent from "../_components/Compendium/CompendiumContent";
import Loading from "../_components/_loading/Loading";

export default async function Compendium() {
  return (
    <Suspense fallback={<Loading />}>
      <CompendiumContent />
    </Suspense>
  );
}
