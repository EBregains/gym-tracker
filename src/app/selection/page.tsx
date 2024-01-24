import Search from "@/ui/search";
import Table from "@/ui/selection/table";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SelectionPage({
  searchParams
}:{
  searchParams?: {
    query?: string
  }
}) {

  let query = searchParams?.query || "";
  
  return (
    <>
      <div className="flex flex-col col-span-4 max-h-[calc(100vh-50px)]">
      <div className='flex items-center mb-4'>
          <Link href='/' className="flex justify-center items-center size-6 mr-3 border border-text-200">
            <ChevronLeftIcon className="size-4 text-text-200"/>
          </Link>
          <h1 className='text-2xl uppercase font-bold'>Pick an exercise</h1>
        </div>
        <div
          className="mb-4">
        <Search placeholder="Start typing to search" />
        </div>
        <Table query={query}></Table>
      </div>
    </>
  );

}