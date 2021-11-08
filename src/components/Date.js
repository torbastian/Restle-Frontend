import '../styles/Date.scss';

function DateDisplay({ date, short = false }) {

  function parseDate() {
    const msec = Date.parse(date);
    const d = new Date(msec);

    const parsedDate = d.toLocaleString('da-DK', {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).toUpperCase();

    return parsedDate;
  }

  function parseDateShort() {
    const msec = Date.parse(date);
    const d = new Date(msec);
    const today = new Date();

    var parsedDate;

    if (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    ) {
      parsedDate = d.toLocaleString('da-DK', {
        hour: "2-digit",
        minute: "2-digit"
      }).toUpperCase();
    } else {
      parsedDate = d.toLocaleString('da-DK', {
        day: "2-digit",
        month: "short",
        year: "2-digit"
      }).toUpperCase();
    }

    return parsedDate;
  }

  return (
    <p className="date">
      {short ? parseDateShort() : parseDate()}
    </p>
  )
}

export default DateDisplay;