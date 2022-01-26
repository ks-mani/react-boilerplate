/**
 *
 * FilterComponent
 *
 */

import React, { memo, useCallback } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Divider } from 'antd';
import axios from 'axios';

import FilterSearchBarComponent from '../FilterSearchBarComponent/index';

export function FilterComponent() {
  const searchTheRecords = useCallback((agents, duration) => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const payload = {
      info: {
        filter_agent_list: agents,
        filter_time_range: [0, duration]
      }
    }
    axios.post('https://damp-garden-93707.herokuapp.com/getfilteredcalls', JSON.stringify(payload) , {headers})
      .then((resp)=>{
        console.log(resp)
      })
      .catch(err=>{
        console.log(err)
      })
  }, []);
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
