import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

// Fixed-size cropped card/thumbnail image from a Sanity image object
// (mainImage with asset->metadata expanded). Uses next/image + LQIP blur.
export default function SanityImage({ image, alt, width, height, sizes, className, style }) {
  if (!image?.asset) return null
  const lqip = image.asset.metadata?.lqip
  return (
    <Image
      src={urlFor(image).width(width).height(height).fit('crop').auto('format').url()}
      alt={alt || ''}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      style={style}
      placeholder={lqip ? 'blur' : 'empty'}
      blurDataURL={lqip || undefined}
    />
  )
}
