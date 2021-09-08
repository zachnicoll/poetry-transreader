import React, { useCallback, useState } from "react";
import * as styles from "./styles";
import { SearchType } from "../../api/types";
import { colours } from "../../styles/colours";
import { KeyboardReturn } from "@material-ui/icons";

interface SearchBarProps {
  onSearch: (type: SearchType, searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [selected, setSelected] = useState<SearchType>("title");
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
          onClick={() => handleClick("title")}
          selected={selected === "title"}
        >
          Title
        </styles.Button>
        <styles.Button
          onClick={() => handleClick("author")}
          selected={selected === "author"}
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
