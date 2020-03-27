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
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDebounce } from "use-debounce";

let MyAutoCompleteDynamic = ({
  label,
  getOptionLabel,
  renderBag,
  mutate,
  registerField,
  unregisterField,
  handleChange,
  handleBlur,
  multiple,
  callback,
  freeSolo,
  fixedOptions
}) => {
  const { name, touched, error, disabled } = mutate;
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isFixedOptions] = React.useState(true);
  const [apiInputValue] = useDebounce(inputValue, 500, { maxWait: 700 });
  const getOptionLabelFilter = option => {
    let result = typeof option === "string" ? option : getOptionLabel(option);
    if (typeof result === "string") {
      return result;
    }
    return "Invalid Label Value";
  };
  const myHandleChange = React.useCallback(
    (e, value, _) => {
      handleChange({
        target: {
          value: value,
          name: name
        }
      });
    },
    [name, handleChange]
  );
  const myHandleBlur = React.useCallback(() => {
    handleBlur({
      target: {
        name: name
      }
    });
  }, [name, handleBlur]);

  React.useEffect(() => {
    registerField(name);
    return () => unregisterField(name);
  }, [registerField, unregisterField, name]);
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

  return (
    <Grid item {...renderBag.item.size}>
      <AutoComplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        loading={loading}
        name={name}
        disabled={disabled}
        onChange={myHandleChange}
        onBlur={myHandleBlur}
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
        renderInput={params => (
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
              )
            }}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        )}
        freeSolo={false} ///change it later on
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

MyAutoCompleteDynamic = MemoizeFieldComponent(MyAutoCompleteDynamic);
export { MyAutoCompleteDynamic };
