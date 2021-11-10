import DateDisplay from '../components/Date';

function EditBoard(popupData) {
  return (
    <div className="edit-board">
      <DateDisplay date={popupData.board.create_date} />
      <DateDisplay date={popupData.board.last_edited} />
      <form className="frm">

      </form>
    </div>
  )
}

export default EditBoard;