import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
const Experiences = () => {
  return (
    <div className="mx-auto w-full max-w-7xl" id="work">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
