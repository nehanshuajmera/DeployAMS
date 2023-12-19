import React from 'react'

export default function Header() {
	return (
		<div>
			<div className="universalDetailsAdmin">
				<div className="cllgLogo">
					<img src="https://medicaps.ac.in/resources/img/logo-navbar.png" alt="CollegeLogo" />
				</div>
				<div className="logoutButton">
					<button onClick={handellogout}>Logout</button>
				</div>
			</div>
			<hr className="styleHr" />
		</div>
	)
}
