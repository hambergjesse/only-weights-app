import axios from "axios";

export const Exercises = (): JSX.Element => {
  const apiKey: string = process.env.EXERCISE_API as string;

  const exerciseApi = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      axios
        .get("https://api.api-ninjas.com/v1/exercises", {
          headers: { "X-Api-Key": apiKey },
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error("Error: ", error.response.data);
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("error");
    }
  };

  return <></>;
};
