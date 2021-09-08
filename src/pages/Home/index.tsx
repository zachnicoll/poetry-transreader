import { SearchType } from "API/types";
import PoemCard from "Components/PoemCard";
import SearchBar from "Components/SearchBar";
import { usePoems } from "Hooks/usePoems";
import useRandomPoems from "Hooks/useRandomPoems";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Container, InnerContainer } from "Styles/containers";
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
    <Container>
      <Head>
        <title>Poetry TransReader</title>
        <meta name="description" content="Poetry translator-and-reader!" />
      </Head>

      <styles.HeaderRow>
        <SearchBar onSearch={handleSearch} />
        <styles.Heading>Poetry TransReader</styles.Heading>
      </styles.HeaderRow>

      {loading || randomLoading ? (
        <styles.Heading>Loading....</styles.Heading>
      ) : (
        <InnerContainer>
          {
            // Render randomPoems first, then poems after a search has been made
            (poems.length ? poems : randomPoems).map((poem, i) => (
              <PoemCard key={i} poem={poem} index={i} />
            ))
          }
        </InnerContainer>
      )}
    </Container>
  );
};

export default Home;
