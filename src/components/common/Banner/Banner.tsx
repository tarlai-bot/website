import OptimizedImage from "../OptimizedImage/OptimizedImage";

interface BannerProps {
  title: string;
  description: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  imageOnLeft?: boolean;
}

export default function Banner({
  title,
  description,
  image,
  buttonText = "Read More",
  buttonLink = "#",
  imageOnLeft = true,
}: BannerProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${
            imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"
          } gap-8 md:gap-12 items-center`}
        >
          {/* Image Side */}
          <div className="w-full md:w-1/2">
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-[400px] md:h-[500px]">
              <OptimizedImage
                src={image}
                alt={title}
                aspectRatio="4/5"
                objectFit="cover"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900">{title}</h2>
            <p className="text-base md:text-lg font-normal text-gray-700 leading-relaxed">
              {description}
            </p>
            {buttonText && buttonLink && (
              <a
                href={buttonLink}
                className="inline-block bg-secondary hover:bg-[#d86518] text-white text-sm font-medium uppercase tracking-wide px-8 py-4 rounded shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                {buttonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
