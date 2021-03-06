import { FaTimes } from 'react-icons/fa';
import '../styles/Popup.scss';
const { createContext, useState, useCallback, useEffect, useContext, isValidElement, cloneElement } = require("react");

const PopupContext = createContext(null);

function PopupProvider({ children }) {
  const [popup, setPopup] = useState(null);

  //Lav en ny popup ud fra paramenter
  const createPopup = useCallback((content, title = "", submitAction = undefined) => {
    setPopup({ content: content, title: title, submitAction: submitAction });
  }, [setPopup]);

  const createDialogue = useCallback(
    (title = "", confirmButton = undefined, cancelAction = closePopup, submitAction = undefined) => {
      setPopup({
        content: <Dialogue
          confirmButton={confirmButton}
          cancelAction={cancelAction}
          submitAction={submitAction}
        />,
        title: title,
        submitAction: submitAction
      })
    },
    [setPopup],
  )

  function closePopup() {
    setPopup(null);
  }

  return (
    <PopupContext.Provider value={{ createPopup, createDialogue, closePopup }}>
      {/* Hvis popup ikke er null, opret en ny popup */}
      {popup !== null &&
        <div className="popup-container">
          <Popup popup={popup} close={closePopup} />
          <div className="background" onClick={closePopup}></div>
        </div>
      }
      {/* Render komponentets børn */}
      {children}
    </PopupContext.Provider>
  )
}

function usePopup() {
  return useContext(PopupContext);
}

function Popup({ popup, close }) {
  //Lyt efter keypresses og send dem til keyhandler
  useEffect(() => {
    window.addEventListener("keydown", keyHandler);

    //Fjern listener, når popup lukkes
    return () => {
      window.removeEventListener("keydown", keyHandler);
    }
  }, []);

  //Hvis brugeren trykker på escape, lukker popup vinduet
  const keyHandler = useCallback((e) => {
    if (e.keyCode === 27) {
      close();
    }
  }, []);

  return (
    <div className="popup">
      <div className="title-bar">
        <h1>{popup.title}</h1>
        <button className="btn close" onClick={close}><FaTimes /></button>
      </div>
      <section className="content">
        { //Hvis popup.content er et validt element, opret et nyt element med parameter
          //Ellers render elementet
          isValidElement(popup.content) ?
            cloneElement(popup.content, {
              submitAction: popup.submitAction,
              close: close
            })
            :
            popup.content
        }
      </section>
    </div>
  )
}

function Dialogue({ confirmButton, cancelAction, submitAction }) {
  return (
    <div className="dialogue btn-container">
      <button className="btn" onClick={cancelAction}>Annuller</button>
      <button className={`btn 
      ${confirmButton.class &&
        confirmButton.class}`}
        onClick={submitAction}>
        {confirmButton.text}
      </button>
    </div>
  )
}

export { PopupContext, usePopup };
export default PopupProvider;