import { Suspense } from 'react';
import {  montserrat } from '@/app/ui/fonts';
import VoluntiersTable from '@/app/ui/customers/table';

import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
 
export default async function Page({
    searchParams
}: {
    searchParams?: {
        query?: string
        page?: string
    }
}) {
    const query = searchParams?.query || ''

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${montserrat.className} mb-5 text-2xl`}>Voluntiers</h1>
      </div>
       <Suspense key={query} fallback={<InvoicesTableSkeleton />}>
        <VoluntiersTable query={query}  />
      </Suspense>
    </div>
  );
}