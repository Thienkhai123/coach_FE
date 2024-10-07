import Image from "next/legacy/image";

const BannerHero = () => {
  return (
    <div className="w-full relative h-[300px] rounded-xl overflow-hidden">
      <Image
        alt="hero-banner"
        src="/images/slide.jpg"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default BannerHero;
