import dayjs from 'dayjs';


export interface TimeSlot {
    time: dayjs.Dayjs;
    formatted: string;
}; 