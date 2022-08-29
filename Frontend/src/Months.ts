//Testing git
enum Months {
    JANUARY = 1,
    FEBRUARY,
    MARCH,
    APRIL,
    MAY,
    JUNE,
    JULY,
    AUGUST,
    SEPTEMBER,
    OCTOBER,
    NOVEMBER,
    DECEMBER,
}

export default class Month {

    public static getDaysInMonth(month: Months, year: number) {
        switch (month) {
            case Months.JANUARY:
                return 31;
            case Months.FEBRUARY:
                return 28 + (year % 4 == 0 ? 1 : 0);
            case Months.MARCH:
                return 31;
            case Months.APRIL:
                return 30;
            case Months.MAY:
                return 31;
            case Months.JUNE:
                return 30;
            case Months.JULY:
                return 31;
            case Months.AUGUST:
                return 31;
            case Months.SEPTEMBER:
                return 30;
            case Months.OCTOBER:
                return 31;
            case Months.NOVEMBER:
                return 30;
            case Months.DECEMBER:
                return 31;
        }
    }

    private static checkDateString(dateString: string): number[] {
        let month = +dateString.substring(0, 2);
        let day = +dateString.substring(3, 5);
        let year = +dateString.substring(6);



        if (month < 1 || month > 12)
            throw new Error('Month was not in bounds: ' + month);
        if (day < 1 || day > this.getDaysInMonth(month, year))
            throw new Error('Day was not in bound of month: ' + day);

        return [month, day, year];
    }

    public static getFirstDayOfWeekFromString(dateString: string): string {
        let date = this.checkDateString(dateString);

        return this.getFirstDayOfWeek(date[0], date[1], date[2]);
    }

    private static getFirstDayOfWeek(month: number, day: number, year: number): string {
        let dayOfWeek = this.getDayOfTheWeek(month, day, year);

        let newDay = day - dayOfWeek;

        if (newDay <= 0) {
            if (month == 1)
                year -= 1;
            month = --month == 0 ? Months.DECEMBER : month;
            let totalDaysInNewMonth = this.getDaysInMonth(month, year);

            newDay += totalDaysInNewMonth;
        }

        return month.toString().padStart(2, "0") + "/" + newDay.toString().padStart(2, "0") + "/" + year;
    }

    public static getDayOfTheWeekFromString(dateString: string): number {
        let date = this.checkDateString(dateString);

        return this.getDayOfTheWeek(date[0], date[1], date[2]);
    }

    /**
     * This method takes in the month, day, and year to calculate the day of the week of given date.
     *
     * To be quite honest I don't really know how this algorithm works I just know it does. Here is the link to where
     * I found the code at {@link https://www.hackerearth.com/blog/developers/how-to-find-the-day-of-a-week/}
     *
     * @param month The month given in standard 1-12 : January-December respectively.
     * @param day The day of the month 1-{28, 29, 30, 31}.
     * @param year The year. Ex: 2022.
     *
     * @return The number associated with a day of the week.
     * 0: Sunday
     * 1: Monday
     * 2: Tuesday
     * 3: Wednesday
     * 4: Thursday
     * 5: Friday
     * 6: Saturday
     */
    private static getDayOfTheWeek(month: number, day: number, year: number): number {
        let t: number[] = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];

        year -= month < 3 ? 1 : 0;
        return Math.trunc((year + year / 4 - year / 100 + year / 400 + t[month - 1] + day) % 7);
    }
}