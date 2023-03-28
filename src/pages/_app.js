import "@/styles/globals.css";
import Link from "next/link";
import { RecoilRoot } from "recoil";

const links = [
  {
    href: "/",
    label: "Context",
  },
  {
    href: "/zustand",
    label: "Zustand",
  },
  {
    href: "/redux",
    label: "Redux",
  },
  {
    href: "/recoil",
    label: "Recoil",
  },
];

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <div>
        <div className="nav">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
