/**
 *
 * LabelContainer
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table, Button, Tag, Modal } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'Call Id',
    dataIndex: 'call_id',
    defaultSortOrder: 'descend',
    width: 300,
    sorter: (a, b) => parseInt(a.call_id) - parseInt(b.call_id),
  },
  {
    title: 'Labels',
    dataIndex: 'label_id',
    render: val => (
      <>
        {val.map(item => (
          <Tag key={item}>{item}</Tag>
        ))}
      </>
    ),
  },
];

export function LabelContainer() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [labelsList, setLabelsList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onSelectChange = useCallback((selectedKeys)=>{
    setSelectedRowKeys(selectedKeys)
  }, [])

  const fetchTheRecords = useCallback(() => {
    const headers = {
      'Content-Type': 'application/json',
      'user_id': '24b456',
    };

    setLoading(true);
    axios
      .get('https://damp-garden-93707.herokuapp.com/getcalllist', { headers })
      .then(resp => {
        const { call_data } = resp.data.data;
        setTableData(call_data.map(item => ({ ...item, key: item.call_id })));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const fetchTheLabelsList = useCallback(async () => {
    const headers = {
      'Content-Type': 'application/json',
      user_id: '24b456',
    };
    try {
      const resp = await axios.get(
        'https://damp-garden-93707.herokuapp.com/getlistoflabels',
        { headers }
      );
      const { unique_label_list } = resp.data.data;
      setLabelsList(unique_label_list);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchTheLabelsList();
  }, []);

  useEffect(() => {
    fetchTheRecords();
  }, []);

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" disabled={selectedRowKeys.length===0} onClick={showModal}>Add/Remove Labels</Button>
        <span style={{ marginLeft: 8 }}>
          {selectedRowKeys.length>0 ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        columns={columns}
        dataSource={tableData}
        scroll={{ y: 400 }}
        loading={loading}
      />
      <Modal
        title="Set the labels for the selectd rows"
        visible={visible}
        confirmLoading={confirmLoading}
      >
        <p>{"Hello mani"}</p>
      </Modal>
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
