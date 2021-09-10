import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getTodaysDate } from "../../../utils/getTodaysDate";
import toast from "react-hot-toast";

interface CalanderProp {
  change: (e: any) => void;
}

const CalanderComponent = ({ change }: CalanderProp) => {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        themeSystem={"standard"}
        selectable={true}
        handleWindowResize={true}
        headerToolbar={{
          start: "title",
          center: "",
          end: "",
        }}
        footerToolbar={{ left: "", center: "", right: "prev,next" }}
        dateClick={(e) => {
          //Controll that the date the user picked hasen't already passed
          const todaysDate = new Date(getTodaysDate()).getTime();
          const datePickedByGuest = new Date(e.dateStr).getTime();
          if (todaysDate > datePickedByGuest) {
            return toast.error("Day you picked has already passed");
          } else {
            //Update parent state object
            change(e.dateStr);
          }
        }}
      />
    </>
  );
};

export default CalanderComponent;
