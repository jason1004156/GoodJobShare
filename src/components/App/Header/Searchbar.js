import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

import AutoCompleteCompanyNameTextInput from 'common/form/AutoCompleteTextInput_new/AutoCompleteCompanyNameTextInput';
import Magnifier from '../../common/icons/Magnifiner';
import styles from './Searchbar.module.css';
const searchType = 'company';

const getInitialSearchTextFromLocation = location =>
  qs.parse(location.search, { ignoreQueryPrefix: true }).q || '';

const Searchbar = ({ className, placeholder, history, location }) => {
  const [searchText, setSearchText] = useState(
    getInitialSearchTextFromLocation(location),
  );
  const [isActive, setActive] = useState(false);

  const handleFormFocus = useCallback(() => {
    setActive(true);
  }, [setActive]);

  const handleFormBlur = useCallback(() => {
    setActive(false);
  }, [setActive]);

  const gotoSearchResult = useCallback(
    searchText => {
      history.push(
        `/salary-work-times?q=${encodeURIComponent(
          searchText,
        )}&s_by=${searchType}`,
      );
    },
    [history],
  );

  const handleFormSubmit = useCallback(
    e => {
      e.preventDefault();
      gotoSearchResult(searchText);
    },
    [gotoSearchResult, searchText],
  );

  return (
    <form
      className={cn(className, styles.searchbar, { [styles.active]: isActive })}
      onSubmit={handleFormSubmit}
      onFocus={handleFormFocus}
      onBlur={handleFormBlur}
    >
      <AutoCompleteCompanyNameTextInput
        className={styles.textInput}
        placeholder={placeholder}
        value={searchText}
        onChange={setSearchText}
        onCompanyNameSelected={gotoSearchResult}
      />
      <button type="submit" className={styles.searchBtn}>
        <Magnifier />
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Searchbar);