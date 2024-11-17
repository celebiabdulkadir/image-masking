import ImageCanvas from "@/components/ImageCanvas";

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center justify-start lg:justify-center min-h-screen pt-24 lg:pt-12 pb-8  ">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <ImageCanvas />
      </main>
    </div>
  );
}
