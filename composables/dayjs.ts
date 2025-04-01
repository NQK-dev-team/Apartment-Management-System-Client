import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { useRuntimeConfig } from '#imports';

dayjs.extend(timezone);

export const useDayjs = () => {
  const config = useRuntimeConfig();

  function getDayJsObject(date: string): dayjs.Dayjs {
    return dayjs(date).tz();
  }

  return { getDayJsObject };
};
