import { JSX } from "preact/jsx-runtime";
import "./LinkButtons.css";
import OsIcons from "./OsIcons";

export function LinkButton({
  href,
  children,
}: JSX.HTMLAttributes<HTMLAnchorElement> & JSX.ElementChildrenAttribute) {
  return (
    <a class="button" target="__blank" href={href}>
      {children}
    </a>
  );
}

const StoreId = (store: string) => store.toLowerCase().replace(/[ .]+/, "-");

export function StoreLinkButton({
  store,
  oses,
  href,
}: {
  store: string;
  oses: string[];
} & JSX.HTMLAttributes<HTMLAnchorElement>) {
  const storeId = StoreId(store);
  return (
    <a class={`button-${storeId}`} target="__blank" href={href}>
      <p>
        <i class={`fa-brands fa-${storeId}`} /> {store}
      </p>
      <p>
        <OsIcons oses={oses} />
      </p>
    </a>
  );
}

export default function LinkButtons({
  children,
}: JSX.ElementChildrenAttribute) {
  return <div class="linkbuttons">{children}</div>;
}
