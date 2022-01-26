/**
 *
 * Topbar
 *
 */

import React, { memo, useState, useCallback } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Menu, PageHeader } from 'antd';
import { Link } from 'react-router-dom';

function Topbar() {
  const [current, setCurrent] = useState('filter');

  const handleClick = useCallback(e => {
    setCurrent(e.key);
  }, []);

  return (
    <div>
      {/* <FormattedMessage {...messages.header} /> */}
      <PageHeader
        ghost={false}
        title="Prodigal Assignment"
        extra={
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item key="filter">
              <Link to="/filters">Filter</Link>
            </Menu.Item>
            <Menu.Item key="labels">
              <Link to="/labels">Labels</Link>
            </Menu.Item>
          </Menu>
        }
      />
    </div>
  );
}

Topbar.propTypes = {};

export default memo(Topbar);
