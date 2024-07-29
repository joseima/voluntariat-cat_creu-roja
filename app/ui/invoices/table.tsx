import Image from 'next/image';
import { UpdateActivity, DeleteActivity } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const activities = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {activities?.map((activity) => (
              <div
                key={activity.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={activity.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${activity.name}'s profile picture`}
                      />
                      <p>{activity.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{activity.email}</p>
                  </div>
                  <InvoiceStatus status={activity.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {activity.title}
                    </p>
                    <p>{formatDateToLocal(activity.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateActivity id={activity.id} />
                    <DeleteActivity id={activity.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <section className="hidden min-w-full text-gray-900 md:grid activities-panel">
              {activities?.map((activity) => (
                <div
                  key={activity.id}
                  className={`${activity.status} activity-item w-full border-b flex p-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg`}
                >
                  <div className="p-3 bg-gray-50 rounded-lg w-full">
                    <h3 className="text-lg pb-3 text-gray-600 font-semibold">
                      {activity.title}
                    </h3>
                    <div>
                      {activity.description}
                    </div>
                    <div className="py-3 text-right text-xs">
                      <b>{formatDateToLocal(activity.date)}</b>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                        <Image
                          src={activity.image_url}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${activity.name}'s profile picture`}
                        />
                        <b>{activity.name}</b>
                      </div>
                  <div className=" px-3 py-3">
                    {activity.email}
                  </div>
                  <div className="flex items-center gap-3">
                  <div className=" px-3 py-3">
                    <InvoiceStatus status={activity.status} />
                  </div>
                    <div className="flex justify-end gap-3">
                      <UpdateActivity id={activity.id} />
                      <DeleteActivity id={activity.id} />
                    </div>
                  </div>
                </div>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}
