const SortingById = ({ onHandleOrder, sort }) => {
  return (
    <div>
      <select name="sorting" id="sorting" value={sort} onChange={onHandleOrder}>
        <option value="ascending">Ascending Order</option>
        <option value="descending">Descending Order</option>
      </select>
    </div>
  );
};

export default SortingById;
