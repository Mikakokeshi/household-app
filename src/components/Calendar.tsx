import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import "../calendar.css";
import { caluculateDailyBalances } from "../utils/financeCalculations";
import { Balance, CanlendarContent, Transaction } from "../types";
import { formatCurrency } from "../utils/formatting";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
}
const Calendar = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
}: CalendarProps) => {
  const events = [
    { title: "Meeting", start: new Date() },
    {
      title: "aaaa",
      start: "2024-07-25",
      income: 2000,
      expense: 300,
      balance: 1700,
    },
  ];

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  const dailyBalances = caluculateDailyBalances(monthlyTransactions);

  const createCalendarEvents = (
    dailyBalances: Record<string, Balance>
  ): CanlendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };

  const calendarEvents = createCalendarEvents(dailyBalances);

  const handleDateSet = (datasetInfo: DatesSetArg) => {
    const currentMonth = datasetInfo.view.currentStart;
    const todaysDate = new Date();
    setCurrentMonth(currentMonth);
    //選択月が今月の場合のみ、自動で今日の日付にリセット
    if (isSameMonth(todaysDate, currentMonth)) {
      setCurrentDay(today);
    }
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={jaLocale}
      events={createEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;
