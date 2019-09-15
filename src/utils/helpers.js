export function formatDate(time) {
    let dateTime = new Date(time * 1000)
    .toLocaleString()
    .replace(/:\d{2}\s/, " ");
    return dateTime
}