import { useState } from "react/cjs/react.development";
import MemberSelect from "../components/MemberSelect";

function InviteToCard(popupData) {
  const [availableMembers, setAvailableMembers] = useState(popupData.availableMembers);

  return (
    <div className="invite-to-card">
      <MemberSelect members={availableMembers} addMember={popupData.addMember} />
    </div>
  )
}

export default InviteToCard;