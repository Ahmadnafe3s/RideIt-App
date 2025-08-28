export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}


export function formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return (hours && remainingMinutes) ? `${hours} h : ${remainingMinutes} m` : hours ? `${hours} h` : `${remainingMinutes} m`;
}


