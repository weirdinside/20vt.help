import React from "react";

function NestedNavItem({
  children,
  title,
  thumbnail,
  id,
}: {
  children: React.ReactNode[] | React.ReactNode;
  title: string;
  thumbnail?: string;
  id?: any;
}) {
  return <>{children}</>;
}

export default NestedNavItem;
