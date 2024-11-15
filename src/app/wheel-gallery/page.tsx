'use server'

import { Suspense } from "react";
import WheelGalleryContent from "./_page";
import { getUniqueElements } from "./actions";
import Loading from "../_components/_loading/Loading";

async function fetchPossibleFilters(): Promise<FilterOptions> {
    const [car_types, wheel_sizes, wheel_brands, subtypes] = await Promise.all([
      getUniqueElements("car_type"),
      getUniqueElements("wheel_size"),
      getUniqueElements("wheel_brand"),
      getUniqueElements("subtype"),
    ]);

    return({
      car_type: car_types,
      wheel_size: wheel_sizes.map(Number),
      wheel_brand: wheel_brands,
      subtype: subtypes,
    });
  }

export default async function WheelGallery() {

    const possibleFilters = await fetchPossibleFilters();

    return (
      <Suspense fallback={<Loading></Loading>}>
        <WheelGalleryContent possibleFilters={possibleFilters} />
      </Suspense>
    );
  }