/**
 *
 * FilterTableContainer
 *
 */

import React, { memo, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table } from 'antd';

const columns = [
  {
    title: 'Agent Id',
    dataIndex: 'agent_id'
  },
  {
    title: 'Call Id',
    dataIndex: 'call_id',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseInt(a.call_id) - parseInt(b.call_id),
  },
  {
    title: 'Call Time (in min.)',
    dataIndex: 'call_time',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseFloat(a.call_time) - parseFloat(b.call_time),
    render: (val)=>parseFloat(val).toFixed(2).toString()
  },
];

export function FilterTableContainer(props) {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleTableChange = useCallback((paginate, filters, sorter) => {
    setPagination(paginate)
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={props.data}
        pagination={pagination}
        scroll={{ y: 350 }}
        onChange={handleTableChange}
        loading={props.load}
      />
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
)(FilterTableContainer);
