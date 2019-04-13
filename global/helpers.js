module.exports = {
    dateFormat: new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour:'numeric',
        minute:'numeric',
        timeZone:'UTC',
        hour12: false
    })
}