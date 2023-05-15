import { useUserDataContext } from "../../components/ContextProvider";
import Navigation from "../../components/Navigation/Navigation";
import { useState, FormEvent } from "react";

// import necessary hooks/functions
import useFetchUserData from "../../services/fetchUserData";
import api from "../../services/api";

type Exercise = {
	exName: string;
	reps: number;
	sets: number;
	notes?: string;
};

type Workout = {
	title: string;
	exercises: Exercise[];
};

const createWorkout = async (workout: Workout, token: string) => {
	console.table(workout);
	const response = await api.post(
		"/api/add-workout",
		{ workout },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	console.log(response.data);
	return response.data;
};

export const WorkoutPage = (): JSX.Element => {
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [title, setTitle] = useState<string>("");
	const [exName, setExName] = useState<string>("");
	const [reps, setReps] = useState<string>("");
	const [sets, setSets] = useState<string>("");
	const [notes, setNotes] = useState<string>("");
	const [saving, setSaving] = useState<boolean>(false);

	const [toggleCreator, setToggleCreator] = useState<boolean>(false);

	console.log(title);

	// fetch user-data
	useFetchUserData();

	const handleAddExercise = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newExercise: Exercise = {
			exName,
			reps: parseInt(reps),
			sets: parseInt(sets),
			notes,
		};
		setExercises([...exercises, newExercise]);
		setExName("");
		setReps("");
		setSets("");
		setNotes("");
	};

	const handleSaveWorkout = async () => {
		setSaving(true);
		const workout: Workout = {
			title: title,
			exercises: [...exercises],
		};
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("No token found");
			}
			await createWorkout(workout, token);
			console.table(workout);
			console.log(token);

			// fetch user-data
			setExercises([]);
			setTitle("");
		} catch (error) {
			console.error(error);
		} finally {
			setSaving(false);
		}
	};

	// context that stores userdata
	const { userData } = useUserDataContext();

	return (
		<main className="workoutPage__wrapper">
			<div className="workoutPage__container">
				<h1>Saved workouts</h1>
				<section className="workoutPage__list">
					{userData?.workouts && userData.workouts.length > 0 ? (
						userData?.workouts.map((workout: Workout, index: number) => (
							<div className="workoutPage__list--item" key={index}>
								<h2>{workout.title}</h2>
								{workout?.exercises.map((exercise: Exercise, index: number) => (
									<div key={index}>
										<h3>{exercise.exName}</h3>
										<p>
											{exercise.reps} x {exercise.sets}
										</p>
										{exercise.notes && <p>{exercise.notes}</p>}
									</div>
								))}
							</div>
						))
					) : (
						<p>Created workouts will be displayed here.</p>
					)}
				</section>
				<button
					style={{ border: "1px solid #ffa600" }}
					onClick={() => setToggleCreator(!toggleCreator)}
				>
					{toggleCreator === false ? "Create New Workout" : "Stop Creating"}
				</button>
				{toggleCreator && (
					<section className="workoutPage__create">
						<h2>Create New Workout</h2>
						<label htmlFor="">Workout title:</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<form id="addForm" onSubmit={handleAddExercise}>
							<label htmlFor="">Exercise name:</label>
							<input
								type="text"
								value={exName}
								onChange={(e) => setExName(e.target.value)}
							/>
							<div className="workoutPage__create--numbers">
								<div>
									<label htmlFor="">Reps:</label>
									<input
										type="number"
										value={reps}
										onChange={(e) => setReps(e.target.value)}
									/>
								</div>
								<p>x</p>
								<div>
									<label htmlFor="">Sets:</label>
									<input
										type="number"
										value={sets}
										onChange={(e) => setSets(e.target.value)}
									/>
								</div>
							</div>
							<label htmlFor="">Notes:</label>
							<textarea
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
							/>
							<button type="submit" form="addForm" value="Submit">
								Add Exercise
							</button>
						</form>
						<h3>{title}</h3>
						{exercises.map((exercise, index) => (
							<div key={index}>
								<h3>{exercise.exName}</h3>
								<p>
									{exercise.reps} x {exercise.sets}
								</p>
								<p>{exercise.notes}</p>
							</div>
						))}
						<button onClick={handleSaveWorkout} disabled={saving}>
							{saving ? "Saving..." : "Save Workout"}
						</button>
					</section>
				)}
			</div>
			<Navigation />
		</main>
	);
};
