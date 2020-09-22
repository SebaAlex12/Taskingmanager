import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch } from "react-redux";

import { WarningButton } from "../../../themes/basic";

const CatalogShortListItem = (props) => {
  const {
    item: { rank, status, url },
    removeItem,
  } = props;
  // const dispatch = useDispatch();
  return (
    <tr>
      <td className="url">{url}</td>
      <td className="rank">{rank}</td>
      <td className="status">{status}</td>
      <td className="actions">
        <WarningButton onClick={removeItem} className="remove">
          <FontAwesomeIcon icon={faMinusSquare} />
        </WarningButton>
      </td>
    </tr>
  );
};

export default CatalogShortListItem;
