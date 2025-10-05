import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  )
}

function SkeletonCard({
  className,
  hasHeader = true,
  lines = 3,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  hasHeader?: boolean
  lines?: number
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border bg-card p-6 shadow-lg",
        className
      )}
      {...props}
    >
      {hasHeader && (
        <div className="mb-4 space-y-2">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              "h-4",
              i === lines - 1 ? "w-3/4" : "w-full"
            )}
          />
        ))}
      </div>
    </div>
  )
}

function SkeletonButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      className={cn(
        "h-12 w-32 rounded-xl",
        className
      )}
      {...props}
    />
  )
}

function SkeletonInput({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton
        className={cn(
          "h-12 w-full rounded-xl",
          className
        )}
        {...props}
      />
    </div>
  )
}

function SkeletonGrid({
  columns = 3,
  items = 6,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  columns?: number
  items?: number
}) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2", 
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        gridCols[columns as keyof typeof gridCols] || "grid-cols-3",
        className
      )}
      {...props}
    >
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

function SkeletonAvatar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      className={cn(
        "h-12 w-12 rounded-full",
        className
      )}
      {...props}
    />
  )
}

function SkeletonText({
  lines = 1,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  lines?: number
}) {
  if (lines === 1) {
    return (
      <Skeleton
        className={cn("h-4 w-full", className)}
        {...props}
      />
    )
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full",
            className
          )}
        />
      ))}
    </div>
  )
}

export { 
  Skeleton, 
  SkeletonCard, 
  SkeletonButton, 
  SkeletonInput, 
  SkeletonGrid, 
  SkeletonAvatar, 
  SkeletonText 
}