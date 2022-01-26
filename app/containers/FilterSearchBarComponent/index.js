/**
 *
 * FilterSearchBarComponent
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col, Select, Slider, InputNumber, Button } from 'antd';

export function FilterSearchBarComponent() {
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
            mode="multiple"
            allowClear
            style={{ width: '90%' }}
            placeholder="Select Agents"
          >
            {}
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
