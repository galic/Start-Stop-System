
//Convert unix timestamp to time string
export function timestampToTime(s: number | undefined): string {

    if (s === undefined) return ''

    //console.log('timestampToTime', s)
    const offset = (new Date()).getTimezoneOffset() * 60000 //offset in milliseconds

    console.log('timestampToTime offset', offset)

    const dtFormat = new Intl.DateTimeFormat('en-GB', {
        timeStyle: 'medium',
        timeZone: 'UTC'
    });

    return dtFormat.format(new Date(s - offset));
}

