import Link from "next/link";
import { BiHome } from "react-icons/bi";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        className="px-2 py-2 bg-gray-200 hover:text-white text-black hover:bg-black flex justify-center items-center gap-2"
        href="/"
      >
        <BiHome />
        <span className="">Return Home</span>
      </Link>
    </div>
  );
}
