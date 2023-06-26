import { Alert } from 'antd';
import React from 'react';

const MyError = () => {
  return (
    <Alert style={{ marginTop: '20px' }} message="Error" description="This error from server" type="error" showIcon />
  );
};

export default MyError;
