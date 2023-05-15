import { useUserDataContext } from "../../components/ContextProvider";
import Navigation from "../../components/Navigation/Navigation";
import { useState, FormEvent } from "react";

// import necessary hooks/functions
import useFetchUserData from "../../services/fetchUserData";
import api from "../../services/api";

type Exercise = {
	name: string;
	reps: number;
	sets: number;
	notes?: string;
};

type Workout = {
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
	const [name, setName] = useState<string>("");
	const [reps, setReps] = useState<string>("");
	const [sets, setSets] = useState<string>("");
	const [notes, setNotes] = useState<string>(""); // Make sure to set the initial state for notes as an empty string
	const [saving, setSaving] = useState<boolean>(false);

	// fetch user-data
	useFetchUserData();

	const handleAddExercise = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newExercise: Exercise = {
			name,
			reps: parseInt(reps),
			sets: parseInt(sets),
			notes,
		};
		setExercises([...exercises, newExercise]);
		setName("");
		setReps("");
		setSets("");
		setNotes("");
	};

	const handleSaveWorkout = async () => {
		setSaving(true);
		const workout: Workout = {
			exercises: [...exercises], // Make sure to pass the array of exercises inside an object with the "exercises" property
		};
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("No token found");
			}
			await createWorkout(workout, token);
			console.table(workout);
			console.log(token);

			setExercises([]);
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
			<h1>My Workouts</h1>
			<div className="workoutPage__container">
				<h2>Create New Workout</h2>
				<form id="addForm" onSubmit={handleAddExercise}>
					<label htmlFor="">Name:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<label htmlFor="">Reps:</label>
					<input
						type="number"
						value={reps}
						onChange={(e) => setReps(e.target.value)}
					/>
					<label htmlFor="">Sets:</label>
					<input
						type="number"
						value={sets}
						onChange={(e) => setSets(e.target.value)}
					/>
					<label htmlFor="">Notes:</label>
					<input
						type="text"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
					/>
					<button type="submit" form="addForm" value="Submit">
						Add Exercise
					</button>
				</form>
				{exercises.map((exercise, index) => (
					<div key={index}>
						<h3>{exercise.name}</h3>
						<p>
							{exercise.reps} x {exercise.sets}
						</p>
						<p>{exercise.notes}</p>
					</div>
				))}
				<button onClick={handleSaveWorkout} disabled={saving}>
					{saving ? "Saving..." : "Save Workout"}
				</button>
				<h2>My Workouts</h2>
				<section className="workoutPage__list">
					{userData?.workouts && userData.workouts.length > 0 ? (
						userData?.workouts.map((workout: Workout, index: number) => (
							<div className="workoutPage__list--item" key={index}>
								<h3>temp name</h3>
								{workout?.exercises.map((exercise: Exercise, index: number) => (
									<div key={index}>
										<p>{exercise.name}</p>
										<p>
											{exercise.reps} x {exercise.sets}
										</p>
										{exercise.notes && <p>{exercise.notes}</p>}
									</div>
								))}
							</div>
						))
					) : (
						<></>
					)}
				</section>
			</div>
			<Navigation />
		</main>
	);
};
