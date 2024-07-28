import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { montserrat } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  voluntiers: UserGroupIcon,
  pending: ClockIcon,
  activities: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfActivities,
    numberOfVoluntiers,
    totalPendingActivities,
  } = await fetchCardData();
  
  return (
    <>
      <Card title="Pending" value={totalPendingActivities} type="pending" />
      <Card title="Total activities" value={numberOfActivities} type="activities" />
      <Card
        title="Total Voluntiers"
        value={numberOfVoluntiers}
        type="voluntiers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'activities' | 'voluntiers' | 'pending' ;
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${montserrat.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
