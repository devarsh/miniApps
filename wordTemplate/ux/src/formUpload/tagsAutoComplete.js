import * as React from "react";
import TextField from "@material-ui/core/TextField";
import AutoComplete, {
  createFilterOptions,
} from "@material-ui/lab/AutoComplete";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useDebounce } from "use-debounce";
import { monkeyPatchReducer } from "./redux";

let AutoCompleteTagList = ({
  label,
  setValue,
  setTouched,
  setError,
  value,
  touched,
  error,
  getOptionLabel,
  callback,
  dispatch,
  state,
}) => {
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isFixedOptions] = React.useState(true);
  const [apiInputValue] = useDebounce(inputValue, 500, { maxWait: 700 });
  const [triggerBlur, setTriggerBlur] = React.useState(false);
  const getOptionLabelFilter = (option) => {
    let result = typeof option === "string" ? option : getOptionLabel(option);
    if (typeof result === "string") {
      return result;
    }
    return "Invalid Label Value";
  };
  React.useEffect(() => {
    let active = true;
    (async () => {
      if (isFixedOptions && options.length === 0) {
        if (apiInputValue !== "") {
          try {
            setLoading(true);
            let data = await callback(apiInputValue);
            setLoading(false);
            if (active) {
              setOptions(data);
            }
          } catch (e) {
            setLoading(false);
          }
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [apiInputValue]);
  React.useEffect(() => {
    if (!isFixedOptions) {
      if (!open) {
        setOptions([]);
      }
    }
  }, [open]);
  React.useEffect(() => {
    if (triggerBlur === true) {
      let isError = false;
      if (Array.isArray(value) && value.length === 0) {
        isError = true;
      }
      if (isError) {
        if (!touched) {
          monkeyPatchReducer(
            setTouched(true),
            setError("tags cannot be empty")
          )(dispatch, state);
        } else {
          setError("tags cannot be empty")(dispatch);
        }
      } else {
        if (error !== "") {
          setError("")(dispatch);
        }
      }
      setTriggerBlur(false);
    }
  }, [triggerBlur]);
  return (
    <AutoComplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      loading={loading}
      name={name}
      onChange={(_e, v) => setValue(v)(dispatch)}
      onBlur={() => setTriggerBlur(true)}
      options={options}
      getOptionLabel={getOptionLabelFilter}
      multiple={true}
      autoComplete={true}
      autoHighlight={true}
      selectOnFocus={true}
      filterSelectedOptions={true}
      filterOptions={createFilterOptions({
        matchFrom: "start",
        ignoreCase: true,
        trim: true,
      })}
      freeSolo={true}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant={"outlined"}
          size="small"
          error={touched && !!error}
          helperText={touched && !!error ? error : null}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
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
  );
};

export default AutoCompleteTagList;
