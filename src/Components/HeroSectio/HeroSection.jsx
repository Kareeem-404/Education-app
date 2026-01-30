/**
 * HeroSection - Main banner section of the home page.
 * Displays:
 * - Main heading: "Learn Web Programming"
 * - Subtitle with value proposition
 * - Two call-to-action buttons (Start Now, Browse Another Stacks)
 */
export default function HeroSection() {
  // Common button styling for consistency
  const ButtonStyle =
    "text-center w-24 h-10 bg-text text-background rounded-md cursor-pointer duration-500 hover:duration-500 hover:bg-gray-900";

  return (
    <>
      {/* Hero section with light blue background */}
      <section className="flex bg-[#BFC9D1] text-text flex-col justify-center items-center h-150 w-full">
        {/* Main heading */}
        <h1 className="text-5xl font-bold">Learn Web Programming</h1>
        {/* Subtitle */}
        <p className="text-lg mt-2">with the most unique web developer site</p>
        {/* Call-to-action buttons */}
        <div className="flex flex-row gap-4 mt-4">
          {/* Start Now button */}
          <button className={ButtonStyle}>Start Now</button>
          {/* Browse another stacks button */}
          <button className="text-center w-45 h-10 bg-text text-background rounded-md cursor-pointer duration-500 hover:duration-500 hover:bg-gray-900">
            Browse Another Stacks
          </button>
        </div>
      </section>
    </>
  );
}
