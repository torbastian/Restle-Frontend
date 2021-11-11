import '../styles/Date.scss';

function DateDisplay({ date, short = false, title = null }) {

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
    <div className={`date ${title ? 'border' : ''}`}>
      {title !== null &&
        <h1 className="date-title">{title}</h1>
      }
      <p>
        {short ? parseDateShort() : parseDate()}
      </p>
    </div>
  )
}

export default DateDisplay;