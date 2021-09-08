import { SearchType } from "API/types";
import PoemCard from "Components/PoemCard";
import SearchBar from "Components/SearchBar";
import { usePoems } from "Hooks/usePoems";
import useRandomPoems from "Hooks/useRandomPoems";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import * as styles from "./styles";

const Home: NextPage = () => {
  const [type, setType] = useState<SearchType>("title");
  const [searchTerm, setSearchTerm] = useState("");
  const { poems, loading } = usePoems(type, searchTerm);
  const { poems: randomPoems, loading: randomLoading } = useRandomPoems();

  const handleSearch = (type: SearchType, searchTerm: string): void => {
    setType(type);
    setSearchTerm(searchTerm);
  };

  return (
    <styles.Container>
      <Head>
        <title>Poetry TransReader</title>
        <meta name="description" content="Poetry translator-and-reader!" />
      </Head>

      <styles.Row>
        <SearchBar onSearch={handleSearch} />
        <styles.Heading>Poetry TransReader</styles.Heading>
      </styles.Row>

      {loading || randomLoading ? (
        <styles.Heading>Loading....</styles.Heading>
      ) : (
        <styles.InnerContainer>
          {(poems.length ? poems : randomPoems).map((poem, i) => (
            <PoemCard key={i} poem={poem} index={i} />
          ))}
        </styles.InnerContainer>
      )}
    </styles.Container>
  );
};

export default Home;
