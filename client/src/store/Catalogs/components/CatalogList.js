import React from "react";

import CatalogItem from "./CatalogItem";
import Aux from "../../../hoc/Auxiliary";

const CatalogList = (props) => {
  const { items, sortItems, removeItem, updateItem } = props;
  const list = items.map((item) => (
    <CatalogItem
      key={item._id}
      item={item}
      removeItem={removeItem}
      updateItem={updateItem}
    />
  ));
  const sortItemsContent = (column) => {
    return (
      <Aux>
        <i
          onClick={() => sortItems(column, "asc")}
          className="glyphicon glyphicon-sort-by-alphabet"
        ></i>
        <i
          onClick={() => sortItems(column, "desc")}
          className="glyphicon glyphicon glyphicon-sort-by-alphabet-alt"
        ></i>
      </Aux>
    );
  };
  return (
    <div className="catalog-list-box">
      <table className="table table-striped">
        <thead>
          <tr scope="col">
            <th className="url">Adres{sortItemsContent("url")}</th>
            <th className="login">Login{sortItemsContent("login")}</th>
            <th className="password">Hasło{sortItemsContent("password")}</th>
            <th className="multicode">
              Multikod{sortItemsContent("multicode")}
            </th>
            <th className="price">Cena{sortItemsContent("price")}</th>
            <th className="websites">Strony{sortItemsContent("websites")}</th>
            <th className="sum">Suma{sortItemsContent("sum")}</th>
            <th className="rank">Ranga{sortItemsContent("rank")}</th>
            <th className="status">Status{sortItemsContent("status")}</th>
            <th className="actions">Akcje</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </div>
  );
};

export default CatalogList;
