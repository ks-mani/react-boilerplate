/**
 *
 * FilterSearchBarComponent
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col, Select, Slider, InputNumber, Button, Divider } from 'antd';
import axios from 'axios';

export function FilterSearchBarComponent(props) {
  const [agentsList, setAgentsList] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);
  const [selectedInputValue, setSelectedInputValue] = useState(0);

  const getOptionsForMultipleSelect = useCallback(arr => {
    const children = arr.map(item => (
      <Select.Option key={item}>{item}</Select.Option>
    ));
    return children;
  }, []);

  const multipleDropdownChangeHandler = useCallback(valArr => {
    setSelectedAgents([...valArr]);
  }, []);

  const sliderChangeHandler = useCallback(value => {
    if (isNaN(value)) {
      return;
    }
    setSelectedInputValue(value);
  }, []);

  const clickHandler = useCallback(
    event => {
      props.buttonHandler(selectedAgents, selectedInputValue);
    },
    [props, selectedAgents, selectedInputValue],
  );

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
            maxTagCount={2}
            defaultValue={[]}
            onChange={multipleDropdownChangeHandler}
          >
            {agentsList ? getOptionsForMultipleSelect(agentsList) : []}
          </Select>
        </Col>
        <Col span={10}>
          <Row>
            <Col span={16}>
              <Slider
                min={minDuration}
                max={Math.ceil(maxDuration)}
                step={0.1}
                onChange={sliderChangeHandler}
                value={
                  typeof selectedInputValue === 'number'
                    ? selectedInputValue
                    : 0
                }
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={minDuration}
                max={Math.ceil(maxDuration)}
                style={{ margin: '0 16px' }}
                value={selectedInputValue}
                onChange={sliderChangeHandler}
                step={0.1}
              />
            </Col>
          </Row>
        </Col>
        <Col span={1}>
          <Divider type="vertical" style={{ background: '#d9d9d9', height: '35px' }}></Divider>
        </Col>
        <Col span={5}>
          <Button
            type="primary"
            style={{ float: 'right', width: '70%' }}
            onClick={clickHandler}
          >
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
