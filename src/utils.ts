import dayjs, { Dayjs } from 'dayjs';
import { SendVerificationRequestParams } from "next-auth/providers";
import { Resend } from 'resend';
import MagicLinkTemplate from '@/components/emailTemplate';


export const getInitialsFromName = (name: string): string => {
    return 'name';
};

export const socialTextTruncated = (
  displayName: string,
  total: number,
): string => {
  if (total === 0) {
    return 'Med ingen andre';
  }
  const pluralSuffix = total > 2 ? 'andre' : 'annen';
  const suffix = total < 2 ? '' : ` og ${total - 1} ${pluralSuffix}`;
  return 'Med ' + displayName + suffix;
};

function nextTimeQuarterHour(time = new Date()) {
  const timeToReturn = new Date(time);

  timeToReturn.setMilliseconds(
    Math.ceil(timeToReturn.getMilliseconds() / 1000) * 1000,
  );
  timeToReturn.setSeconds(Math.ceil(timeToReturn.getSeconds() / 60) * 60);
  timeToReturn.setMinutes(Math.ceil(timeToReturn.getMinutes() / 15) * 15);
  return dayjs(timeToReturn);
}

export const generateTimeSlots = (): Dayjs[] => {
  const interval = parseInt(
    process.env.NEXT_PUBLIC_BREAK_PLANNER_TIME_SLOT_INVERVAL_IN_MINUTES,
  );
  const times: Dayjs[] = [];
  let start = nextTimeQuarterHour();
  const end = dayjs().endOf('day');

  while (start.isBefore(end) || start.isSame(end)) {
    times.push(start);
    start = start.add(interval, 'minutes');
  }

  return times;
};



export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { url } = params;
    const { host } = new URL(url);
    await resend.sendEmail({
      from: process.env.EMAIL_FROM!,
      to: params.identifier,
      subject: `Sign into ${host} `,
      react:  MagicLinkTemplate({ host: host, url: url}),
    });
};
