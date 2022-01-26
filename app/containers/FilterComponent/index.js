/**
 *
 * FilterComponent
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Divider } from 'antd';

import FilterSearchBarComponent from '../FilterSearchBarComponent/index';

export function FilterComponent() {
  return (
    <>
      <FilterSearchBarComponent />
      <Divider />
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FilterComponent);
