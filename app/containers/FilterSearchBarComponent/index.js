/**
 *
 * FilterSearchBarComponent
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col, Select, Slider, InputNumber, Button } from 'antd';
import axios from 'axios';

export function FilterSearchBarComponent() {
  const [agentsList, setAgentsList] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState(null);
  const [minDuration, setMinDuration] = useState(null);
  const [maxDuration, setMaxDuration] = useState(null);

  let getOptionsForMultipleSelect = useCallback((arr)=>{
    let children = arr.map(item=>(
      <Select.Option key={item}>{item}</Select.Option>
    ))
    return children;
  }, [])

  const multipleDropdownChangeHandler = useCallback((valArr)=>{
    setSelectedAgents([...valArr])
  }, [])

  useEffect(() => {
    apiCall();

    async function apiCall() {
      try {
        const resp = await axios.get(
          'https://damp-garden-93707.herokuapp.com/getlistofagents',
        );
        const { listofagents } = resp.data.data;
        setAgentsList(listofagents);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    apiCall();

    async function apiCall() {
      try {
        const resp = await axios.get(
          'https://damp-garden-93707.herokuapp.com/getdurationrange',
        );
        const duration = resp.data.data;
        setMinDuration(duration.minimum);
        setMaxDuration(duration.maximum);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <>
      <Row>
        <Col span={8}>
          <h4>Agents List</h4>
        </Col>
        <Col span={10}>
          <h4>Duration</h4>
        </Col>
        <Col span={6} />
      </Row>
      <Row>
        <Col span={8}>
          <Select
            mode="tags"
            allowClear
            style={{ width: '90%' }}
            placeholder="Select Agents"
            maxTagCount="3"
            defaultValue={[]}
            onChange={multipleDropdownChangeHandler}
          >
            { agentsList ? getOptionsForMultipleSelect(agentsList): [] }
          </Select>
        </Col>
        <Col span={10}>
          <Row>
            <Col span={16}>
              <Slider min={0} max={12} step={0.01} />
            </Col>
            <Col span={4}>
              <InputNumber
                min={0}
                max={12}
                style={{ margin: '0 16px' }}
                step={0.1}
              />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Button type="primary" style={{ float: 'right', width: '70%' }}>
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
}

FilterSearchBarComponent.propTypes = {
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
)(FilterSearchBarComponent);
