const SortingById = ({ onHandleOrder, sortId }) => {
  return (
    <div>
      <select
        name="sort-id"
        id="sort-id"
        value={sortId}
        onChange={onHandleOrder}
      >
        <option value="ascending">Ascending Order</option>
        <option value="descending">Descending Order</option>
      </select>
    </div>
  );
};

export default SortingById;
