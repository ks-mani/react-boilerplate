/**
 *
 * FilterComponent
 *
 */

import React, { memo, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Divider } from 'antd';
import axios from 'axios';

import FilterSearchBarComponent from '../FilterSearchBarComponent/Loadable';
import FilterTableContainer from '../FilterTableContainer/Loadable'

export function FilterComponent() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchTheRecords = useCallback((agents, duration) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const payload = {
      info: {
        filter_agent_list: agents,
        filter_time_range: [0, duration],
      },
    };
    setLoading(true);
    axios
      .post(
        'https://damp-garden-93707.herokuapp.com/getfilteredcalls',
        JSON.stringify(payload),
        { headers },
      )
      .then(resp => {
        const data = resp.data.data;
        setTableData(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <FilterSearchBarComponent buttonHandler={searchTheRecords} />
      <Divider />
      <FilterTableContainer data={tableData} load={loading}></FilterTableContainer>
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
