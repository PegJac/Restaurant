import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CalanderProp {
  change: (e: any) => void;
}

const CalanderComponent = ({ change }: CalanderProp) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      editable={true}
      themeSystem={"standard"}
      selectable={true}
      handleWindowResize={true}
      hiddenDays={[1, 2]}
      headerToolbar={{
        start: "title",
        center: "",
        end: "",
      }}
      footerToolbar={{ left: "", center: "", right: "prev,next" }}
      dateClick={(e) => {
        change(e.dateStr);
      }}
    />
  );
};

export default CalanderComponent;
