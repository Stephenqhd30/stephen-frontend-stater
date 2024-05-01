import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import UserInfoCard from '@/pages/Account/Center/components/UserInfoCard';
import {ACCOUNT_TITLE} from '@/constants';

const AvatarList: React.FC = () => {
  return (
    <PageContainer title={ACCOUNT_TITLE}>
      <UserInfoCard />
    </PageContainer>
  );
};

export default AvatarList;
