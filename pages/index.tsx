import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { SearchType } from "../api/types";
import { Card } from "../components/Card";
import SearchBar from "../components/SearchBar";
import { usePoems } from "../hooks/usePoems";
import * as styles from "./styles";

const Home: NextPage = () => {
  const [type, setType] = useState<SearchType>("title");
  const [searchTerm, setSearchTerm] = useState("");
  const { poems, loading } = usePoems(type, searchTerm);

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

      {loading ? (
        <styles.Heading>Loading....</styles.Heading>
      ) : (
        <styles.InnerContainer>
          {poems.map((poem, i) => (
            // Alternate widths to create a 'mosaic' pattern
            <Card width={i % 4 === 0 || i % 4 === 3 ? 45 : 54} key={poem.title}>
              <h1>{poem.title}</h1>
              <h3>{poem.author}</h3>

              <styles.Line />
              <styles.ScrollBox>
                {poem.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </styles.ScrollBox>
              <styles.Fade />
            </Card>
          ))}
        </styles.InnerContainer>
      )}
    </styles.Container>
  );
};

export default Home;
