import { Skeleton } from "@/components/ui/skeleton"

const CardSkeleton = () => {
  return (
    <div className="w-[30%] xl:w-[48%] md:w-full h-[450px] dark:bg-slate-800 bg-[#bfbfbf] flex flex-col rounded-xl text-center box-border">
      <Skeleton className="w-full h-80 rounded-t-xl" />
      <div className="w-full h-16 flex items-center justify-center">
        <Skeleton className="w-20 h-8 rounded" />
      </div>
      <Skeleton className="w-3/4 h-6 mx-auto mt-2" />
      <Skeleton className="w-5/6 h-4 mx-auto mt-2" />
    </div>
  )
}

export default CardSkeleton