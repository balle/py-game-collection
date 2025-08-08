export type FilterItem = {
  id: number;
  name: string;
};

interface Props {
  items: FilterItem[];
  onSelect: (id: string) => void;
}

const Filter = ({ items, onSelect }: Props) => {
  return (
    <select
      className="form-select"
      onChange={(event) => onSelect(event.target.value)}
    >
      <option value="">All</option>
      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default Filter;
