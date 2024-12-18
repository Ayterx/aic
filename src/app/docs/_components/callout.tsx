import { InformationCircleIcon } from "@heroicons/react/24/outline"

export const Callout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start gap-2 rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-2 text-sm text-blue-500 prose-p:m-0">
      <InformationCircleIcon className="h-5 min-w-5" />
      {children}
    </div>
  )
}
