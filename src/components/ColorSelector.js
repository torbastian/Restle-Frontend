import { useEffect, useState } from "react";
import { HexColorPicker } from 'react-colorful';
import "../styles/ColorSelector.scss";
import UserIcon from "./UserIcon";

function ColorSelector({ user, color, setColor, showBackground = false, showTitle = false }) {
	const [active, setActive] = useState(false);

	useEffect(() => {

	}, [user]);

	return (
		<div className={`color-container ${showBackground && "background"}`}>
			{user !== undefined &&
				<UserIcon user={user} />
			}
			<div className="color-select">
				<label>Color:</label>
				<div className="color-preview"
					onClick={() => setActive(!active)}
					style={{ backgroundColor: color !== "" ? color : "#fff" }}
				>
					{color}
				</div>
				<HexColorPicker className={!active && "hidden"} onMouseLeave={() => setActive(false)} color={color} onChange={setColor} />
			</div>
		</div>
	)
}

export default ColorSelector;