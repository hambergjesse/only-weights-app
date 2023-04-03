import { render, screen } from "@testing-library/react";
import UserProvider, {
	useUserDataContext,
	useUserAuthContext,
} from "./UserProvider";

describe("UserProvider", () => {
	test("renders children", () => {
		render(
			<UserProvider>
				<div>Child Component</div>
			</UserProvider>
		);
		expect(screen.getByText("Child Component")).toBeInTheDocument();
	});

	test("provides UserDataContext", () => {
		function Consumer() {
			const { userData, setUserData } = useUserDataContext();
			return (
				<div>
					<span>{userData.name}</span>
					<button
						onClick={() =>
							setUserData({ email: "test@test.com", name: "Test User" })
						}
					>
						Set User Data
					</button>
				</div>
			);
		}
		render(
			<UserProvider>
				<Consumer />
			</UserProvider>
		);
		const nameElement = screen.getByText("");
		const buttonElement = screen.getByText("Set User Data");
		expect(nameElement).toBeInTheDocument();
		expect(buttonElement).toBeInTheDocument();
		buttonElement.click();
		expect(nameElement).toHaveTextContent("Test User");
	});

	test("provides UserAuthContext", () => {
		function Consumer() {
			const { isAuth, setIsAuth } = useUserAuthContext();
			return (
				<div>
					<span>{isAuth.toString()}</span>
					<button onClick={() => setIsAuth(true)}>Log In</button>
				</div>
			);
		}
		render(
			<UserProvider>
				<Consumer />
			</UserProvider>
		);
		const isAuthElement = screen.getByText("false");
		const buttonElement = screen.getByText("Log In");
		expect(isAuthElement).toBeInTheDocument();
		expect(buttonElement).toBeInTheDocument();
		buttonElement.click();
		expect(isAuthElement).toHaveTextContent("true");
	});
});
