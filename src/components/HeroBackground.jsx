import React from 'react';

/**
 * A layout-independent hero background layer.
 * The absolute image box mirrors the Home hero so browser zoom and responsive
 * breakpoint changes never allow intrinsic image dimensions to move the layer.
 */
export default function HeroBackground({
  src,
  mobileSrc,
  alt = '',
  imageClassName = '',
  overlayClassName = '',
  onError
}) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <picture className="absolute inset-0 block w-full h-full">
        {mobileSrc && <source media="(max-width: 768px)" srcSet={mobileSrc} />}
        <img
          src={src}
          alt={alt}
          onError={onError}
          className={`absolute inset-0 block w-full h-full max-w-none object-cover ${imageClassName}`}
        />
      </picture>
      {overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
    </div>
  );
}
