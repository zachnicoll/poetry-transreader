import React from "react";
import * as styles from "./styles";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
  return <styles.Container></styles.Container>;
};

export default SearchBar;
