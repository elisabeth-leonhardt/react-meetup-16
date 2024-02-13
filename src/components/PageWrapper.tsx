import { ReactNode } from "react";

export function PageWrapper({ children }: { readonly children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-5xl m-[auto] py-10 px-4">{children}</div>
  );
}
