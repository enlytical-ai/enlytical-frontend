exports.getMontheInText = (monthInNumber) => {
    const monthObj = {
        "1": "Jan",
        "2": "Feb",
        "3": "Mar",
        "4": "Apr",
        "5": "May",
        "6": "Jun",
        "7": "Jul",
        "8": "Aug",
        "9": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec",
    }
    const month = `${monthInNumber}`;
    return monthObj[month];
}

exports.getMonthAndYearArray = (past, future, inputDate) => {
    const input = new Date(inputDate);
    const pastDate = new Date(input);
    const futureDate = new Date(input);
    pastDate.setMonth(pastDate.getMonth() - past);
    futureDate.setMonth(futureDate.getMonth() + future);
    const dateArray = [];
    for (let i = 0; i <= 6; i++) {
        const date = new Date(pastDate);
        date.setMonth(date.getMonth() + i);
        const monthInText = this.getMontheInText(date.getMonth() + 1);
        const year = date.getFullYear();
        dateArray.push(`${monthInText}-${year}`);
    }
    return dateArray
}