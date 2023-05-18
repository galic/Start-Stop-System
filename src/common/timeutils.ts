const offset = (new Date()).getTimezoneOffset() * 60000 //offset in milliseconds

const formatter = new Intl.DateTimeFormat('ru-RU', {
    timeStyle: 'medium',
    timeZone: 'UTC'
});

export function formatTime(s: number): string {
    return formatter.format(new Date(s-offset));
}

export function formatUTCTime(s: number): string {
    return formatter.format(new Date(s));
}

export function subtractDate(d1: Date, d2: Date): number {
    return d1.getTime() - d2.getTime()
}
