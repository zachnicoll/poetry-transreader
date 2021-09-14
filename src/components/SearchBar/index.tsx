import React, { useCallback, useState } from "react";
import { SearchType } from "API/types";
import { KeyboardReturn } from "@material-ui/icons";
import * as styles from "./styles";

interface SearchBarProps {
  onSearch: (type: SearchType, searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [selected, setSelected] = useState<SearchType>(SearchType.TITLE);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (clicked: SearchType): void => {
    setSelected(clicked);
  };

  const handleSubmit = useCallback((): void => {
    onSearch(selected, searchTerm);
  }, [searchTerm, selected, onSearch]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <styles.Container>
      <styles.TitleAuthorContainer>
        <styles.Button
          onClick={() => handleClick(SearchType.TITLE)}
          selected={selected === SearchType.TITLE}
        >
          Title
        </styles.Button>
        <styles.Button
          onClick={() => handleClick(SearchType.AUTHOR)}
          selected={selected === SearchType.AUTHOR}
        >
          Author
        </styles.Button>
      </styles.TitleAuthorContainer>

      <styles.InputReturnContainer>
        <styles.Input
          placeholder={`Search for poems by ${selected}...`}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <styles.IconButton onClick={handleSubmit}>
          <KeyboardReturn fontSize="large" />
        </styles.IconButton>
      </styles.InputReturnContainer>
    </styles.Container>
  );
};

export default SearchBar;
