import Image from "next/image";
import HouseListingItem from "@/components/HouseListingItem";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="grid grid-cols-3 border-2 text-center w-full">
        <HouseListingItem/>
      </div>
    </main>
  );
}
