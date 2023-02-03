interface Props {
  name: string;
}

export const UserStats = (props: Props): JSX.Element => {
  return (
    <section className="homePage__userStats">
      <div className="homePage__userStats--text">
        {<h1>Hey, {props.name}</h1>}
        <p>Check out your progress.</p>
      </div>
      <div className="homePage__userStats--displays">
        <div className="homePage__userStats--display-left">
          <h2>00</h2>
          <p>
            Completed <br />
            Workouts
          </p>
        </div>
        <div className="homePage__userStats--display-right">
          <div className="homePage__userStats--display-right-child"></div>
          <div className="homePage__userStats--display-right-child"></div>
        </div>
      </div>
    </section>
  );
};
