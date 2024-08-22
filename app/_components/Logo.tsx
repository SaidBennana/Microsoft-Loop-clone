import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <h1 className="font-extrabold text-xl">
        <span className="text-primary">OPP</span> Loop
      </h1>
    </Link>
  );
}
