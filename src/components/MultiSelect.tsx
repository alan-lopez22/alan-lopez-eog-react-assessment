import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from './Chip';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));
  
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

interface MultiSelectProps {
    items: any[],
    selectedItems: any[],
    onSelectedItems: any
}

const MultiSelect = ({items, selectedItems, onSelectedItems}: MultiSelectProps) => {
    const classes = useStyles();

    const handleChange = (event: any) => {
        onSelectedItems(event.target.value);
    };

    return (<FormControl className={classes.formControl}>
        <Select
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as any[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>);
}

MultiSelect.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItems: PropTypes.array,
    onSelectedItems: PropTypes.func.isRequired
}

export default MultiSelect;
