// Get time from nanoseconds to Milliseconds
import dayjs from 'dayjs';

export const formatNanoDateTime = (ctime: string, formatTemplate = 'ddd, D MMM, YYYY') =>
  dayjs(Number(ctime) / 1000000).format(formatTemplate);
