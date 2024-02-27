import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js

const ImageBanner = () => {
  return (
    <div
      className={`banner d-flex justify-content-center align-items-center pt-2 pointer`}
    >
      <Link href="/faq">
        <a>
          <Image
            src="/win_banner.png"
            alt="Win Every Week Banner"
            width={750}
            height={150}
            className="img-fluid"
          />
        </a>
      </Link>
    </div>
  );
};

export default ImageBanner;
