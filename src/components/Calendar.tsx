import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { EventContentArg } from "@fullcalendar/core";
import "../calendar.css";
import { caluculateDailyBalances } from "../utils/financeCalculations";
import { Balance, CanlendarContent, Transaction } from "../types";
import { formatCurrency } from "../utils/formatting";

interface CalendarProps {
  monthlyTransactions: Transaction[];
}
const Calendar = ({ monthlyTransactions }: CalendarProps) => {
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
    console.log(eventInfo);
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
  console.log(dailyBalances);

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

  const createEvents = createCalendarEvents(dailyBalances);
  console.log(createEvents);
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale={jaLocale}
      events={createEvents}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
