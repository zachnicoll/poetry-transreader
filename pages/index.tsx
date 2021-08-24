import { css } from "@emotion/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Card } from "../components/Card";
import SearchBar from "../components/SearchBar";
import * as styles from "./styles";

const Home: NextPage = () => {
  return (
    <styles.Container>
      <Head>
        <title>Poetry Transreader</title>
        <meta name="description" content="Poetry translator-and-reader!" />
      </Head>

      <SearchBar onSearch={() => {}} />

      <styles.InnerContainer>
        <Card flex={40}>
          <h1>William Shakespeare</h1>
        </Card>
        <Card flex={59}>
          <h1>William Shakespeare</h1>
        </Card>
        <Card flex={59}>
          <h1>William Shakespeare</h1>
        </Card>
        <Card flex={40}>
          <h1>William Shakespeare</h1>
        </Card>
      </styles.InnerContainer>
    </styles.Container>
  );
};

export default Home;
