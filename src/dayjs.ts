import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime); // Relative time formatting
dayjs.extend(timezone);

require('dayjs/locale/nb');

dayjs.locale('nb'); // use loaded locale globally
dayjs.extend(localizedFormat);

const tz = dayjs.tz.guess(); // Guess the users local timezone
dayjs.tz.setDefault(tz);

export default dayjs;
