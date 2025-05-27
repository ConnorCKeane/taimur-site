import Navigation from '@/components/Navigation';

export default function ShopPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-[#F04C3E]">Shop</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Guitar Equipment & Accessories
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find everything you need to enhance your guitar playing experience.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Add shop items here */}
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-gray-100 p-8 w-full aspect-square mb-4"></div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Guitar Strings</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">High-quality strings for optimal sound and durability.</p>
              <p className="mt-4 text-lg font-semibold text-[#F04C3E]">$15.99</p>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-gray-100 p-8 w-full aspect-square mb-4"></div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Guitar Picks</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">Premium picks for precise playing and great tone.</p>
              <p className="mt-4 text-lg font-semibold text-[#F04C3E]">$5.99</p>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-lg bg-gray-100 p-8 w-full aspect-square mb-4"></div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Guitar Strap</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">Comfortable and stylish strap for your guitar.</p>
              <p className="mt-4 text-lg font-semibold text-[#F04C3E]">$24.99</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 