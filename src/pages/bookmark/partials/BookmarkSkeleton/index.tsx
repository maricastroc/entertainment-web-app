import Skeleton from 'react-loading-skeleton'
import { SkeletonCard } from './styles'

export function BookmarkSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={`skeleton-${index}`}>
          <Skeleton
            baseColor="#464f5e"
            highlightColor="#63717f"
            height={120}
            width={280}
            style={{ borderRadius: '8px' }}
          />
          <Skeleton
            baseColor="#464f5e"
            highlightColor="#63717f"
            height={20}
            width={280}
          />
        </SkeletonCard>
      ))}
    </>
  )
}
