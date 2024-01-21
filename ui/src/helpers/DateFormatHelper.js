export function formatDate(inputDate) {
    const dateObject = new Date(inputDate);

    const formattedDate = dateObject.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return formattedDate;
}


export function reverseDateFormat(inputDate) {
    const [day, month, year] = inputDate.split('.');

    const reversedDateObject = new Date(`${year}-${month}-${day}`);

    // Extract day, month, and year from the reversed date
    const reversedDay = reversedDateObject.getDate();
    const reversedMonth = reversedDateObject.getMonth() + 1; // Mesiace od nuly
    const reversedYear = reversedDateObject.getFullYear();

    // "D-M-YYYY"
    const reversedFormattedDate = `${reversedDay}-${reversedMonth}-${reversedYear}`;

    return reversedFormattedDate;
}



