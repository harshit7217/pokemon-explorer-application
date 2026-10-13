const SortingByName = ({ onHandleOrderByName, sortByName }) => {
  return (
    <div>
      <select
        name="sortByName"
        id="sortByName"
        value={sortByName}
        onChange={onHandleOrderByName}
      >
        <option value="">Sort By Name</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
    </div>
  );
};

export default SortingByName;
