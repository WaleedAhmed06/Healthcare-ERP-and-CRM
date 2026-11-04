import { notFound } from 'next/navigation';
import { featureByKey } from '@/config/features';
import { FeatureGate } from '@/components/shared/feature-gate';
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(featureByKey).map((feature) => ({ feature }));
}

export default async function FeaturePage({ params }: { params: Promise<{ feature: string }> }) {
  const { feature } = await params;
  if (!featureByKey[feature]) notFound();
  return <FeatureGate feature={feature} />;
}
