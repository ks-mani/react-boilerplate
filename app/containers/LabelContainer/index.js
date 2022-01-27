/**
 *
 * LabelContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table, Button } from 'antd';

const columns = [
  {
    title: 'Call Id',
    dataIndex: 'call_id',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseInt(a.call_id) - parseInt(b.call_id),
  },
  {
    title: 'Labels',
    dataIndex: 'label_id',
    // render: (val)=>parseFloat(val).toFixed(2).toString()
  },
];

export function LabelContainer() {
  return (
    <>
      <div style={{ marginBottom: 16 }}>
          <Button type="primary">
            Add/Remove Tags
          </Button>
          <span style={{ marginLeft: 8 }}>
            {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} */}
          </span>
        </div>
        <Table rowSelection={{selectedRowKeys:[], onChange: ()=>{}} } columns={columns} dataSource={[]} scroll={{ y: 400 }} />
    </>
  );
}

LabelContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

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
)(LabelContainer);
