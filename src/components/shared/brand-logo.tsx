import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  onDark?: boolean;
}

export function BrandLogo({ className, onDark = false }: BrandLogoProps) {
  return (
    <div className={cn('w-full max-w-64', onDark && 'rounded-lg bg-white px-3 py-3', className)}>
      <Image
        src="/branding/processiqtech.png"
        alt="ProcessIQTech"
        width={923}
        height={207}
        sizes="(max-width: 640px) 210px, 256px"
        className="h-auto w-full object-contain"
      />
    </div>
  );
}
