/**
 *
 * FilterComponent
 *
 */

import React, { memo, useCallback } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Divider } from 'antd';

import FilterSearchBarComponent from '../FilterSearchBarComponent/index';

export function FilterComponent() {
  let searchTheRecords = useCallback((agents, duration)=>{
    console.log(agents)
    console.log(duration)
  }, [])
  return (
    <>
      <FilterSearchBarComponent buttonHandler={searchTheRecords} />
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
