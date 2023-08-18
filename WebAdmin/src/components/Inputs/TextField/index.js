import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { mergeClasses } from "@material-ui/styles";
import React from "react";
import { faLinkSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const TextInput = initialProps => {
  const { readOnly, shouldSelectValueOnFocus = false, ...props } = initialProps;

  const mergedInputClasses = mergeClasses({
    newClasses: props?.InputProps?.classes ?? {},
    Component: TextInput,
  });

  const mergedLabelClasses = mergeClasses({
    newClasses: props?.InputLabelProps?.classes ?? {},
    Component: TextInput,
  });

  const handleLinkClick = event => {
    event.stopPropagation();
    window.open(props.href, "_blank");
    props.onLinkClick?.(event);
  };

  const handleFocus = (event) => {
    if (shouldSelectValueOnFocus) {
        
    }
    props.onFocus?.(event);
  };

  return (
    <TextField
      fullWidth
      {...props}
      variant="outlined"
      onFocus={handleFocus}
      InputProps={{
        ...(props?.InputProps ?? {}),
        classes: mergedInputClasses,
        readOnly: readOnly ?? props?.InputProps?.readOnly ,
        startAdornment: (
          <React.Fragment>
            {props?.href && (
              <IconButton
                onClick={handleLinkClick}
                disabled={props.isLinkDisabled}
                data-testid="linkIcon"
              >
               <FontAwesomeIcon icon={faLinkSlash} />
              </IconButton>
            )}
            {props?.InputProps?.startAdornment}
          </React.Fragment>
        ),
      }}
      InputLabelProps={{
        ...(props?.InputLabelProps ?? {}),
        classes: mergedLabelClasses,
      }}
    />
  );
};

export default TextInput;
