import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

type ItemType = {
  id: number;
  name: string;
};

interface Props {
  items: ItemType[];
  heading: string;
  onSelectItem: (item: ItemType) => void;
  onPageSelect: (forward: boolean) => void;
}

function ListGroup({ items, heading, onSelectItem, onPageSelect }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items found</p>}

      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <p>
        <a onClick={() => onPageSelect(false)}>
          <FaArrowAltCircleLeft />
        </a>
        <a onClick={() => onPageSelect(true)}>
          <FaArrowAltCircleRight />
        </a>
      </p>
    </>
  );
}

export default ListGroup;
