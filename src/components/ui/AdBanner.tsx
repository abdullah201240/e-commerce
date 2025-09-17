'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AdBanner() {
  return (
    <div className="w-full min-h-[300px] md:min-h-[600px] grid grid-cols-12 gap-1 p-2">
      {/* Left image - 8 columns */}
      <div className="col-span-12 md:col-span-8 relative min-h-[300px] md:min-h-[400px]">
        <Link href="/products" className="block h-full w-full">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/1.jpg"
              alt="Special Offer"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              className="transition-transform duration-500 cursor-pointer"
              priority={false}
              quality={85}
            />
          </div>
        </Link>
      </div>

      {/* Right column - 4 columns */}
      <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
        {/* Second image */}
        <div className="relative min-h-[140px] md:min-h-[190px] flex-1">
          <Link href="/products" className="block h-full w-full">
            <div className="relative h-full w-full overflow-hidden ">
              <Image
                src="/2.jpg"
                alt="Special Offer"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                className="transition-transform duration-500 cursor-pointer"
                priority={false}
                quality={85}
              />
            </div>
          </Link>
        </div>

        {/* Third image */}
        <div className="relative min-h-[140px] md:min-h-[190px] flex-1">
          <Link href="/products" className="block h-full w-full">
            <div className="relative h-full w-full overflow-hidden ">
              <Image
                src="/3.png"
                alt="Special Offer"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                className="transition-transform duration-500 cursor-pointer"
                priority={false}
                quality={85}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
