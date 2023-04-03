// import navlink icon from react-icons
import { FaUserCircle } from "react-icons/fa";

// import react components
import { NavLink } from "react-router-dom";

interface Props {
	name: string;
}

export const UserStats = (props: Props): JSX.Element => {
	return (
		<section className="homePage__userStats">
			<div className="homePage__userStats--text">
				<div className="homePage__userStats--text-left">
					{<h1>Hey, {props.name}</h1>}
					<p>Check out your progress.</p>
				</div>
				<div className="homePage__userStats--text-right">
					<NavLink to="/profile">
						<FaUserCircle className="react-icon" />
					</NavLink>
				</div>
			</div>
			<div className="homePage__userStats--displays">
				<div className="homePage__userStats--display-left">
					<h2>100</h2>
					<p>
						Completed <br />
						Workouts
					</p>
				</div>
				<div className="homePage__userStats--display-right">
					<div className="homePage__userStats--display-right-child">
						<h2>420</h2>
						<p>Total Exercises</p>
					</div>
					<div className="homePage__userStats--display-right-child">
						<h2>1337</h2>
						<p>Total Repetitions</p>
					</div>
				</div>
			</div>
		</section>
	);
};
