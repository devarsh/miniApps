import * as React from "react";
import { MemoizeFieldComponent } from "formComponent/componentWrapper/memoizer";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AutoComplete, {
  createFilterOptions
} from "@material-ui/lab/AutoComplete";
import Chip from "@material-ui/core/Chip";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

let MyAutoCompleteStatic = ({
  label,
  options,
  getOptionLabel,
  renderBag,
  mutate,
  registerField,
  unregisterField,
  handleChange,
  handleBlur,
  multiple,
  freeSolo
}) => {
  const { name, value, touched, error, disabled } = mutate;
  React.useEffect(() => {
    registerField(name);
    return () => unregisterField(name);
  }, [registerField, unregisterField, name]);
  let myHandleChange = React.useCallback(
    (e, value, reason) => {
      handleChange({
        target: {
          value: value,
          name: name
        }
      });
    },
    [name, handleChange]
  );
  let myHandleBlur = React.useCallback(() => {
    handleBlur({
      target: {
        name: name
      }
    });
  }, [name, handleBlur]);
  const getOptionLabelFilter = option => {
    let result = typeof option === "string" ? option : getOptionLabel(option);
    if (typeof result === "string") {
      return result;
    }
    return "Invalid Label Value";
  };

  return (
    <Grid item {...renderBag.item.size}>
      <AutoComplete
        name={name}
        disabled={disabled}
        onChange={myHandleChange}
        onBlur={myHandleBlur}
        value={value || []}
        options={options}
        getOptionLabel={getOptionLabelFilter}
        multiple={multiple}
        autoComplete={true}
        autoHighlight={true}
        selectOnFocus={true}
        filterSelectedOptions={true}
        filterOptions={createFilterOptions({
          matchFrom: "start",
          ignoreCase: true,
          trim: true
        })}
        renderInput={param => (
          <TextField
            {...param}
            label={label}
            variant={"outlined"}
            size="small"
            error={touched && !!error}
            helperText={touched && !!error ? error : null}
          />
        )}
        freeSolo={freeSolo}
        renderTags={(value, getTagProps) => {
          return value.map((option, index) => (
            <Chip
              variant="outlined"
              label={getOptionLabelFilter(option)}
              {...getTagProps({ index })}
            />
          ));
        }}
        renderOption={(option, { inputValue }) => {
          let label = getOptionLabelFilter(option);
          const matches = match(label, inputValue);
          const parts = parse(label, matches);
          return (
            <>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
            </>
          );
        }}
      />
    </Grid>
  );
};

MyAutoCompleteStatic = MemoizeFieldComponent(MyAutoCompleteStatic);
export { MyAutoCompleteStatic };
