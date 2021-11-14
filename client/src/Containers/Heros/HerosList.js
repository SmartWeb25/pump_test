import React, { useEffect, useState } from "react";
import _ from "lodash";
import Container from "Components/Common/Container";
import PageTitle from "Components/Common/PageTitle";
import InputBox from "Components/Common/InputBox";
import {
  TableWithBrowserPagination,
  Column,
  Button,
  CheckboxToggle,
} from "react-rainbow-components";
import { useQuery } from "@apollo/client";
import { LOAD_HEROS } from "GraphQL/queries";

const HerosList = () => {
  const { loading, data } = useQuery(LOAD_HEROS);
  const [heros, setHeros] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavoriteOnly, setFavoriteOnlyStatus] = useState(false);

  useEffect(() => {
    const favoritesSaved = localStorage.getItem("heros_favorite");
    if (favoritesSaved && favoritesSaved !== "")
      setFavorites(favoritesSaved.split(","));
  }, []);

  useEffect(() => {
    if (data) {
      setHeros(data.allPeople.edges);
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("heros_favorite", favorites.join(","));
  }, [favorites]);

  let herosAltered = [];

  const handleSort = (event, field) => {
    setSortBy(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const searchUpdated = (v) => {
    setSearchTerm(v);
  };

  const toggleFavorite = (hero_name) => {
    if (favorites.indexOf(hero_name) > -1) {
      favorites.splice(favorites.indexOf(hero_name), 1);
    } else {
      favorites.push(hero_name);
    }
    setFavorites(_.clone(favorites));
  };

  const renderFavoriteColumn = ({ row }) => {
    return (
      <span className="pl-2 pr-2">
        <Button
          size="small"
          label="Favorite"
          variant={row.isFavorite ? "brand" : "border"}
          onClick={() => toggleFavorite(row.name)}
        />
      </span>
    );
  };

  if (heros && heros.length) {
    heros.forEach((hero, i) => {
      herosAltered.push({
        id: i + 1,
        ...hero.node,
        isFavorite: favorites.indexOf(hero.node.name) > -1,
      });
    });
  }

  let herosToRender = _.orderBy(
    _.filter(herosAltered, (hero) => {
      if (!searchTerm || (searchTerm === "")) return true;
      return hero.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    }),
    [sortBy],
    [sortDirection]
  );

  if (showFavoriteOnly) {
    herosToRender = _.filter(herosToRender, { isFavorite: true });
  }

  return (
    <div>
      <Container>
        <PageTitle>Star Wars Heros</PageTitle>
        <div className="filters-wrp">
          <div className="searchbox-wrp">
            <InputBox
              onChange={searchUpdated}
              value={searchTerm}
              placeholder="Search by name..."
            />
          </div>
          <div className="toggle-wrp">
            <CheckboxToggle
              label="Show Favorites Only"
              value={showFavoriteOnly}
              onChange={() => setFavoriteOnlyStatus(!showFavoriteOnly)}
            />
          </div>
        </div>
        <TableWithBrowserPagination
          pageSize={10}
          data={herosToRender}
          keyField="name"
          isLoading={loading}
          onSort={handleSort}
          sortDirection={sortDirection}
          sortedBy={sortBy}
          minColumnWidth={150}
        >
          <Column header="ID" field="id" width={70} sortable />
          <Column header="Name" field="name" width={150} sortable />
          <Column header="Birth Year" field="birthYear" width={140} sortable />
          <Column header="Gender" field="gender" sortable />
          <Column
            header="Home World"
            field="homeworld"
            component={({ row }) => (
              <span className="pl-2 pr-2">
                {row.homeworld ? row.homeworld.name : ""}
              </span>
            )}
            sortable
          />
          <Column
            header="Species"
            field="species"
            component={({ row }) => (
              <span className="pl-2 pr-2">
                {row.species ? row.species.name : ""}
              </span>
            )}
            sortable
          />
          <Column
            header="Favorite"
            field="favorite"
            component={renderFavoriteColumn}
          />
        </TableWithBrowserPagination>
      </Container>
    </div>
  );
};

export default HerosList;
