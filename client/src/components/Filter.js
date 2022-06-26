import Wrapper from "../assets/wrappers/Filter";
import { useAppContext } from "../context/appContext";

const Filter = () => {
  const { filter, changeFilter } = useAppContext()
  return (
    <Wrapper>
      <select
        onChange={(e) => changeFilter(e.target.value)}
        name="status" id="cars">
        <option value="">All</option>
        <option value="accepted">Accepted</option>
        <option value="declined">Declined</option>
        <option value="pending">Pending</option>
      </select>
    </Wrapper>
  )
}

export default Filter