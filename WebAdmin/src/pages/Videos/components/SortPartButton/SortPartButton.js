import classNames from "classnames/bind";
import styles from "./styles.scss";
import { Box, IconButton } from "@material-ui/core";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function SortPartButton({ row, index, handleUp = () => {}, handleDown = () => {} }) {
  const up = (e) => {
    handleUp();
    e.stopPropagation();
  };
  const down = (e) => {
    handleDown();
    e.stopPropagation();
  };
  return (
    <>
      {index !== 0 && (
        <Box style={{ width: 20, display: "flex", flexDirection: "column" }}>
          {index != 1 && (
            <IconButton onClick={up} size="small" aria-label="upload picture">
              <FontAwesomeIcon icon={faChevronUp} />
            </IconButton>
          )}
          <IconButton onClick={down} size="small" aria-label="upload picture">
            <FontAwesomeIcon icon={faChevronDown} />
          </IconButton>
        </Box>
      )}
    </>
  );
}

export default SortPartButton;
