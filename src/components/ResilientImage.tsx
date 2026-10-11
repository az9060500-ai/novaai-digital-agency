import React, { useState } from 'react';
import { Sparkles, Utensils, Coffee, ShoppingBag } from 'lucide-react';

// Static ES module imports ensure Vite bundles every image into dist/assets/ during `bun run build` / `vite build`
import finedineWagyuImg from '../assets/images/finedine_hero_dish_1791709664000.jpg';
import finedineScallopsImg from '../assets/images/finedine_seafood_platter_1791709676255.jpg';
import finedineBlackCodImg from '../assets/images/finedine_black_cod_lamb_1791715651807.jpg';
import finedineChocolateImg from '../assets/images/finedine_chocolate_sphere_1791715671152.jpg';
import urbanCafeLatteImg from '../assets/images/urbancafe_interior_latte_1791709686840.jpg';
import glowskinSerumImg from '../assets/images/glowskin_serum_bottle_1791709698033.jpg';
import glowskinCreamImg from '../assets/images/glowskin_cream_jar_1791709708834.jpg';
import glowskinNiacinamideImg from '../assets/images/glowskin_niacinamide_drops_1791715619045.jpg';
import glowskinCleanserImg from '../assets/images/glowskin_cleanser_pump_1791715635962.jpg';

export const GENERATED_IMAGES = {
  finedineWagyu: finedineWagyuImg,
  finedineScallops: finedineScallopsImg,
  finedineBlackCod: finedineBlackCodImg,
  finedineChocolate: finedineChocolateImg,
  urbanCafeLatte: urbanCafeLatteImg,
  glowskinSerum: glowskinSerumImg,
  glowskinCream: glowskinCreamImg,
  glowskinNiacinamide: glowskinNiacinamideImg,
  glowskinCleanser: glowskinCleanserImg
} as const;

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackCategory?: 'restaurant' | 'cafe' | 'skincare' | 'agency';
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackCategory = 'agency',
  fallbackTitle
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#121636] via-[#1B143F] to-[#0A0C1D] border border-white/10 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-lg bg-violet-500/15 border border-violet-400/25 flex items-center justify-center text-violet-300 mb-2">
          {fallbackCategory === 'restaurant' && <Utensils className="w-5 h-5" />}
          {fallbackCategory === 'cafe' && <Coffee className="w-5 h-5" />}
          {fallbackCategory === 'skincare' && <ShoppingBag className="w-5 h-5" />}
          {fallbackCategory === 'agency' && <Sparkles className="w-5 h-5" />}
        </div>
        <span className="text-xs font-medium text-slate-200 max-w-[180px] line-clamp-2">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
