import axios from "axios";

export const Exercises = () => {
  const apiKey: string = process.env.EXERCISE_API as string;

  const exerciseApi = async (event: any) => {
    event.preventDefault();
    try {
      axios
        .get("https://api.api-ninjas.com/v1/exercises?muscle=*", {
          headers: { "X-Api-Key": apiKey },
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error("Error: ", error.response.data);
        });
    } catch (err: any) {
      console.log("error");
    }
  };

  return <></>;
};
