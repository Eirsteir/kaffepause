import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

require('dayjs/locale/nb');

dayjs.locale('nb'); // use loaded locale globally
dayjs.extend(localizedFormat);

export default dayjs;
