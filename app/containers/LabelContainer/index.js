/**
 *
 * LabelContainer
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table, Button, Tag, Modal, Select, notification } from 'antd';
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
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [labelsList, setLabelsList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onSelectChange = useCallback(selectedKeys => {
    setSelectedRowKeys(selectedKeys);
  }, []);

  const fetchTheRecords = useCallback(() => {
    const headers = {
      'Content-Type': 'application/json',
      user_id: '24b456',
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

  const fetchTheLabelsList = useCallback(async () => {
    const headers = {
      'Content-Type': 'application/json',
      user_id: '24b456',
    };
    try {
      const resp = await axios.get(
        'https://damp-garden-93707.herokuapp.com/getlistoflabels',
        { headers },
      );
      const { unique_label_list } = resp.data.data;
      setLabelsList(unique_label_list);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getOptionsForMultipleSelect = useCallback(arr => {
    const children = arr.map(item => (
      <Select.Option key={item}>{item}</Select.Option>
    ));
    return children;
  }, []);

  const multipleDropdownChangeHandler = useCallback(valArr => {
    setSelectedLabels([...valArr]);
  }, []);

  const showModal = useCallback(() => {
    setVisible(true);
    const labelData = new Set();
    selectedRowKeys.forEach(item => {
      const obj = tableData.find(el => el.call_id === item);
      obj.label_id.forEach(item=>{
        labelData.add(item)
      })
    });
    setSelectedLabels([...labelData.values()]);
  }, [selectedRowKeys, tableData]);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = useCallback(() => {
    setConfirmLoading(true);
    const labelData = new Set();
    selectedRowKeys.forEach(item => {
      const obj = tableData.find(el => el.call_id === item);
      obj.label_id.forEach(item=>{
        labelData.add(item)
      })
    });
    const source = [...labelData.values()];

    const toAdd = [];
    const toRemove = [];

    source.forEach(item => {
      if (!selectedLabels.includes(item)) {
        toRemove.push(item);
      }
    });

    selectedLabels.forEach(item => {
      if (!source.includes(item)) {
        toAdd.push(item);
      }
    });

    if (toAdd.length === 0 && toRemove.length === 0) {
      setConfirmLoading(false);
      notification.open({
        message: 'No Change in the labels'
      });
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      user_id: '24b456',
    };

    const payload = {
      operation: {
        callList: selectedRowKeys,
        label_ops: [
          ...toAdd.map(item => ({ name: item, op: 'add' })),
          ...toRemove.map(item => ({ name: item, op: 'remove' })),
        ],
      },
    };

    axios
      .post(
        'https://damp-garden-93707.herokuapp.com/applyLabels',
        JSON.stringify(payload),
        { headers },
      )
      .then(resp => {
        if(resp.data.message === 'successfull') {
          notification.open({
            message: 'Success'
          });
        }
        setSelectedRowKeys([])
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setVisible(false);
        setConfirmLoading(false);
        fetchTheRecords();
        fetchTheLabelsList();
      });
  }, [
    selectedRowKeys,
    selectedLabels,
    tableData,
    fetchTheRecords,
    fetchTheLabelsList,
  ]);

  useEffect(() => {
    fetchTheLabelsList();
  }, [fetchTheLabelsList]);

  useEffect(() => {
    fetchTheRecords();
  }, [fetchTheRecords]);

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          disabled={selectedRowKeys.length === 0}
          onClick={showModal}
        >
          Add/Remove Labels
        </Button>
        <span style={{ marginLeft: 8 }}>
          {selectedRowKeys.length > 0
            ? `Selected ${selectedRowKeys.length} items`
            : ''}
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
        title="Set the labels for the selected rows"
        visible={visible}
        confirmLoading={confirmLoading}
        width={800}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        {visible ? (
          <Select
            mode="tags"
            allowClear
            style={{ width: '90%' }}
            placeholder="Select Labels"
            defaultValue={selectedLabels}
            onChange={multipleDropdownChangeHandler}
          >
            {labelsList.length > 0
              ? getOptionsForMultipleSelect(labelsList)
              : labelsList}
          </Select>
        ) : null}
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
