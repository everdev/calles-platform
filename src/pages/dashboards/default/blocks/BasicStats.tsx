import { Fragment } from 'react';

import { toAbsoluteUrl } from '@/utils/Assets.ts';

interface IChannelStatsItem {
  logo: string;
  logoDark?: string;
  info: string;
  desc: string;
  path: string;
}
interface IChannelStatsItems extends Array<IChannelStatsItem> {}

const BasicStats = () => {
  const items: IChannelStatsItems = [
    { logo: 'support-ticket.svg', info: '9.3k', desc: 'Amazing mates', path: '' },
    { logo: 'inventory-management.svg', info: '24k', desc: 'Lessons Views', path: '' },
    { logo: 'customer.svg', info: '608', desc: 'New subscribers', path: '' },
    {
      logo: 'support-ticket.svg',
      logoDark: 'support-ticket.svg',
      info: '2.5k',
      desc: 'Stream audience',
      path: ''
    }
  ];

  const renderItem = (item: IChannelStatsItem, index: number) => {
    return (
      <div
        key={index}
        className="card flex-col justify-between gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg"
      >
        {item.logoDark ? (
          <>
            <img
              src={toAbsoluteUrl(`/media/basic/${item.logo}`)}
              className="dark:hidden w-9 mt-4 ms-5"
              alt=""
            />
            <img
              src={toAbsoluteUrl(`/media/basic/${item.logoDark}`)}
              className="light:hidden w-9 mt-4 ms-5"
              alt=""
            />
          </>
        ) : (
          <img
            src={toAbsoluteUrl(`/media/basic/${item.logo}`)}
            className="w-9 mt-4 ms-5"
            alt=""
          />
        )}

        <div className="flex flex-col gap-1 pb-4 px-5">
          <span className="text-3xl font-semibold text-gray-900">{item.info}</span>
          <span className="text-2sm font-normal text-gray-700">{item.desc}</span>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <style>
        {`
          .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3.png')}');
          }
          .dark .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3-dark.png')}');
          }
        `}
      </style>

      {items.map((item, index) => {
        return renderItem(item, index);
      })}
    </Fragment>
  );
};

export { BasicStats, type IChannelStatsItem, type IChannelStatsItems };
