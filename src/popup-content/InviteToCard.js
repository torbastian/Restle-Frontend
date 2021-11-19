import { useState } from "react/cjs/react.development";
import MemberSelect from "../components/MemberSelect";

function InviteToCard(popupData) {
  const [availableMembers, setAvailableMembers] = useState(popupData.availableMembers);

  function doAddMember(members) {
    popupData.addMember(members);
    popupData.close();
  }

  return (
    <div className="invite-to-card">
      <MemberSelect members={availableMembers} addMember={doAddMember} />
    </div>
  )
}

export default InviteToCard;